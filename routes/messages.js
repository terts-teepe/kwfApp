const express = require('express');
const router = express.Router();
const db = require('../models/database.js');
const bodyParser = require('body-parser');
const twilio = require('twilio');
const accountSid = 'ACbcdc77c3e680fef8b9eecbdb7bcc5ba4'; // Your Account SID from www.twilio.com/console
const authToken = 'f038a6a0dc3c0c41916100aeefca14f5';   // Your Auth Token from www.twilio.com/console

const client = new twilio(accountSid, authToken);

router.get('/', function(req, res) {
  res.render('messages');
});


router.post('/', (req, res) => {
/*	var people = [{phonenumber: '+31620528245', name: 'Terts'},
				  {phonenumber: '+31614845655', name: 'Rawan'}];*/
	let recipient = req.body.to;
	let name = req.body.name;
	var people = [];

	if(Array.isArray(name)) {
		for(var i=0; i<name.length; i++) {
	/*		if(name.length === 1){
				people = {name: name[i] , phonenumber: recipient[i]}
				client.messages.create({
				    body: `Hello ${name}, would you like to join the vriendendienst network! Check it out here: https://share.proto.io/FAFPRN/`,
				    to: recipient,  // Text this number
				    from: '+3197004498785' // From a valid Twilio number
				})
			}
			else{*/
	/*			people = []*/
				people.push({name: name[i] , phonenumber: recipient[i]})
				console.log("this is people" + people);
				client.messages.create({
				    body: `Hello ${people[i].name}, would you like to join the vriendendienst network! Check it out here: https://share.proto.io/FAFPRN/`,
				    to: people[i].phonenumber,  // Text this number
				    from: '+3197004498785' // From a valid Twilio number
				})
	/*		}*/
			if(i == name.length - 1) {
				console.log(people.length);
				// res.send(`Your invitation has been sent to your friend ${people[i].name}! Send another invitation here: `)

				res.render('friendsInvited', {people: people});
				// res.send(`Your invitation has been sent to your friend ${people[i].name}! Send another invitation here: `)

			}
		};
	}

	

	else {
		
		people.push({name: name , phonenumber: recipient})
		client.messages.create({
		    body: `Hello ${people[0].name}, would you like to join the vriendendienst network! Check it out here: https://share.proto.io/FAFPRN/`,
		    to: people[0].phonenumber,  // Text this number
		    from: '+3197004498785' // From a valid Twilio number
		})
		.then(() => {
			res.render('friendsInvited', {people: people});
		})
	}
});

// router.post('/messages', (req, res) =>{
//     console.log(req.body);
//     var msgFrom = req.body.From;
//     var msgBody = req.body.Body;

//     res.send(`
//     	<Response>
//     		<messages>
//     			Hello ${msgFrom}. You said: ${msgBody}
//     		</messages>
//     	</Response>
//     `);
// });


module.exports = router;