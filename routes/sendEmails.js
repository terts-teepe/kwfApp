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
	res.render('sendEmails', {title: 'friends'})
})

router.post('/', (req,res)=>{
/*	let currentUser = req.session.user;*/
	let friendName = req.body.name;
	let friendEmail = req.body.email;
	let people = []
	let user = req.session.user;
	if(Array.isArray(friendEmail)) {
		for(var i= 0; i<friendEmail.length; i++){
			people.push({name: friendName[i] , friendEmail: friendEmail[i]})
			let message = {
			    // Comma separated list of recipients
			    to: `${people[i].friendEmail}`,
			    // Subject of the message
			    subject: `Uitnodiging Vriendendienst`,
			    // HTML body
			    html: `<h2>Hallo ${people[i].name}</h2><p>Je vriend ${user.name} wil je graag uitnodigen voor <a href='http://www.kwfvriendendienst.nl'>Vriendendienst</a>, ga naar de website om een account aan te maken en voeg ${user.name} toe aan je netwerk.</p>`
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
			if(i == (friendEmail.length - 1)){
				res.render('friendsInvited', {people: people});
			}
		}
	}
	else {
		people.push({name: friendName , friendEmail: friendEmail})
		let message = {
		    // Comma separated list of recipients
		    to: `${people[0].friendEmail}`,
		    // Subject of the message
		    subject: `Uitnodiging Vriendendienst`,
		    // HTML body
		    html: `<h2>Hallo ${people[0].name}</h2><p>Je vriend ${user.name} wil je graag uitnodigen voor Vriendendienst, ga naar de website om een account aan te maken en voeg ${user.name} toe aan je netwerk. --> <a href='http://www.kwfvriendendienst.nl'>Vriendendienst</a>`
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
		res.render('friendsInvited', {people: people});
	}
})

module.exports = router;