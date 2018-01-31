											/* Require libraries */
const express = require('express');
const router = express.Router();
const db = require('../models/database.js');
const bodyParser = require('body-parser');
const twilio = require('twilio');
const accountSid = 'ACbcdc77c3e680fef8b9eecbdb7bcc5ba4'; // Your Account SID from www.twilio.com/console
const authToken = 'f038a6a0dc3c0c41916100aeefca14f5';   // Your Auth Token from www.twilio.com/console
const client = new twilio(accountSid, authToken);

											/* Send Invite via SMS page */
router.get('/', function(req, res) {
	// If session
	let user = req.session.user; 
	if(user) {
  		res.render('messages');
  	}
	// If no session
	else {
		res.redirect('/login?message=' + encodeURIComponent("Login First"));
	}
});

router.post('/', (req, res) => {
	var currentUserName = req.session.user.name;
	let recipient = req.body.to;
	let name = req.body.name;
	let people = [];
	// If multiple friends are invited
	if(Array.isArray(name)) {
		// Loop over them
		for(var i=0; i<name.length; i++) {
			// Send each person an invite via SMS
			people.push({name: name[i] , phonenumber: recipient[i]});
			client.messages.create({
			    body: `Hallo ${people[i].name} Je vriend ${currentUserName} wil je graag uitnodigen voor Vriendendienst. Ga naar de website om een account aan te maken en voeg ${currentUserName} toe aan je netwerk: www.kwfvriendendienst.nl`,
			    to: people[i].phonenumber,  // Text this number
			    from: '+3197004498785' // From a valid Twilio number
			})
			// If loop is over
			if(i == name.length - 1) {
				res.render('friendsInvited', {people: people});
			}
		};
	}	
	// If one friend is invited
	else {
		// Send him an invite via SMS
		people.push({name: name , phonenumber: recipient})
		client.messages.create({
			body: `Hallo ${people[0].name} Je vriend ${currentUserName} wil je graag uitnodigen voor Vriendendienst. Ga naar de website om een account aan te maken en voeg ${currentUserName} toe aan je netwerk: www.kwfvriendendienst.nl`,
		    to: people[0].phonenumber,  // Text this number
		    from: '+3197004498785' // From a valid Twilio number
		})
		.then(() => {
			res.render('friendsInvited', {people: people});
		});
	}
});

module.exports = router;