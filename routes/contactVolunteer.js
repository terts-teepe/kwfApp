											/* Require libraries */
const express = require('express');
const router = express.Router();
const db = require('../models/database.js');
const bodyParser = require('body-parser');

											/* Contact with volunteers page */
router.get('/', (req, res) => {
	// If session
	let user = req.session.user;
	if(user) {
		let name = req.query.name;
		res.render('contactVolunteer', {name: name, title: 'plan activity'});
	}
	// If no session
	else {
		res.redirect('/login?message=' + encodeURIComponent("Login First"));
	}
})

module.exports = router;