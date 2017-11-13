// Libraries
const express = require('express');
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');
const db = require(__dirname + '/models/database.js')
const app = express();

// Including usage of routes
const login = require('./routes/login');
const logout = require('./routes/logout');
const index = require('./routes/index');
const register = require('./routes/register');

const bcrypt = require('bcrypt');

// View engine setup
app.set('views', path.join(__dirname, '/src/views'));
app.set('view engine', 'pug');

// Middleware
app.use(bodyParser.json()); //activates middleware of body-parser -- request.body is nu beschikbaar onder elke app.post
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(express.static(path.join(__dirname, 'public'))); //To serve static files such as images, CSS files, and JavaScript files, use the express.static built-in middleware function in Express.

// Session
app.use(session({
  secret: 'oh wow very secret much security',
  resave: true,
  saveUninitialized: false
}));

//Routes
app.use('/login', login);
app.use('/logout', logout);
app.use('/index', index);
app.use('/register', register);

// Running server
app.listen(3000, () => {
  console.log('Server running')
})

module.exports = app;

