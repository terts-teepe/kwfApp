											/* Require libraries */ 
const express = require('express');
const router = express.Router();
const db = require('../models/database.js');
const bodyParser = require('body-parser');

											/* Register (password) page */
router.get('/', (req, res) => {
	let name = req.query.name;
	let email = req.query.email;
	let number = req.query.number;
	res.render('password', {name: name, email: email, number: number});
});

router.post('/', (req,res)=> {
	let name = req.query.name;
	let email = req.query.email;
	let phoneNumber = req.query.number;
	let password = req.body.password;
  	// Check if user already exists
  	db.User.findOne({
      	where: {
        	email: email
      	}
    })
    .then((user) => {
    	// If so
      	if (user) {
        	// Put alert that username already exist
        	res.redirect('/register?message=' + encodeURIComponent("Username already exists"));
      	}
      	// If not
      	else {
      		// Create user
			db.User.create({
		        name: name,
		        password: password,
		        email: email,
		        phoneNumber: phoneNumber
		    })
		    .then((user) => {
		        req.session.user = user;
		        // Alert that user registered worked
		        res.redirect('/addFriends?message=' + encodeURIComponent("User created"));
			});
		}
	});
});

module.exports = router;