											/* Require libraries */
const express = require('express');
const router = express.Router();
const db = require('../models/database.js');
const bodyParser = require('body-parser');
const avatars = ['img/avatars/avatar-one.png', 'img/avatars/avatar-two.png', 'img/avatars/avatar-three.png','img/avatars/avatar-four.png', 'img/avatars/avatar-five.png', 'img/avatars/avatar-six.png', 'img/avatars/avatar-seven.png', 'img/avatars/avatar-eight.png', 'img/avatars/avatar-nine.png', 'img/avatars/avatar-ten.png', 'img/avatars/avatar-eleven.png', 'img/avatars/avatar-twelve.png', 'img/avatars/avatar-thirteen.png', 'img/avatars/avatar-fourteen.png', 'img/avatars/avatar-fifteen.png'];
const randomNumber = function() {
	return Math.floor(Math.random() * 15); 
}

											/* Register (reach method) page */
router.get('/', (req, res) => {
	let name = req.query.name;
	res.render('reachMethod', {name: name, title: 'plan activity'});
})

router.post('/', (req,res) => {
	let name = req.query.name;
	let email = req.body.email;
	let phoneNumber = req.body.phoneNumber;
	let password = req.body.password;
	// Create user
	db.User.create({
        name: name,
        password: password,
        email: email,
        phoneNumber: phoneNumber,
        image: avatars[randomNumber()]
    })
    .then((user) => {
        req.session.user = user;
        // Alert that user registered worked
        res.redirect('/addFriends?message=' + encodeURIComponent("User created"));
	})
})

module.exports = router;