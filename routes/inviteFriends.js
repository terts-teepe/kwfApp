const express = require('express');
const router = express.Router();
const db = require('../models/database.js');
const bodyParser = require('body-parser');

// Render profile page
router.get('/', function(req, res) {
	res.render('inviteFriends')
});

router.post('/', function(req, res) {
	var selected = req.body.inviteFriends;
	console.log('Check selected value:')
	if (selected === 'Gmail') {
		res.redirect('/sendEmails')
	} 
	else if (selected === 'SMS') {
		res.redirect('/messages')
	}
});

module.exports = router;