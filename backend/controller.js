const mysql = require('mysql');
const sha1 = require('sha1');
const { resolve } = require('path');
const dbconfig = require('./config/db.json');

var connection = mysql.createConnection(dbconfig);

connection.connect(err => {
  if (err) throw err;

  console.log('MySql connected...');
});

module.exports = function(app) {
  app.use(sanitizeBody);
  app.use(validateToken);

  // search groups 
  app.get('/api/groups', (req, res) => {
    const query = `SELECT g.*, COUNT(gm.group_id) AS current_group_size 
                    FROM groups AS g
                    LEFT JOIN group_members AS gm 
                    ON g.id = gm.group_id
                    WHERE end_time >= NOW()
                    GROUP BY g.id
                    ORDER BY start_time ASC`;

    sendQuery('get', query, res);
  });

  // group details 
  app.get('/api/groups/details/:group_id', sanitizeParams, (req, res) => {
    const query = `SELECT g.*, COUNT(gm.group_id) AS current_group_size 
                    FROM 
                    (SELECT * 
                    FROM groups
                    WHERE id = ${req.params['`group_id`']}) AS g
                    LEFT JOIN group_members AS gm 
                    ON g.id = gm.group_id`;

    connection.query(query, (err, results) => {
      if (err) {
        console.log(err);
        return res.send('Database query error');
      }

      return res.send(results[0]);
    });
  });

  // filter groups
  app.get('/api/groups/filter/:phrase', sanitizeParams, (req, res) => {
    const phrase = req.params['`phrase`'];
    const query = `SELECT g.*, COUNT(gm.group_id) AS current_group_size 
                    FROM groups AS g
                    LEFT JOIN group_members AS gm 
                    ON g.id = gm.group_id
                    WHERE (subject = ${phrase}
                    OR name LIKE "${phrase.replace(/'/g, '%')}")
                    AND end_time >= NOW()
                    GROUP BY g.id
                    ORDER BY start_time ASC`;

    sendQuery('get', query, res);
  });

  // joined groups  
  app.get('/api/groups/joined', (req, res) => {
    const query = `SELECT g.*, COUNT(j.group_id) AS current_group_size 
                    FROM
                    (SELECT group_id 
                    FROM group_members
                    WHERE user_id = ${req.body.user_id}) AS gm
                    LEFT JOIN groups AS g
                    ON g.id = gm.group_id
                    LEFT JOIN group_members AS j
                    ON g.id = j.group_id
                    WHERE end_time >= NOW()
                    GROUP BY g.id
                    ORDER BY start_time ASC`;

    sendQuery('get', query, res);
  });

  // created groups  
  app.get('/api/groups/created', (req, res) => {
    const query = `SELECT g.*, COUNT(gm.group_id) AS current_group_size 
                    FROM groups AS g
                    LEFT JOIN group_members AS gm 
                    ON g.id = gm.group_id
                    WHERE g.user_id = ${req.body.user_id}
                    AND end_time >= NOW()
                    GROUP BY g.id
                    ORDER BY start_time ASC`;

    sendQuery('get', query, res);
  })

  // group members 
  app.get('/api/groups/members/:group_id', sanitizeParams, (req, res) => {
    const authorQuery = `SELECT user_id
                          FROM groups
                          WHERE id = ${req.params['`group_id`']}`;
    
    connection.query(authorQuery, (err, results) => {
      if (err) {
        console.log(err);
        return res.send('Database query error');
      }

      const author_id = results[0].user_id;

      if (author_id !== req.body.user_id) return res.send('Permission denied');

      const membersQuery = `SELECT username 
                            FROM users AS u
                            JOIN
                            (SELECT user_id
                            FROM group_members
                            WHERE group_id = ${req.params['`group_id`']}) AS m
                            ON u.id = m.user_id`;

      sendQuery('get', membersQuery, res);
    });
  });

  // profile 
  app.get('/api/users', (req, res) => {
    const query = `SELECT * 
                    FROM users
                    WHERE id = ${req.body.user_id}`;

    sendQuery('get', query, res);
  });

  // login
  app.post('/api/login', (req, res) => {
    if (!req.body['`email`'] || !req.body['`password`']) return res.send('Email and password required');

    const email = req.body['`email`'];
    const password = req.body['`password`'];
    const encryptedPassword = `'${sha1(password)}'`;
    const query = `SELECT id 
                    FROM users 
                    WHERE email = ${email} AND password = ${encryptedPassword}`;

    connection.query(query, (err, results) => {
      if (err) {
        return res.send(err);
      } else if (results.length) {
        const token = createToken();
        const loginQuery = `INSERT INTO sessions 
                              SET token = '${token}', user_id ='${results[0].id}'
                              ON DUPLICATE KEY UPDATE token = '${token}'`;

        connection.query(loginQuery, (err) => {
          if (err) {
            console.log(err);
            return res.send('Database query error');
          }

          res.cookie('token', token, { maxAge: 900000, httpOnly: true })
          res.send({ success: true });
        })
      } else {
        res.send({ success: false });
      }
    });
  });

  app.get('/api/logout', (req, res) => {
    res.cookie('token', '', { maxAge: -1, httpOnly: true });
    res.send('You are now logged out');
  })

  // create user 
  app.post('/api/users', function (req, res) {
    const { columns, values } = postColumnsAndValues(req.body);
    const createQuery = `INSERT INTO users (${columns})
                          VALUES(${values})`;

    res.cookie('token', '', { maxAge: -1, httpOnly: true });

    sendQuery('post', createQuery, res);
  });

  // join group 
  app.post('/api/groups/join', (req, res) => {
    const groupSizeQuery = `SELECT g.max_group_size, COUNT(gm.group_id) AS current_group_size 
                            FROM
                            (SELECT * FROM groups
                            WHERE id = ${req.body['`group_id`']}) AS g
                            LEFT JOIN group_members AS gm 
                            ON g.id = gm.group_id`;

    connection.query(groupSizeQuery, (err, results) => {
      if (err) {
        console.log(err);
        return res.send('Database query error');
      }

      const { max_group_size, current_group_size } = results[0];
      
      if (current_group_size >= max_group_size) {
        return res.send('Unable to join - group is max size');
      } else {
        const { columns, values } = postColumnsAndValues(req.body);
        const query = `INSERT INTO group_members (${columns})
                        VALUES(${values})`;

        sendQuery('post', query, res);
      }
    })
  });

  // create group 
  app.post('/api/groups', (req, res) => {
    const { columns, values } = postColumnsAndValues(req.body);
    const createQuery = `INSERT INTO groups (${columns})
                          VALUES(${values})`;

    sendQuery('post', createQuery, res);
  });

  // delete group  
  app.delete('/api/groups', (req, res) => {
    const query = `DELETE FROM groups
                    WHERE user_id = ${req.body.user_id} 
                    AND id = ${req.body['`group_id`']}`;

    sendQuery('delete', query, res);
  });

  // delete user   
  app.delete('/api/users', (req, res) => {
    const query = `DELETE FROM users
                    WHERE id = ${req.body.user_id}`;

    sendQuery('delete', query, res);
  });

  // leave group  
  app.delete('/api/groups/leave', (req, res) => {
    const query = `DELETE FROM group_members
                    WHERE user_id = ${req.body.user_id}
                    AND group_id = ${req.body['`group_id`']}`;

    sendQuery('delete', query, res);
  });

  // kick from group  
  app.delete('/api/groups/kick', (req, res) => {
    const authorQuery = `SELECT user_id
                          FROM groups
                          WHERE id = ${req.body['`group_id`']}`;

    connection.query(authorQuery, (err, results) => {
      if (err) {
        console.log(err);
        return res.send('Database query error');
      }

      const author_id = results[0].user_id;
      if (author_id !== req.body.user_id) return res.send('Permission denied');

      const deleteQuery = `DELETE FROM group_members
                            WHERE user_id IN
                            (SELECT id FROM users
                            WHERE username = ${req.body['`username`']})
                            AND group_id = ${req.body['`group_id`']}`;
 
      sendQuery('delete', deleteQuery, res);
    });
  });

  // edit user  
  app.put('/api/users', (req, res) => {
    const id = req.body.user_id;
    delete req.body.user_id;
    const updates = putColumnsAndValues(req.body);
    const query = `UPDATE users SET ${updates}
                    WHERE id = ${id}`;

    sendQuery('put', query, res);
  });

  // edit group
  app.put('/api/groups/:group_id', sanitizeParams, (req, res) => {
    const group_id = req.params['`group_id`'];
    const authorQuery = `SELECT user_id
                          FROM groups
                          WHERE id = ${group_id}`;

    connection.query(authorQuery, (err, results) => {
      if (err) {
        console.log(err);
        return res.send('Database query error');
      }

      const author_id = results[0].user_id;
      if (author_id !== req.body.user_id) return res.send('Permission denied');

      const new_max_group_size = req.body['`max_group_size`'];
      if (new_max_group_size) {
        const groupSizeQuery = `SELECT COUNT(group_id) AS current_group_size 
                                FROM 
                                group_members
                                WHERE group_id = ${group_id}`;
        
        connection.query(groupSizeQuery, (err, results) => {
          if (err) {
            console.log(err);
            return res.send('Database query error');
          }

          const { current_group_size } = results[0];
          if (current_group_size > parseInt(new_max_group_size.match(/\d+/)[0])) {
            return res.send('New max group size cannot be smaller than current group size');
          } else {
            const updates = putColumnsAndValues(req.body);
            delete req.body.user_id;
            const updateQuery = `UPDATE groups SET ${updates}
                                  WHERE id = ${group_id}`;

            sendQuery('put', updateQuery, res);
          }
        });
      } else {
        const updates = putColumnsAndValues(req.body);
        delete req.body.user_id;
        const updateQuery = `UPDATE groups SET ${updates}
                              WHERE id = ${group_id}`;

        sendQuery('put', updateQuery, res);
      }
    });
  });

  // send html
  app.get('*', (req, res) => {
    res.sendFile(resolve(__dirname, 'client', 'dist', 'index.html'));
  });
}

