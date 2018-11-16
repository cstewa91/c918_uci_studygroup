const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const { resolve } = require('path');
const PORT = process.env.PORT || 9000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(resolve(__dirname, 'client', 'dist')));

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'studygroupfinder'
});

connection.connect((err) => {
  if (err) throw err;

  console.log('MySql connected...');
});


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

// group members route


// created groups route
app.get('/created_groups/:userId', (req, res) => {
  const userId = req.params.userId;
  const groups = data.studyGroups.filter(group => group.userId === userId);

  res.send(groups);
})

// profile route
app.get('/profile/:userId', (req, res) => {
  const userId = req.params.userId;
  const profile = data.users.filter(user => userId === user.id)[0];

  res.send(profile);
});

// create user route

// create study group route

// edit user route

// edit study group route




// blue sky routes:

// delete study group route

// delete user route

// TODO:
// Gogole OAuth2.0 - https://developers.google.com/identity/protocols/OAuth2
  // 1. Obtain OAuth 2.0 credentials from the Google API Console.
  // 2. Obtain an access token from the Google Authorization Server.
  // 3. Send the access token to an API.
  // 4. Refresh the access token, if necessary.
// sql config file
// my sql credentials
// gitignore my sql creds
// put in json object?
// npm install cors - app.use(cors)
// run both servers with one command?
// sanitization
// add session field to users table

// CLEANUP:
// remove cors  

app.get('*', (req, res) => {
   res.sendFile(resolve(__dirname, 'client', 'dist,', 'index.html'));
});

app.listen(PORT, () => {
   console.log('Server running on PORT: ' + PORT);
});