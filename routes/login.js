const express = require('express');
const router = express.Router();
const db = require('../models/database.js');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

// Render index form
router.get('/', function(req, res) {
	res.render('login');
});

router.post('/', function(req, res) {
	let name = req.body.name;
	let password = req.body.password;
  	if (name.length === 0) {
		res.redirect('/login?message=' + encodeURIComponent("Please fill out your username"));
		return;
  	}

  	if (password.length === 0) {
		res.redirect('/login?message=' + encodeURIComponent("Please fill out your password."));
		return;
  	}
  	db.User.findOne({
		where: {
			name: name
		}
  	})
  	.then((user)=> {
		if (user){
			var hash =  user.password
			bcrypt.compare(password, hash, function(err, result) {
				if(result === true){
					req.session.user = user;
					res.redirect('/index?message=' + encodeURIComponent("logged in successfully"));
				}
				else{
					res.redirect('/login?message=' + encodeURIComponent("Invalid email or password."));
				}
			});
	  	}
	})
});

module.exports = router;