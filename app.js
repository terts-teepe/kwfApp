											/* Require libraries */
const express = require('express');
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');
const db = require(__dirname + '/models/database.js');
const app = express();
const twilio = require('twilio');
const gcm = require('node-gcm');
const sender = new gcm.Sender('AIzaSyAnn1s-AWD_0i7pegLEZZty4U2-BopC5rA');
const firebase = require("firebase");
const pg = require('pg');

											/* Including usage of routes */
const login = require('./routes/login');
const logout = require('./routes/logout');
const index = require('./routes/index');
const profile = require('./routes/profile');
const activity = require('./routes/activity');
const home = require('./routes/home');
const addFriends = require('./routes/addFriends');
const invite = require('./routes/inviteFriends');
const tutorial = require('./routes/tutorial');
const name = require('./routes/name');
const reachMethod = require('./routes/reachMethod');
const password = require('./routes/password');
const sendEmails = require('./routes/sendEmails');
const messages = require('./routes/messages');
const chat = require('./routes/chat');
const friends = require('./routes/friends');
const time = require('./routes/time');
const volunteers = require('./routes/volunteers');
const noFriends = require('./routes/noFriends');
const profielTerts = require('./routes/profielTerts');
const profielPierre = require('./routes/profielPierre');
const chatFeed = require('./routes/chatfeed');
const contactVolunteerTerts = require('./routes/contactVolunteerTerts');
const contactVolunteerPierre = require('./routes/contactVolunteerPierre');
const activityPlanned = require('./routes/activityPlanned');

												/* View engine setup */
app.set('views', path.join(__dirname, '/src/views'));
app.set('view engine', 'pug');

												/* Middleware */
app.use('/', bodyParser()); //creates key-value pairs request.body in app.post, e.g. request.body.username

app.use(express.static('src/public')); //To serve static files such as images, CSS files, and JavaScript files, use the express.static built-in middleware function in Express.

												/* Session */
app.use(session({
  secret: 'oh wow very secret much security',
  resave: true,
  saveUninitialized: false
}));

												/* Use routes */
app.use(['/login', '/'], login);
app.use('/logout', logout);
app.use('/index', index);
app.use('/profile', profile);
app.use('/activity', activity);
app.use('/addFriends', addFriends);
app.use('/inviteFriends', invite);
app.use('/tutorial', tutorial);
app.use('/name', name);
app.use('/reachMethod', reachMethod);
app.use('/sendEmails', sendEmails);
app.use('/messages', messages);
app.use('/chat', chat);
app.use('/friends', friends);
app.use('/time', time);
app.use('/volunteers', volunteers);
app.use('/noFriends', noFriends);
app.use('/profielPierre', profielPierre);
app.use('/profielTerts', profielTerts);
app.use('/chatfeed', chatFeed);
app.use('/contactVolunteerTerts', contactVolunteerTerts);
app.use('/contactVolunteerPierre', contactVolunteerPierre);
app.use('/activityPlanned', activityPlanned);

                                           /* Running server */
app.listen(process.env.PORT || 8080, () => {
  console.log('Server running')
})