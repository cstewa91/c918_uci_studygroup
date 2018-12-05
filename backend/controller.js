const mysql = require('mysql');
const bcrypt = require('bcrypt');
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
  app.get('/api/groups/details/:group_id_name', sanitizeParams, (req, res) => {
    const query = `SELECT g.*, COUNT(gm.group_id) AS current_group_size 
                    FROM 
                    (SELECT * 
                    FROM groups
                    WHERE id = ${req.params['`group_id_name`']}
                    OR name = ${req.params['`group_id_name`']}) AS g
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

    connection.query(query, (err, results) => {
      if (err) {
        console.log(err);
        return res.send('Database query error');
      }

      return res.send(results[0]);
    });
  });

  // login
  app.post('/api/login', (req, res) => {
    if (!req.body['`email`'] || !req.body['`password`']) return res.send('Email and password required');

    const email = req.body['`email`'];
    const password = req.body['`password`'];
    const query = `SELECT id, password
                    FROM users 
                    WHERE email = ${email}`;

    connection.query(query, (err, results) => {
      if (err) {
        return res.send('Invalid username');
      } else if (results.length) {
        const hashedPassword = results[0].password;

        bcrypt.compare(password, hashedPassword, function(errObj, resultObj) {
          if (resultObj) {
            const token = createToken();
            const loginQuery = `INSERT INTO sessions 
                                SET token = '${token}', user_id ='${results[0].id}'
                                ON DUPLICATE KEY UPDATE token = '${token}'`;

            connection.query(loginQuery, (err) => {
              if (err) {
                console.log(err);
                return res.send('Database query error');
              }

              res.cookie('token', token, { maxAge: 60 * 60 * 1000 * 12, httpOnly: true })
              return res.send({ success: true });
            })
          } else {
            return res.send({ success: false });
          }
        });
      } else {
        res.send({ success: false });
      }
    });
  });

  app.get('/api/logout', (req, res) => {
    res.cookie('token', '', { maxAge: -1, httpOnly: true });
    res.send('You are now logged out');
  })

  // search username
  app.get('/api/users/username/:username', sanitizeParams, function(req, res) {
    const username = req.params['`username`'];
    const query = `SELECT *
                    FROM users
                    WHERE username = ${username}`;
    
    connection.query(query, (err, results) => {
      if (err) {
        console.log(err);
        return res.send('Database query error');
      }

      res.send(!!results.length);
    });
  });

  // search email
  app.get('/api/users/email/:email', sanitizeParams, function (req, res) {
    const email = req.params['`email`'];
    const query = `SELECT *
                    FROM users
                    WHERE email = ${email}`;

    connection.query(query, (err, results) => {
      if (err) {
        console.log(err);
        return res.send('Database query error');
      }

      res.send(!!results.length);
    });
  });

  // create user 
  app.post('/api/users', encryptPassword, function (req, res) {
    const body = req.body;
    const createQuery = `INSERT INTO users (google_id, username, firstname, lastname, email, password)
                          VALUES(${body['`google_id`'] || null}, ${body['`username`']}, ${body['`firstname`'] || null}, 
                                 ${body['`lastname`'] || null}, ${body['`email`']}, ${body['`password`']})`;

    connection.query(createQuery, (err, results) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          const field = err.sqlMessage.match(/(?<=key)\W*(\w+)/)[1];
          const message = `This ${field} already exists.`;
          return res.send(message);
        }

        console.log(err);
        return res.send('Database query error.');
      } else {
        const email = req.body['`email`'];
        const query = `SELECT id
                        FROM users
                        WHERE email = ${email}`;

        connection.query(query, (err, results) => {
          if (err) {
            console.log(err);
            return res.send('Database query error');
          }

          const token = createToken();
          const loginQuery = `INSERT INTO sessions 
                                SET token = '${token}', user_id ='${results[0].id}'`;

          connection.query(loginQuery, (err) => {
            if (err) {
              console.log(err);
              return res.send('Database query error');
            }

            res.cookie('token', token, { maxAge: 60 * 60 * 1000 * 12, httpOnly: true })
            return res.send({ success: true });
          });
        });
      }
    });
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
        const body = req.body;
        const query = `INSERT INTO group_members (group_id, user_id)
                        VALUES(${body['`group_id`']}, ${body.user_id})`;

        sendQuery('post', query, res);
      }
    })
  });

  // search name
  app.get('/api/groups/name/:name', sanitizeParams, function (req, res) {
    const name = req.params['`name`'];
    const query = `SELECT *
                    FROM groups
                    WHERE name = ${name}`;

    connection.query(query, (err, results) => {
      if (err) {
        console.log(err);
        return res.send('Database query error');
      }

      res.send(!!results.length);
    });
  });

  // create group 
  app.post('/api/groups', (req, res) => {
    const body = req.body;
    const createQuery = `INSERT INTO groups (user_id, name, location, subject, course, start_time, end_time, max_group_size, description)
                          VALUES(${body.user_id}, ${body['`name`']}, ${body['`location`']}, ${body['`subject`']}, ${body['`course`'] || null}, 
                          ${body['`start_time`']}, ${body['`end_time`']}, ${body['`max_group_size`']}, ${body['`description`'] || null})`;

    sendQuery('post', createQuery, res);
  });

  // delete group  
  app.delete('/api/groups/', (req, res) => {
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
    const body = req.body;
    const query = `UPDATE users SET google_id = ${body['`google_id`']},
                                    username = ${body['`username`']},
                                    firstname = ${body['`firstname`']},
                                    lastname = ${body['`lastname`']},
                                    email = ${body['`email`']},
                                    password = ${body['`password`']}
                    WHERE id = ${body.user_id}`;
    console.log(query);
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
          const body = req.body;
          const updateQuery = `UPDATE groups SET user_id = ${body.user_id}, 
                                                  name = ${body['`name`']}, 
                                                  location = ${body['`location`']}, 
                                                  subject = ${body['`subject`']}, 
                                                  course = ${body['`course`']}, 
                                                  start_time = ${body['`start_time`']}, 
                                                  end_time = ${body['`end_time`']},
                                                  max_group_size = ${body['`max_group_size`']}, 
                                                  description = ${body['`description`']}
                                WHERE id = ${group_id}`;
          
          sendQuery('put', updateQuery, res);
        }
      });
    });
  });

  // send html
  app.get('*', (req, res) => {
    res.sendFile(resolve(__dirname, 'client', 'dist', 'index.html'));
  });
}

function encryptPassword(req, res, next) {
  const body = req.body;

  if (body['`password`']) body['`password`'] = `'${bcrypt.hashSync(body['`password`'], 10)}'`;
  next();
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

      if (err.code === 'ER_DUP_ENTRY') {
        const field = err.sqlMessage.match(/(?<=key)\W*(\w+)/)[1];
        const message = `This ${field} already exists.`;
        return res.send(message);
      }

      return res.send('Database query error.');
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
    { route: /\/api\/users\/.+/, method: 'GET' },                   // api/users/username/:username, api/users/email/:email 
    { route: /\/api\/groups\/name\/.+/, method: 'GET' },            // api/groups/name/:name
    { route: /\/api\/login/, method: 'POST' },                      // api/login
    { route: /\/api\/users$/, method: 'POST' },                     // api/users
    { route: /\/api\/groups$/, method: 'GET' },                     // api/groups
    { route: /\/api\/groups\/details\/.+/, method: 'GET' },        // api/groups/details/:group_id_name
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

// CURRENT
// /group/details/group_id_name now get group details by group id or name

// TODO:
// error handling middleware
// google auth with passport
// mail notifications? group delete, group edit, group start_time approaching
// add google_id to sessions table?

// CLEANUP:
// remove cors  
// remove console.logs
// lower cookie session time
