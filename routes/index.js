const express = require('express');
const router = express.Router();
const db = require('../models/database.js');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

/*			include: [
				{ model: Time, 
					where: {
			            date: {
			                $gte: today,
			                $lte: lastDay
			            },
		        	}, 
		        	order: '"date" ASC',
				include: [{model: Task}]
			}]*/
/*			include : {model: db.Activity, where: {status: true}}*/
/*			include : {model: db.Activity, where: {status: true}, include: [db.User]}*/
router.get('/', function(req, res) {
	if(req.session.user) {
		let user = req.session.user
		let currentUserId = user.id;
		let currentUserName = user.name;
		db.User.findOne({
			where: {
				id: currentUserId
			},
			// include : [	
			// 	{
			// 		model: db.Activity,
			// 		where: {
			// 			status: true
			// 		},
			// 		include: [model: db.User]
			// 	}
			// ]
			include : [	
				{
					model: db.Activity,
					include: [db.User]
				}
			]
		})
		.then((user) => {
			var statusActivities = false;
			if(user.dataValues.activities.length !== 0){
				for (var i = 0; i < user.dataValues.activities.length; i++) {
					if(user.dataValues.activities[i].status === true){
						statusActivities = true;
					}
					if(i === user.dataValues.activities.length-1){
						console.log("statusActivities")
						console.log(statusActivities)
			/*				db.User.findOne({
								where: {
									id: user.activity.plannerId
								}
							})
							.then((planner)=>{
								db.User.findOne({
									where: {
										id: activity.accepter
									}
								})
								.then((accepter)=>{*/
									res.render('index', {user: user, currentUserId: currentUserId, statusActivities: statusActivities})
			/*					})*/
			/*				})*/
					}
				}
			}
			else {
				res.render('index', {user: user, title: 'activities', statusActivities: statusActivities})
			}
/*			db.Activity.findAll({
				where: {
							[Op.or]: [{plannerId: currentUserId}, {accepter: currentUserId}]
						},
				include: [
					{
						model: db.User
					}
				]
			})
			.then((activities)=>{
				console.log("activities")
				console.log(activities)
				if(activities.length !== 0){
					res.render('index', {activities: activities, currentUserName})
				}
				else {
					res.render('index', {currentUserName})
				}			
			})*/

		})

	}
	else {
		res.redirect('/login?message=' + encodeURIComponent("Login First"));
	}
})

module.exports = router;