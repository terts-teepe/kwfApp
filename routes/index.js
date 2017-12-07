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
		console.log("user.dataValues.activities[0].dataValues")
		console.log(user.dataValues.activities[0].dataValues)
		if(user.dataValues.activities){
			for (var i = 0; i < (user.dataValues.activities).length; i++) {
				console.log("plannerId")
				console.log(user.dataValues.activities[i].dataValues.plannerId)
				db.User.findOne({
					where: {
						id: user.dataValues.activities[i].dataValues.plannerId
					}
				})
				.then((planner)=>{
/*					console.log("planner")
					console.log(planner.dataValues.name)*/
					var planner = planner.dataValues.name
/*					console.log("user.dataValues.activities[i]")
					console.log(user.dataValues.activities[i])
					console.log("typeof******")
					console.log(typeof(user.dataValues))*/
					user.dataValues["plannerName"] = planner;
/*					console.log("user.dataValues")
					console.log(user.dataValues)*/
/*					console.log("user.dataValues.activities")
					console.log(user.dataValues.activities)*/
					console.log("user.dataValues")
					console.log(user.dataValues)
				})
				.then(()=>{
					if(i = (user.dataValues.activities).length - 1){
						console.log("user")
						console.log(user)
						res.render('index', {user: user})
					}
				})
			}
		}
/*		User.findAll({
>>>>>>> 99ae903f918efa7a2cb1c29edd805ce68d84d151
			where: {
				id: currentUserId
			},
			include : [	
				{model: db.Activity}
			]
		})
		.then((user) => {
			console.log("user.activity")
			console.log(user.dataValues.activities)
			if(user.dataValues.activities.length != 0){
				for (var i = 0; i < (user.dataValues.activities).length; i++) {
					db.User.findOne({
						where: {
							id: user.dataValues.activities[i].plannerId
						}
					})
					.then((planner)=>{
						console.log("planner")
						console.log(planner.dataValues.name)
	/*					console.log("user.dataValues.activities[i]")
						console.log(user.dataValues.activities[i])*/
						// user.dataValues.activities[i]["plannerName"] = planner.dataValues.name;
						console.log("user.dataValues.activities.length")
						console.log(user.dataValues.activities.length)
						console.log("user.dataValues.activities")
						console.log(user.dataValues.activities)
						console.log("user.dataValues.activities[i]")
						console.log(user.dataValues.activities[i])
						if (i = user.dataValues.activities.length) {
							console.log("user")
							console.log(user)
							res.render('index', {user: user, planner: planner})
						}
					
			
			

			else {
				res.render('index', {user: user})
			}
	/*		User.findAll({
				where: {
					id: activities.plannerId
				}
			})
			.then((planners)=>{
				console.log("check activities here")
				console.log(activities);
				res.render('index', {activities: activities, planners: planners})
			})*/
			// db.User.findOne({
			// 	where: {
			// 		id: Activity.plannerId
			// 	}
			// })
	})

	}
	
	else {
		res.redirect('/login?message=' + encodeURIComponent("Login First"));
	}

	
});




//   if (user) {
//   	db.Activity.findAll({
//   		where: {
//   			plannerId: currentUserId
//   		}
//   	})
//   	.then((activities)=> {
//   		if(activities){
//   			let userActivities = []
//   			for (var i = 0; i < activities.length; i++) {
//   				console.log(activities[i].dataValues)
//   				userActivities.push(activities[i].dataValues)
//   			}
//   			res.render('index', {user: user.name, activities: userActivities})
//   		}
//   		else {
//   			res.render('index', {user: user.name})
//   		}
//   	})
//   } else {
//     res.redirect('/login?message=' + encodeURIComponent("Login First"));
//   }
// })

module.exports = router;