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
        user: 'email',
        pass:  `password`
    },
    logger: bunyan.createLogger({
        name: 'nodemailer'
    }),
    debug: true // include SMTP traffic in the logs
}, {
    from: '<email>',
    headers: {
        'X-Laziness-level': 1000 // just an example header, no need to use this
    }
});

// Render profile page
router.get('/', function(req, res) {
	res.render('inviteFriends')
})

router.post('/', (req,res)=>{
	for (var i = 0; i < comments.length; i++){
		let message = {
		    // Comma separated list of recipients
		    to: ``,
		    // Subject of the message
		    subject: 'Friends Invitation', //
		    // plaintext body
		    text: `Hello`,
		    // HTML body
		    html: ``
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
	}
})

module.exports = router;