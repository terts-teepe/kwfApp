											/* Require libraries */
const express = require('express');
const router = express.Router();
const db = require('../models/database.js');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

											/* Index page */
router.get('/', function(req, res) {
	// If session
	let user = req.session.user; 
	if(user) {
		let currentUserId = user.id;
		let currentUserName = user.name;
		// FInd current user
		db.User.findOne({
			where: {
				id: currentUserId
			},
			include : [	
				{
					model: db.Activity,
					include: [db.User]
				}
			]
		})
		.then((user) => { 
			var statusActivities = false;
			// If user has activities
			if(user.dataValues.activities.length !== 0){
				// Loop over activities
				for (var i = 0; i < user.dataValues.activities.length; i++) {
					// If the status of the activity is true & if the current user is the planner or the accepter
					if(user.dataValues.activities[i].status === true && (user.dataValues.activities[i].accepter === currentUserId || user.dataValues.activities[i].plannerId === currentUserId)){
						statusActivities = true;
					}
					// When loop is over
					if(i === user.dataValues.activities.length-1){
						res.render('index', {user: user, currentUserId: currentUserId, statusActivities: statusActivities})
					}
				}
			}
			// If user has no activities
			else {
				res.render('index', {user: user, title: 'activities', statusActivities: statusActivities})
			}
		})
	}
	// If no session
	else {
		res.redirect('/login?message=' + encodeURIComponent("Login First"));
	}
})

module.exports = router;