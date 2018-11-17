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
  app.get('/api/created_groups/:author_id', (req, res) => {
    const query = `SELECT * FROM study_groups
                    WHERE id = ${req.params.author_id}`;

    sendQuery('get', query, res);
  })

  // group members route
  app.get('/api/study_group_members/:group_id', (req, res) => {
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
  app.get('/api/profile/:user_id', (req, res) => {
    const query = `SELECT * FROM users
                    WHERE id = ${req.params.user_id}`;

    sendQuery('get', query, res);
  });

  // create user route
  app.post('/api/create_user', function (req, res) {
    const { columns, values } = postColumnsAndValues(req.body);

    const query = `INSERT INTO users (${columns})
                    VALUES(${values})`;

    sendQuery('post', query, res);
  });

  // join group route
  app.post('/api/join_group', (req, res) => {
    const { columns, values } = postColumnsAndValues(req.body);

    const query = `INSERT INTO study_group_members (${columns})
                    VALUES(${values})`;

    sendQuery('post', query, res);
  });

  // create study group route
  app.post('/api/create_group', (req, res) => {
    const { columns, values } = postColumnsAndValues(req.body);

    const query = `INSERT INTO study_groups (${columns})
                    VALUES(${values})`;

    sendQuery('post', query, res);
  });

  // delete study group route - UNTESTED
  app.delete('/api/delete_group/:group_id', (req, res) => {
    const query = `DELETE FROM study_groups
                    WHERE id = ${req.params.group_id}`;

    sendQuery('delete', query, res);
  });

  // delete user route - UNTESTED
  app.delete('/api/delete_user/:user_id', (req, res) => {
    const query = `DELETE FROM users
                    WHERE id = ${req.params.user_id}`;

    sendQuery('delete', query, res);
  });

  // leave group route - UNTESTED
  app.delete('/api/leave_group/:user_id/:group_id', (req, res) => {
    const query = `DELETE FROM study_group_members
                    WHERE user_id = ${req.params.user_id}
                    AND group_id = ${req.params.group_id}`;

    sendQuery('delete', query, res);
  });

  // edit user route - UNTESTED
  app.put('/api/edit_user/:user_id', (req, res) => {
    const query = `UPDATE users SET field1 = new-value1, field2 = new-value2
                    WHERE id = ${req.params.user_id}`;

    sendQuery('delete', query, res);
  });

  // edit study group route - UNTESTED
}

// helper function for building SQL POST queries 
function postColumnsAndValues(json) {
  const columns = Object.keys(json).join(', ');
  const values = Object.values(json).map(value => `'${value}'`).join(', ');

  return { columns, values };
}

// helper function for building SQL PUT queries
function putColumnsAndValues(json) {
  // UPDATE users SET field1 = new- value1, field2 = new- value2
  const columns = Object.keys(json).join(', ');
  const values = Object.values(json).map(value => `'${value}'`).join(', ');

  return;
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
// TEST edit, delete
// just one mysql config file
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
