const express = require('express');
const router = express.Router();
const db = require('../models/database.js');
const bodyParser = require('body-parser');


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
	console.log(name)
	console.log(email)
	console.log(phoneNumber)
	console.log(password)
  	// Check if Username already exists
/*  	db.User.findOne({
      	where: {
        	email: email
      	}
    })
    .then((user) => {
      	if (user) {
        	res.redirect('/register?message=' + encodeURIComponent("Username already exists"));
        	// Put alert that username already exist
      	} else {*/
        	db.User.create({
	            name: name,
	            password: password,
	            email: email,
	            phoneNumber: phoneNumber
	        })
	        .then((user) => {
	            req.session.user = user;
	            res.redirect('/addFriends?message=' + encodeURIComponent("User created"));
	            // Alert that user registered worked
        	})
 /*     	}
    })*/
})
module.exports = router;