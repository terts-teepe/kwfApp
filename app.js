// Libraries
const express = require('express');
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');
const db = require(__dirname + '/models/database.js');
const app = express();
const bcrypt = require('bcrypt');

// Including usage of routes
const signin = require('./routes/signin');
const login = require('./routes/login');
const logout = require('./routes/logout');
const index = require('./routes/index');
const register = require('./routes/register');
const profile = require('./routes/profile');
const activity = require('./routes/activity');
const home = require('./routes/home');
const addFriends = require('./routes/addFriends');
const invite = require('./routes/inviteFriends');



// View engine setup
app.set('views', path.join(__dirname, '/src/views'));
app.set('view engine', 'pug');

// Middleware
app.use('/', bodyParser()); //creates key-value pairs request.body in app.post, e.g. request.body.username

app.use(express.static('src/public')); //To serve static files such as images, CSS files, and JavaScript files, use the express.static built-in middleware function in Express.

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
app.use('/profile', profile);
app.use('/activity', activity);
app.use(['/home', '/'], home);
app.use('/addFriends', addFriends);
app.use('/inviteFriends', invite);
app.use('/signin', signin);


// Running server
app.listen(3000, () => {
  console.log('Server running')
})