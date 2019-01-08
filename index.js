const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const PORT = process.env.PORT || 9000;
const { resolve } = require('path');
const controller = require('./backend/controller');

const app = express();

const corsOptions = {
   origin: 'http://localhost:3000',
   credentials: true,
 }
 
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false })); 
app.use(cookieParser());
app.use(express.static(resolve(__dirname, 'client', 'dist')));

controller(app);

app.listen(PORT, () => {
   console.log('Server running on PORT: ' + PORT);
});


