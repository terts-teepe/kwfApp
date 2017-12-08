const express = require('express');
const router = express.Router();
const db = require('../models/database.js');
const bodyParser = require('body-parser');

router.get('/', function(req, res) {
	if(req.session.user) {
		let user = req.session.user
		let currentUserId = user.id;
		let currentUserName = user.name;

		db.User.findOne({
			where: {
				id: currentUserId
			},
			include : [	
				{model: db.Activity}
			]
		})
		.then((user) => {
			if(user.dataValues.activities.length !== 0){
				res.render('chat', {user: user})
			}

			else {
				res.render('chat', {user: user})
			}
		})

	}
	
	else {
		res.redirect('/login?message=' + encodeURIComponent("Login First"));
	}
})


module.exports = router;