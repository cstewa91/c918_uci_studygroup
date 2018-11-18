const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const PORT = process.env.PORT || 9000;
const { resolve } = require('path');
const controller = require('./backend/controller');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false })); 
app.use(cookieParser());
app.use(express.static(resolve(__dirname, 'client', 'dist')));

controller(app);

app.listen(PORT, () => {
   console.log('Server running on PORT: ' + PORT);
});
