const express = require('express');
const router = express.Router();
const db = require('../models/database.js');
const bodyParser = require('body-parser');
const avatars = ['img/avatars/avatar-one.png', 'img/avatars/avatar-two.png', 'img/avatars/avatar-three.png','img/avatars/avatar-four.png', 'img/avatars/avatar-five.png', 'img/avatars/avatar-six.png', 'img/avatars/avatar-seven.png', 'img/avatars/avatar-eight.png', 'img/avatars/avatar-nine.png', 'img/avatars/avatar-ten.png', 'img/avatars/avatar-eleven.png', 'img/avatars/avatar-twelve.png', 'img/avatars/avatar-thirteen.png', 'img/avatars/avatar-fourteen.png', 'img/avatars/avatar-fifteen.png'];
const randomNumber = function() {
	return Math.floor((Math.random() * 16) - 1);
}


router.get('/', (req, res) => {
	let name = req.query.name;
	res.render('reachMethod', {name: name});
})

router.post('/', (req,res) => {
	let name = req.query.name;
	let email = req.body.email;
	let phoneNumber = req.body.phoneNumber;
	let password = req.body.password;
	console.log(randomNumber);

	db.User.create({
	            name: name,
	            password: password,
	            email: email,
	            phoneNumber: phoneNumber,
	            image: avatars[randomNumber()]
	        })
	        .then((user) => {
	            req.session.user = user;
	            res.redirect('/addFriends?message=' + encodeURIComponent("User created"));
	            // Alert that user registered worked
        	})
})

module.exports = router;





//

// const express = require('express');
// const router = express.Router();
// const db = require('../models/database.js');
// const bodyParser = require('body-parser');


// router.get('/', (req, res) => {
// 	let name = req.query.name;
// 	let email = req.query.email;
// 	let number = req.query.number;
// 	res.render('password', {name: name, email: email, number: number});
// });

// router.post('/', (req,res)=> {
// 	let name = req.query.name;
// 	let email = req.query.email;
// 	let phoneNumber = req.query.number;
// 	let password = req.body.password;
//   	// Check if Username already exists
//   	db.User.findOne({
//       	where: {
//         	email: email
//       	}
//     })
//     .then((user) => {
//       	if (user) {
//         	res.redirect('/register?message=' + encodeURIComponent("Username already exists"));
//         	// Put alert that username already exist
//       	} else {
//         	db.User.create({
// 	            name: name,
// 	            password: password,
// 	            email: email,
// 	            phoneNumber: phoneNumber
// 	        })
// 	        .then((user) => {
// 	            req.session.user = user;
// 	            res.redirect('/addFriends?message=' + encodeURIComponent("User created"));
// 	            // Alert that user registered worked
//         	})
//  /*     	}
//     })*/
// })
// module.exports = router;