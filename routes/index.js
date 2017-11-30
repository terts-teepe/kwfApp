const express = require('express');
const router = express.Router();
const db = require('../models/database.js');
const bodyParser = require('body-parser');

router.get('/', function(req, res) {
	let user = req.session.user
	let currentUserId = user.id;
	let currentUserName = user.name;

	db.Activity.findAll({
		where: {
			friend: currentUserName
		}
	})

	.then((activities) => {
		console.log("check activities here")
		console.log(activities);
		res.render('index', {activities: activities})
		db.User.findOne({
			where: {
				id: Activity.plannerId
			}
		})
	})
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