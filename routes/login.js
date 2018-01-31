											/* Require libraries */
const express = require('express');
const router = express.Router();
const db = require('../models/database.js');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

											/* Login page */
router.get('/', function(req, res) {
	res.render('login');
});

router.post('/', function(req, res) {
	let name = req.body.name;
	let password = req.body.password;
	// If name was empty
  	if (name.length === 0) {
		res.redirect('/login?message=' + encodeURIComponent("Please fill out your username"));
		return;
  	}
  	// If password was empty
  	if (password.length === 0) {
		res.redirect('/login?message=' + encodeURIComponent("Please fill out your password."));
		return;
  	}
	// Find user  	
  	db.User.findOne({
		where: {
			name: name
		}
  	})
  	.then((user)=> {
  		// If user was found
		if (user){
			// Compare passwords
			let hash =  user.password
			bcrypt.compare(password, hash, function(err, result) {
				// If password is correct
				if(result === true){
					req.session.user = user;
					res.redirect('/index?message=' + encodeURIComponent("logged in successfully"));
				}
				// If not
				else{
					res.redirect('/login?message=' + encodeURIComponent("Invalid email or password."));
				}
			});
	  	}
	})
});

module.exports = router;