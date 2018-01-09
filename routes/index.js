const express = require('express');
const router = express.Router();
const db = require('../models/database.js');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

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
				{
					model: db.Activity,
					include: [db.User]
				}
			]
		})
		.then((user) => {
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
			console.log("user.dataValues.activities[0]")
			console.log(user.dataValues.activities[0])
			if(user.dataValues.activities.length !== 0){
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
						res.render('index', {user: user, currentUserId: currentUserId})
/*					})*/
/*				})*/
			}
			else {
				res.render('index', {user: user, title: 'activities'})
			}
		})

	}
	else {
		res.redirect('/login?message=' + encodeURIComponent("Login First"));
	}
})

module.exports = router;