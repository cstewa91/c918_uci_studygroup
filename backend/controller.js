const mysql = require('mysql');
const dbconfig = require('./config/dbfonig-admin') || require('./config/dbconfig');

var connection = mysql.createConnection(dbconfig);

connection.connect((err) => {
  if (err) throw err;

  console.log('MySql connected...');
});

module.exports = function(app) {
  // search study groups 
  app.get('/api/groups', (req, res) => {
    const query = 'SELECT * FROM groups';

    sendQuery('get', query, res);
  });

  // filter study groups
  app.get('/api/filter/:phrase', (req, res) => {
    const phrase = req.params.phrase;
    const query = `SELECT * FROM groups
                    WHERE subject = '${phrase}'
                    OR name LIKE "%${phrase}%"`;

    sendQuery('get', query, res);
  });

  // group details 
  app.get('/api/groups/:group_id', (req, res) => {
    const query = `SELECT * FROM groups
                  WHERE id = ${req.params.group_id}`;

    sendQuery('get', query, res);
  });

  // joined groups  
  app.get('/api/joined_groups/:user_id', (req, res) => {
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
  app.get('/api/groups/:author_id', (req, res) => {
    const query = `SELECT * FROM groups
                    WHERE id = ${req.params.author_id}`;

    sendQuery('get', query, res);
  })

  // group members 
  app.get('/api/groups/:group_id', (req, res) => {
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

  // create user 
  app.post('/api/users', function (req, res) {
    const { columns, values } = postColumnsAndValues(req.body);
    const query = `INSERT INTO users (${columns})
                    VALUES(${values})`;

    sendQuery('post', query, res);
  });

  // join group 
  app.post('/api/join', (req, res) => {
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
  app.delete('/api/leave/:user_id/:group_id', (req, res) => {
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
  const columns = Object.keys(body).join(', ');
  const values = Object.values(body).map(value => `'${value}'`).join(', ');

  return { columns, values };
}

// builds SQL PUT queries 
function putColumnsAndValues(body) {
  const updates = Object.keys(body).map(key => `${key} = '${body[key]}'`).join(', ');

  return updates;
}

// helper function for SQL queries and returning results
function sendQuery(method, query, res) {
  connection.query(query, (err, results) => {
    if (err) {
      console.log(err);
      return res.send(err);
    }

    const response = method === 'get' ? results : { success: true };
    console.log(results);
    res.send(response);
  });
}

// TODO:
// API documentation
// remove body-parser
// refactor into MVC
// ask for req and res data format 
// update queries based on format
// set db foreign key
// sanitization
// Google OAuth2.0 - https://developers.google.com/identity/protocols/OAuth2
  // 1. Obtain OAuth 2.0 credentials from the Google API Console.
  // 2. Obtain an access token from the Google Authorization Server.
  // 3. Send the access token to an API.
  // 4. Refresh the access token, if necessary.
// add session field to users table or separate authentication table?
// POSTMAN test suite

// CLEANUP:
// remove cors  
// remove console.logs
