											/* Require libraries */
const express = require('express');
const router = express.Router();
const db = require('../models/database.js');
const bodyParser = require('body-parser');

											/* Contact with a volunteer (Pierre) page */
router.get('/', (req, res) => {
	// If session
	let user = req.session.user;
	if(user) {
		let name = req.session.user.name
		res.render('contactVolunteerPierre', {name: name, title: 'plan activity'});
	}
	// If no session
	else {
		res.redirect('/login?message=' + encodeURIComponent("Login First"));
	}
})

module.exports = router;