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
    const query = 'SELECT * FROM groups';

    sendQuery('get', query, res);
  });

  // group details 
  app.get('/api/groups/:group_id', (req, res) => {
    const query = `SELECT * FROM groups
                  WHERE id = ${req.params.group_id}`;

    sendQuery('get', query, res);
  });

  // filter groups
  app.get('/api/groups/filter/:phrase', (req, res) => {
    const phrase = req.params.phrase;
    const query = `SELECT * FROM groups
                    WHERE subject = '${phrase}'
                    OR name LIKE "%${phrase}%"`;

    sendQuery('get', query, res);
  });

  // joined groups  
  app.get('/api/groups/joined/:user_id', (req, res) => {
    const query = `SELECT * 
                    FROM groups AS s
                    JOIN
                    (SELECT m.group_id 
                    FROM group_members AS m
                    WHERE m.user_id = ${req.params.user_id}) AS m
                    ON s.id = m.group_id`;

    sendQuery('get', query, res);
  });

  // created groups  
  app.get('/api/groups/created/:author_id', (req, res) => {
    const query = `SELECT * FROM groups
                    WHERE id = ${req.params.author_id}`;

    sendQuery('get', query, res);
  })

  // group members 
  app.get('/api/groups/members/:group_id', (req, res) => {
    const query = `SELECT * 
                    FROM users AS u
                    JOIN
                    (SELECT user_id
                    FROM group_members
                    WHERE group_id = ${req.params.group_id}) AS m
                    ON u.id = m.user_id`;

    sendQuery('get', query, res);
  });

  // profile 
  app.get('/api/users/:user_id', (req, res) => {
    const query = `SELECT * FROM users
                    WHERE id = ${req.params.user_id}`;

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
    const { columns, values } = postColumnsAndValues(req.body);

    const query = `INSERT INTO users (${columns})
                    VALUES(${values})`;

    sendQuery('post', query, res);
  });

  // join group 
  app.post('/api/members/join', (req, res) => {
    const { columns, values } = postColumnsAndValues(req.body);

    const query = `INSERT INTO group_members (${columns})
                    VALUES(${values})`;

    sendQuery('post', query, res);
  });

  // create group 
  app.post('/api/groups', (req, res) => {
    const { columns, values } = postColumnsAndValues(req.body);

    const query = `INSERT INTO groups (${columns})
                    VALUES(${values})`;

    sendQuery('post', query, res);
  });

  // delete group  
  app.delete('/api/groups/:group_id', (req, res) => {
    const query = `DELETE FROM groups
                    WHERE id = ${req.params.group_id}`;

    sendQuery('delete', query, res);
  });

  // delete user   
  app.delete('/api/users/:user_id', (req, res) => {
    const query = `DELETE FROM users
                    WHERE id = ${req.params.user_id}`;

    sendQuery('delete', query, res);
  });

  // leave group  
  app.delete('/api/members/leave/:user_id/:group_id', (req, res) => {
    const query = `DELETE FROM group_members
                    WHERE user_id = ${req.params.user_id}
                    AND group_id = ${req.params.group_id}`;

    sendQuery('delete', query, res);
  });

  // edit user  
  app.put('/api/users/:user_id', (req, res) => {
    const updates = putColumnsAndValues(req.body);
    const query = `UPDATE users SET ${updates}
                    WHERE id = ${req.params.user_id}`;

    sendQuery('put', query, res);
  });

  // edit group
  app.put('/api/groups/:group_id', (req, res) => {
    const updates = putColumnsAndValues(req.body);
    const query = `UPDATE groups SET ${updates}
                    WHERE id = ${req.params.group_id}`;

    sendQuery('put', query, res);
  });

  // send html
  app.get('*', (req, res) => {
    res.sendFile(resolve(__dirname, 'client', 'dist', 'index.html'));
  });
}

// builds SQL POST queries 
function postColumnsAndValues(body) {
  if (body.password) body.password = sha1(body.password);
  const columns = Object.keys(body).join(', ');
  const values = Object.values(body).map(value => `'${value}'`).join(', ');

  return { columns, values };
}

// builds SQL PUT queries 
function putColumnsAndValues(body) {
  const updates = Object.keys(body).map(key => `${key} = '${body[key]}'`).join(', ');

  return updates;
}

// Sends SQL queries and returns results
function sendQuery(method, query, res) {
  connection.query(query, (err, results) => {
    if (err) return res.send(err);

    const response = method === 'get' ? results : { success: true };
    res.send(response);
  });
}

// creates token with length 11 [0-9a-z]
function createToken() {
  return Math.random().toString(36).slice(2);
}

function validateToken(req, res, next) {
  if (autoValidate) return next();

  const route = req.url;
  const excludedRoutes = [
    /\/api\/login/,              // api/login
    /\/api\/users$/,             // api/users
    /\/api\/groups$/,            // api/groups
    /\/api\/groups\/\d+/,        // api/groups/:group_id
    /\/api\/groups\/\filter/,    // api/groups/filter/:phrase
  ]
  const token = req.cookies.token;
  const query = `SELECT user_id FROM sessions WHERE token = '${token}'`;
  const isExcludedRoute = excludedRoutes.some(excludedRoute => {
    return excludedRoute.test(route);
  });

  if (isExcludedRoute) return next();

  if (token) {
    connection.query(query, (err, results) => {
      console.log(results);
      if (!err && results[0].user_id) {
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
// dbconfig 
// date created for group creation
// order groups by date created
// add remove from group to leave group
  // - if user id === user_id, can leave
  // - if user_id === author_id of group with group_id, can remove
// remove query string and check user_id via token?
// add validate before every query? - axios.defaults.withCredentials = true; 
// email - unique key? 
// group_members unique entry
// API documentation
// refactor with routers
// ask for req and res data format 
// update queries based on format
// set db foreign key and required key
// remove foreign key from group_members when user or group deleted
// sanitization
// Google OAuth2.0 - https://developers.google.com/identity/protocols/OAuth2
  // 1. Obtain OAuth 2.0 credentials from the Google API Console.
  // 2. Obtain an access token from the Google Authorization Server.
  // 3. Send the access token to an API.
  // 4. Refresh the access token, if necessary.
// add google_id to sessions table?
// POSTMAN test suite

// CLEANUP:
// remove cors  
// remove console.logs
// remove autoValidate
