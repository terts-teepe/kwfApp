											/* Require libraries */
const express = require('express');
const router = express.Router();
const db = require('../models/database.js');
const bodyParser = require('body-parser');

											/* Invite friends page */
router.get('/', function(req, res) {
	// If session
	let user = req.session.user; 
	if(user) {
		res.render('inviteFriends', {title: 'friends'});
	}
	// If no session
	else {
		res.redirect('/login?message=' + encodeURIComponent("Login First"));
	}
});

router.post('/', function(req, res) {
	let selected = req.body.inviteFriends;
	// If Gmail was selected
	if (selected === 'Gmail') {
		res.redirect('/sendEmails');
	}
	// If SMS was selected
	else if (selected === 'SMS') {
		res.redirect('/messages');
	}
});

module.exports = router;