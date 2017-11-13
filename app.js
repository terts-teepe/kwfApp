// Libraries
const express = require('express'),
	    path = require('path'),
      session = require('express-session'),
      bodyParser = require('body-parser'),
      db = require(__dirname + '/models/database.js'),
      app = express(),
      bcrypt = require('bcrypt'),

// Including usage of routes
      login = require('./routes/login'),
      logout = require('./routes/logout'),
      index = require('./routes/index');

// View engine setup
app.set('views', path.join(__dirname, '/src/views'));
app.set('view engine', 'pug');

// Middleware
app.use('/', bodyParser()); //creates key-value pairs request.body in app.post, e.g. request.body.username

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

// Running server
app.listen(3000, () => {
  console.log('Server running')
})

module.exports = app;

