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

    connection.query(query, (err, results) => {
      if (err) throw err;

      res.send(results);
    });
  });

  // group details route
  app.get('/group/:group_id', (req, res) => {
    const query = `SELECT * FROM study_groups
                  WHERE id = ${req.params.group_id}`;

    connection.query(query, (err, results) => {
      if (err) throw err;

      res.send(results);
    })
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

    connection.query(query, (err, results) => {
      if (err) throw err;

      res.send(results);
    })
  });

  // created groups route 
  app.get('/created_groups/:author_id', (req, res) => {
    const query = `SELECT * FROM study_groups
                    WHERE id = ${req.params.author_id}`;

    connection.query(query, (err, results) => {
      if (err) throw err;

      res.send(results);
    })
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

    connection.query(query, (err, results) => {
      if (err) throw err;

      res.send(results);
    })
  });

  // profile route
  app.get('/profile/:user_id', (req, res) => {
    const query = `SELECT * FROM users
                    WHERE id = ${req.params.user_id}`;

    connection.query(query, (err, results) => {
      if (err) throw err;

      res.send(results);
    })
  });

// create user route
  app.post('/create_user', function (req, res) {
    const googleId = req.body.googleId;
    const username = req.body.username;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;

    const query = `INSERT INTO users
                    (googleId, username, firstName, lastName, email)
                    VALUES(${googleId}, ${username}, ${firstName}, ${lastName}, ${email})`;

    connection.query(query, (err, results) => {
      if (err) throw err;

      res.send({ success: true });
    })
  });


// join group route
  app.post('/join_group', (req, res) => {
    const study_group_id = req.body.study_group_id;
    const user_id = req.body.user_id;

    const query = `INSERT INTO study_group_members
                    (study_group_id, user_id)
                    VALUES(${study_group_id}, ${user_id})`;

    connection.query(query, (err, results) => {
      if (err) throw err;

      res.send({ success: true });
    })
  });

// create study group route


// delete study group route

// delete user route


// edit user route

// edit study group route




// TODO:
// move routes to separate file
// run both servers with one command?
// sanitization
// Gogole OAuth2.0 - https://developers.google.com/identity/protocols/OAuth2
  // 1. Obtain OAuth 2.0 credentials from the Google API Console.
  // 2. Obtain an access token from the Google Authorization Server.
  // 3. Send the access token to an API.
  // 4. Refresh the access token, if necessary.
// add session field to users table or separate authentication table?

// CLEANUP:
// remove cors  

}