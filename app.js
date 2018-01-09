// Libraries
const express = require('express');
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');
const db = require(__dirname + '/models/database.js');
const app = express();
const bcrypt = require('bcrypt');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const twilio = require('twilio');
const webpush = require('web-push');
const gcm = require('node-gcm');
const sender = new gcm.Sender('AIzaSyAnn1s-AWD_0i7pegLEZZty4U2-BopC5rA');
const firebase = require("firebase");
// var message = new gcm.Message({
//     data: { key1: 'msg1' }
// });
// VAPID keys should only be generated only once.
// const vapidKeys = webpush.generateVAPIDKeys();
// console.log(vapidKeys);

// const twilio-common = require('twilio-common');
// const twilio-chat = require('twilio-chat');

// VAPID keys should only be generated only once.
/*const vapidKeys = webpush.generateVAPIDKeys();

webpush.setVapidDetails(
  'mailto:web-push-book@gauntface.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);*/

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
const tutorial = require('./routes/tutorial');
const name = require('./routes/name');
const reachMethod = require('./routes/reachMethod');
const password = require('./routes/password');
const sendEmails = require('./routes/sendEmails');
const messages = require('./routes/messages')
const chatbot = require('./routes/chatbot')
const chat = require('./routes/chat')
const friends = require('./routes/friends')
const time = require('./routes/time')
// const friendsInvited = require('./routes/friendsInvited')
const volunteers = require('./routes/volunteers')
const noFriends = require('./routes/noFriends')
const profielTerts = require('./routes/profielTerts')
const profielPierre = require('./routes/profielPierre')


//these are Terts his firebase details:
var config = {
  	apiKey: "AIzaSyAnn1s-AWD_0i7pegLEZZty4U2-BopC5rA",
    authDomain: "kwfapp.firebaseapp.com",
    databaseURL: "https://kwfapp.firebaseio.com",
    projectId: "kwfapp",
    storageBucket: "gs://kwfapp.appspot.com",
    // messagingSenderId: "1034094468770"
};

firebase.initializeApp(config);


// const friendsInvited = require('./routes/friendsInvited')




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
app.use(['/login', '/'], login);
app.use('/logout', logout);
app.use('/index', index);
app.use('/register', register);
app.use('/profile', profile);
app.use('/activity', activity);
// app.use('/home', home);
app.use('/addFriends', addFriends);
app.use('/inviteFriends', invite);
app.use('/signin', signin);
app.use('/tutorial', tutorial);
app.use('/name', name);
app.use('/reachMethod', reachMethod);
// app.use('/password', password);
app.use('/sendEmails', sendEmails);
app.use('/messages', messages);
/*app.use('/chatbot', chatbot);*/
app.use('/chat', chat);
app.use('/friends', friends);
app.use('/time', time);
app.use('/volunteers', volunteers);
// app.use('/friendsInvited', friendsInvited);
app.use('/noFriends', noFriends);
app.use('/profielPierre', profielPierre);
app.use('/profielTerts', profielTerts);


/*// Redirect the user to the OAuth provider for authentication.  When
// complete, the provider will redirect the user back to the application at
//     /auth/provider/callback
app.get('/auth/provider', passport.authenticate('provider'));

// The OAuth provider has redirected the user back to the application.
// Finish the authentication process by attempting to obtain an access
// token.  If authorization was granted, the user will be logged in.
// Otherwise, authentication has failed.
app.get('/auth/provider/callback',
  passport.authenticate('provider', { successRedirect: '/profile',
                                      failureRedirect: '/' })); */

// Running server
app.listen(8080, () => {
  console.log('Server running')
})


// <script src="https://www.gstatic.com/firebasejs/4.6.2/firebase.js"></script>
// <script>
//   // Initialize Firebase
//   var config = {
//     apiKey: "AIzaSyAnn1s-AWD_0i7pegLEZZty4U2-BopC5rA",
//     authDomain: "kwfapp.firebaseapp.com",
//     databaseURL: "https://kwfapp.firebaseio.com",
//     projectId: "kwfapp",
//     storageBucket: "",
//     messagingSenderId: "1034094468770"
//   };
//   firebase.initializeApp(config);
// </script>