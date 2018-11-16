const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = process.env.PORT || 9000;
const { resolve } = require('path');
const controller = require('./backend/controller');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(cors());
app.use(express.json());
app.use(express.static(resolve(__dirname, 'client', 'dist')));

controller(app);

app.get('*', (req, res) => {
   res.sendFile(resolve(__dirname, 'client', 'dist,', 'index.html'));
});

app.listen(PORT, () => {
   console.log('Server running on PORT: ' + PORT);
});
