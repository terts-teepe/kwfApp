const express = require('express');
const router = express.Router();
const db = require('../models/database.js');
const bodyParser = require('body-parser');
let	bunyan = require('bunyan');
const nodemailer = require('nodemailer');

// Create a SMTP transporter object
let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'kwfvriendendienst@gmail.com',
        pass:  'jijbentmijnvriend'
    },
    logger: bunyan.createLogger({
        name: 'nodemailer'
    }),
    debug: true // include SMTP traffic in the logs
}, {
    from: 'Emma van KWF <kwfvriendendienst@gmail.com>',
    headers: {
        'X-Laziness-level': 1000 // just an example header, no need to use this
    }
});

// Render profile page
router.get('/', function(req, res) {
	res.render('sendEmails')
})

router.post('/', (req,res)=>{
/*	let currentUser = req.session.user.name;*/
	let friendName = req.body.name;
	let friendEmail = req.body.email;
	console.log(friendEmail)
	console.log(friendName)
	let people = [];
	for(var i= 0; i<friendEmail.length; i++){
		people.push({name: friendName[i] , friendEmail: friendEmail[i]})
		let message = {
		    // Comma separated list of recipients
		    to: `${people[i].friendEmail}`,
		    // Subject of the message
		    subject: `You have an invitation`,
		    // plaintext body
		    text: `Hello ${people[i].name}`,
		    // HTML body
		    html: `<p>Would you like to join the vriendendienst network! Check it out here: <a href='https://share.proto.io/FAFPRN/'></p>`
		}
		console.log('Sending Mail');
		transporter.sendMail(message, (error, info) => {
		    if (error) {
		        console.log('Error occurred');
		        console.log(error.message);
		        return;
		    }
		    console.log('Message sent successfully!');
		    console.log('Server responded with "%s"', info.response);
		    transporter.close();
		});
		if(i == friendEmail.length - 1){
			res.render('friendsInvited', {people: people});
		}
	}
})

module.exports = router;