/**
 * Returns an SQL POST query using data from body
 * @param {object} body 
 */
function postColumnsAndValues(body) {
  if (body['`password`']) body['`password`'] = `'${sha1(body['`password`'])}'`;

  const columns = Object.keys(body).join(', ');
  const values = Object.values(body).map(value => `${value}`).join(', ');

  return { columns, values };
}

/**
 * Returns an SQL PUT query using data from body
 * @param {object} body 
 */
function putColumnsAndValues(body) {
  if (body['`password`']) body['`password`'] = `'${sha1(body['`password`'])}'`;
  
  const updates = Object.keys(body).map(key => `${key} = ${body[key]}`).join(', ');
  return updates;
}

/**
 * Sends SQL queries and returns results
 * @param {string} method 
 * @param {string} query 
 * @param {object} res 
 */
function sendQuery(method, query, res) {
  connection.query(query, (err, results) => {
    if (err) {
      console.log(err);
      return res.send('Database query error');
    }

    const response = method === 'get' ? results : { success: true };
    res.send(response);
  });
}

/**
 * Returns a length-11 token using [0-9a-z]
 */
function createToken() {
  return Math.random().toString(36).slice(2);
}

/**
 * Middleware - sanitizes req.params, must be used in the route itself to gain access to req.params
 * @param {object} req
 * @param {object} res
 * @param {function} next
 */
