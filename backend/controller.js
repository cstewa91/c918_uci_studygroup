const mysql = require('mysql');
const mysqlLogin = require('./config/mysql-backend-login') || require('./config/mysql-frontend-login');

var connection = mysql.createConnection(mysqlLogin.mysqlLogin);

connection.connect((err) => {
  if (err) throw err;

  console.log('MySql connected...');
});

module.exports = function(app) {
  // search study groups route
  app.get('/api/groups', (req, res) => {
    const query = 'SELECT * FROM study_groups';

    sendQuery('get', query, res);
  });

  // group details route
  app.get('/api/group/:group_id', (req, res) => {
    const query = `SELECT * FROM study_groups
                  WHERE id = ${req.params.group_id}`;

    sendQuery('get', query, res);
  });

  // joined groups route 
  app.get('/api/joined_groups/:user_id', (req, res) => {
    const query = `SELECT * 
                    FROM study_groups AS s
                    JOIN
                    (SELECT m.study_group_id 
                    FROM study_group_members AS m
                    WHERE m.user_id = ${req.params.user_id}) AS m
                    ON s.id = m.study_group_id`;

    sendQuery('get', query, res);
  });

  // created groups route 
  app.get('/api/groups/:author_id', (req, res) => {
    const query = `SELECT * FROM study_groups
                    WHERE id = ${req.params.author_id}`;

    sendQuery('get', query, res);
  })

  // group members route
  app.get('/api/groups/:group_id', (req, res) => {
    const query = `SELECT * 
                    FROM users AS u
                    JOIN
                    (SELECT user_id
                    FROM study_group_members
                    WHERE study_group_id = ${req.params.group_id}) AS m
                    ON u.id = m.user_id`;

    sendQuery('get', query, res);
  });

  // profile route
  app.get('/api/users/:user_id', (req, res) => {
    const query = `SELECT * FROM users
                    WHERE id = ${req.params.user_id}`;

    sendQuery('get', query, res);
  });

  // create user route
  app.post('/api/users', function (req, res) {
    const { columns, values } = postColumnsAndValues(req.body);
    const query = `INSERT INTO users (${columns})
                    VALUES(${values})`;

    sendQuery('post', query, res);
  });

  // join group route
  app.post('/api/join', (req, res) => {
    const { columns, values } = postColumnsAndValues(req.body);
    const query = `INSERT INTO study_group_members (${columns})
                    VALUES(${values})`;

    sendQuery('post', query, res);
  });

  // create study group route
  app.post('/api/groups', (req, res) => {
    const { columns, values } = postColumnsAndValues(req.body);
    const query = `INSERT INTO study_groups (${columns})
                    VALUES(${values})`;

    sendQuery('post', query, res);
  });

  // delete study group route - UNTESTED
  app.delete('/api/groups/:group_id', (req, res) => {
    const query = `DELETE FROM study_groups
                    WHERE id = ${req.params.group_id}`;

    sendQuery('delete', query, res);
  });

  // delete user route - UNTESTED
  app.delete('/api/users/:user_id', (req, res) => {
    const query = `DELETE FROM users
                    WHERE id = ${req.params.user_id}`;

    sendQuery('delete', query, res);
  });

  // leave group route - UNTESTED
  app.delete('/api/leave/:user_id/:group_id', (req, res) => {
    const query = `DELETE FROM study_group_members
                    WHERE user_id = ${req.params.user_id}
                    AND group_id = ${req.params.group_id}`;

    sendQuery('delete', query, res);
  });

  // edit user route - UNTESTED
  app.put('/api/users/:user_id', (req, res) => {
    const updates = putColumnsAndValues(req.body);
    const query = `UPDATE users SET ${updates}
                    WHERE id = ${req.params.user_id}`;

    sendQuery('put', query, res);
  });

  // edit study group route - UNTESTED
  app.put('/api/groups/:group_id', (req, res) => {
    const updates = putColumnsAndValues(req.body);
    const query = `UPDATE study_groups SET ${updates}
                    WHERE id = ${req.params.group_id}`;

    sendQuery('put', query, res);
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
    res.send(response);
  });
}

// TODO:
// TEST GET routes with same end points, different parameters
// TEST edit, delete
// just one mysql config file
// refactor into MVC
// check other routes needed
// consolidate routes based on request method?
// ask for req and res data format 
// update queries based on format
// set db foreign key
// sanitization
// Gogole OAuth2.0 - https://developers.google.com/identity/protocols/OAuth2
  // 1. Obtain OAuth 2.0 credentials from the Google API Console.
  // 2. Obtain an access token from the Google Authorization Server.
  // 3. Send the access token to an API.
  // 4. Refresh the access token, if necessary.
// add session field to users table or separate authentication table?

// CLEANUP:
// remove cors  
