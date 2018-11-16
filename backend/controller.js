const mysql = require('mysql');
const mysqlLogin = require('./config/mysql-backend-login') || require('./config/mysql-frontend-login');

var connection = mysql.createConnection(mysqlLogin.mysqlLogin);

connection.connect((err) => {
  if (err) throw err;

  console.log('MySql connected...');
});

module.exports = function(app) {
  // search study groups route
  app.get('/groups', (req, res) => {
    const query = 'SELECT * FROM study_groups';

    sendQuery('get', query, res);
  });

  // group details route
  app.get('/group/:group_id', (req, res) => {
    const query = `SELECT * FROM study_groups
                  WHERE id = ${req.params.group_id}`;

    sendQuery('get', query, res);
  });

  // joined groups route 
  app.get('/joined_groups/:user_id', (req, res) => {
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
  app.get('/created_groups/:author_id', (req, res) => {
    const query = `SELECT * FROM study_groups
                    WHERE id = ${req.params.author_id}`;

    sendQuery('get', query, res);
  })

  // group members route
  app.get('/study_group_members/:group_id', (req, res) => {
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
  app.get('/profile/:user_id', (req, res) => {
    const query = `SELECT * FROM users
                    WHERE id = ${req.params.user_id}`;

    sendQuery('get', query, res);
  });

  // create user route
  app.post('/create_user', function (req, res) {
    const { columns, values } = getColumnsAndValues(req.body);

    const query = `INSERT INTO users (${columns})
                    VALUES(${values})`;

    sendQuery('post', query, res);
  });

  // join group route
  app.post('/join_group', (req, res) => {
    const { columns, values } = getColumnsAndValues(req.body);

    const query = `INSERT INTO study_group_members (${columns})
                    VALUES(${values})`;

    sendQuery('post', query, res);
  });

  // create study group route
  app.post('/create_group', (req, res) => {
    const { columns, values } = getColumnsAndValues(req.body);

    const query = `INSERT INTO study_groups (${columns})
                    VALUES(${values})`;

    sendQuery('post', query, res);
  });

  // delete study group route

  // delete user route


  // edit user route

  // edit study group route
}

function getColumnsAndValues(json) {
  const columns = Object.keys(json).join(', ');
  const values = Object.values(json).map(value => `'${value}'`).join(', ');

  return { columns, values };
}

function sendQuery(method, query, res) {
  connection.query(query, (err, results) => {
    if (err) throw err;

    const response = method === 'get' ? results : { success: true };
    res.send(response);
  });
}

// TODO:
// set foreign key
// sanitization
// Gogole OAuth2.0 - https://developers.google.com/identity/protocols/OAuth2
  // 1. Obtain OAuth 2.0 credentials from the Google API Console.
  // 2. Obtain an access token from the Google Authorization Server.
  // 3. Send the access token to an API.
  // 4. Refresh the access token, if necessary.
// add session field to users table or separate authentication table?

// CLEANUP:
// remove cors  
