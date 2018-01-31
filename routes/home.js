											/* Require libraries */
const express = require('express');
const router = express.Router();
const db = require('../models/database.js');
const bodyParser = require('body-parser');

											/* Home page */
router.get('/', function(req, res) {
	// If session
	let user = req.session.user; 
	if(user) {
		res.render('home');
	}
	// If no session
	else {
		res.redirect('/login?message=' + encodeURIComponent("Login First"));
	}
});

module.exports = router;