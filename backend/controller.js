const mysql = require('mysql');
const sha1 = require('sha1');
const { resolve } = require('path');
const dbconfig = require('./config/dbconfig');

// for development use - true requires cookies to access most routes
const autoValidate = false;

var connection = mysql.createConnection(dbconfig);

connection.connect((err) => {
  if (err) throw err;

  console.log('MySql connected...');
});

module.exports = function(app) {
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
  app.get('/api/groups/:group_id', (req, res) => {
    const query = `SELECT g.*, COUNT(gm.group_id) AS current_group_size FROM
                    (SELECT * FROM groups
                    WHERE id = ${req.params.group_id}) AS g
                    LEFT JOIN group_members AS gm 
                    ON g.id = gm.group_id`;

    sendQuery('get', query, res);
  });

  // filter groups
  app.get('/api/groups/filter/:phrase', (req, res) => {
    const phrase = req.params.phrase;
    const query = `SELECT g.*, COUNT(gm.group_id) AS current_group_size 
                    FROM groups AS g
                    LEFT JOIN group_members AS gm 
                    ON g.id = gm.group_id
                    WHERE (subject = '${phrase}'
                    OR name LIKE '%${phrase}%')
                    AND end_time >= NOW()
                    GROUP BY g.id
                    ORDER BY start_time ASC`;

    sendQuery('get', query, res);
  });

  // joined groups  
  app.get('/api/groups/joined/:user_id', (req, res) => {
    const query = `SELECT g.*, COUNT(j.group_id) AS current_group_size 
                    FROM
                    (SELECT group_id FROM group_members
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
  app.get('/api/groups/created/:user_id', (req, res) => {
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
  app.get('/api/groups/members/:group_id', (req, res) => {
    const authorQuery = `SELECT user_id
                          FROM groups
                          WHERE id = ${req.params.group_id}`;
    
    connection.query(authorQuery, (err, results) => {
      if (err) return res.send(err);

      const author_id = results[0].user_id;

      if (author_id !== req.body.user_id) return res.send('Permission denied');

      const membersQuery = `SELECT username 
                            FROM users AS u
                            JOIN
                            (SELECT user_id
                            FROM group_members
                            WHERE group_id = ${req.params.group_id}) AS m
                            ON u.id = m.user_id`;

      sendQuery('get', membersQuery, res);
    });
  });

  // profile 
  app.get('/api/users/:user_id', (req, res) => {
    const query = `SELECT * FROM users
                    WHERE id = ${req.body.user_id}`;

    sendQuery('get', query, res);
  });

  // login
  app.post('/api/login', (req, res) => {
    const email = req.body.email.replace(/["']/g, "\\'");
    const password = sha1(req.body.password);
    const query = `SELECT id FROM users 
                    WHERE email = '${email}' AND password = '${password}'`;

    connection.query(query, (err, results) => {
      if (err) {
        return res.send(err);
      } else if (results.length) {
        const token = createToken();
        const loginQuery = `INSERT INTO sessions 
                              SET token = '${token}', user_id ='${results[0].id}'
                              ON DUPLICATE KEY UPDATE token = '${token}'`;

        connection.query(loginQuery, (err) => {
          if (err) return res.send(err);

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
    req.body.password = sha1(req.body.password);
    const { columns, values } = postColumnsAndValues(req.body);
    const createQuery = `INSERT INTO users (${columns})
                          VALUES(${values})`;

    res.cookie('token', '', { maxAge: -1, httpOnly: true });

    sendQuery('post', createQuery, res);
  });

  // join group 
  app.post('/api/groups/join', (req, res) => {
    const groupSizeQuery = `SELECT g.max_group_size, COUNT(gm.group_id) AS current_group_size FROM
                            (SELECT * FROM groups
                            WHERE id = ${req.body.group_id}) AS g
                            LEFT JOIN group_members AS gm 
                            ON g.id = gm.group_id`;

    connection.query(groupSizeQuery, (err, results) => {
      if (err) return res.send(err);

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
                    AND id = ${req.body.group_id}`;

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
                    AND group_id = ${req.body.group_id}`;

    sendQuery('delete', query, res);
  });

  // kick from group  
  app.delete('/api/groups/kick', (req, res) => {
    const authorQuery = `SELECT user_id
                          FROM groups
                          WHERE id = ${req.body.group_id}`;

    connection.query(authorQuery, (err, results) => {
      if (err) return res.send(err);

      const author_id = results[0].user_id;
      if (author_id !== req.body.user_id) return res.send('Permission denied');

      const deleteQuery = `DELETE FROM group_members
                            WHERE user_id IN
                            (SELECT id FROM users
                            WHERE username = '${req.body.username}')
                            AND group_id = ${req.body.group_id}`;
 
      sendQuery('delete', deleteQuery, res);
    });
  });

  // edit user  
  app.put('/api/users', (req, res) => {
    const id = req.body.user_id;
    delete req.body.user_id;
    req.body.password = sha1(req.body.password);
    const updates = putColumnsAndValues(req.body);
    const query = `UPDATE users SET ${updates}
                    WHERE id = ${id}`;

    sendQuery('put', query, res);
  });

  // edit group
  app.put('/api/groups/:group_id', (req, res) => {
    const authorQuery = `SELECT user_id
                          FROM groups
                          WHERE id = ${req.params.group_id}`;

    connection.query(authorQuery, (err, results) => {
      if (err) return res.send(err);

      const author_id = results[0].user_id;

      if (author_id !== req.body.user_id) return res.send('Permission denied');

      const updates = putColumnsAndValues(req.body);
      delete req.body.user_id;
      const updateQuery = `UPDATE groups SET ${updates}
                            WHERE id = ${req.params.group_id}`;

      sendQuery('put', updateQuery, res);
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
  if (body.password) body.password = sha1(body.password);
  const columns = Object.keys(body).join(', ');
  const values = Object.values(body).map(value => `'${value}'`).join(', ');

  return { columns, values };
}

/**
 * Returns an SQL PUT query using data from body
 * @param {object} body 
 */
function putColumnsAndValues(body) {
  const updates = Object.keys(body).map(key => `${key} = '${body[key]}'`).join(', ');

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
    if (err) return res.send(err);

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
 * Validates user token and if validated, adds authenticated_user_id to body for requests
 * @param {object} req 
 * @param {object} res 
 * @param {function} next 
 */
function validateToken(req, res, next) {
  if (autoValidate) return next();

  const route = req.url;
  const excludedRoutes = [
    { route: /\/api\/login/, method: 'POST' },                      // api/login
    { route: /\/api\/users$/, method: 'POST' },                     // api/users
    { route: /\/api\/groups$/, method: 'GET' },                     // api/groups
    { route: /\/api\/groups\/\d+/, method: 'GET' },                 // api/groups/:group_id
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

// NOTES
// /groups/join - can only join if current_group_size < max_group_size
// /groups/kick - reduced total queries 
// order joined and created groups by start_time, hide inactive groups
// removed current_group_size field from groups, field and value generated during queries
// fixed /group/filter/:phrase as excluded route
// create and edit user (POST PUT /users) - sha1 encrypts password before storing
// remove existing token when creating user - prevent existing user using old token for making requests

// NEXT
// sanitization
// test bad inputs - extra fields
// check if unnecessary sensitive info returned
// send sql error or hide and send generic error?

// TODO:
// ask frontend to restrict edits - max_group_size, 
// remove user_id from query's? already validated and appended via token
// mail notifications? group delete, group edit, group start_time approaching
// Google OAuth2.0 - https://developers.google.com/identity/protocols/OAuth2
  // 1. Obtain OAuth 2.0 credentials from the Google API Console.
  // 2. Obtain an access token from the Google Authorization Server.
  // 3. Send the access token to an API.
  // 4. Refresh the access token, if necessary.
// add google_id to sessions table?
// POSTMAN test suite
// refactor with routers

// CLEANUP:
// remove cors  
// remove console.logs
// remove autoValidate