function sanitizeParams(req, res, next) {
  const params = req.params;

  for (let key of Object.keys(params)) {
    const newKey = mysql.escapeId(key);
    const newValue = mysql.escape(params[key]);
    delete params[key];
    params[newKey] = newValue;
  }

  next();
}

/**
 * Middleware - sanitizes req.body
 * @param {object} req
 * @param {object} res
 * @param {function} next
 */
function sanitizeBody(req, res, next) {
  const body = req.body;

  for (let key of Object.keys(body)) {
    const newKey = mysql.escapeId(key);
    const newValue = mysql.escape(body[key]);
    delete body[key];
    body[newKey] = newValue;
  }

  next();
}

/**
 * Middleware - Validates user token and if validated, adds authenticated_user_id to body for requests
 * @param {object} req 
 * @param {object} res 
 * @param {function} next 
 */
function validateToken(req, res, next) {
  const route = req.url;
  const excludedRoutes = [
    { route: /\/api\/login/, method: 'POST' },                      // api/login
    { route: /\/api\/users$/, method: 'POST' },                     // api/users
    { route: /\/api\/groups$/, method: 'GET' },                     // api/groups
    { route: /\/api\/groups\/details\/\d+/, method: 'GET' },        // api/groups/details/:group_id
    { route: /\/api\/groups\/filter\/.+/, method: 'GET' },          // api/groups/filter/:phrase
  ]
  const isExcludedRoute = excludedRoutes.some(excludedRoute => {
    return excludedRoute.route.test(route) && excludedRoute.method === req.method;
  });
  const token = req.cookies.token;
  const query = `SELECT user_id FROM sessions WHERE token = '${token}'`;

  if (isExcludedRoute) return next();

  if (token) {
    connection.query(query, (err, results) => {
      if (!err && results[0].user_id) {
        req.body.user_id = results[0].user_id;
        return next();
      } else {
        res.send('Login required.');
      }
    });
  } else {
    res.send('Login required.')
  }
} 

// TODO:
// google auth with passport
// mail notifications? group delete, group edit, group start_time approaching
// add google_id to sessions table?
// POSTMAN test suite
// refactor with routers

// CLEANUP:
// remove cors  
// remove console.logs
