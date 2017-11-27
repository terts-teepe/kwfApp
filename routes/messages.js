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
	var people = [{phonenumber: '+31620528245', name: 'Terts'},
				  {phonenumber: '+31614845655', name: 'Rawan'}];
	var recipient = req.body.to;
	var name = req.body.name;
	console.log(people[0].phonenumber);
	console.log(people[1].phonenumber);

	for(var i=0; i<people.length; i++) {

		client.messages.create({
		    body: `Hello ${people[i].name}, do you want to join the vriendendienst network! Check it out here: https://share.proto.io/FAFPRN/`,
		    to: people[i].phonenumber,  // Text this number
		    from: '+3197004498785' // From a valid Twilio number
		})
		.then((message) => {
			console.log(people.length);
			if(i === people.length - 1) {
				console.log(people.length);
				console.log(message.sid)
				res.redirect('/inviteFriends');
				// res.send(`Your invitation has been sent to your friend ${people[i].name}! Send another invitation here: `)
			}
		});
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