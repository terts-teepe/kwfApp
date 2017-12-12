const express = require('express');
const router = express.Router();
const db = require('../models/database.js');
const bodyParser = require('body-parser');
const twilio = require('twilio');
const accountSid = 'ACbcdc77c3e680fef8b9eecbdb7bcc5ba4'; // Your Account SID from www.twilio.com/console
const authToken = 'f038a6a0dc3c0c41916100aeefca14f5';   // Your Auth Token from www.twilio.com/console
const client = new twilio(accountSid, authToken);

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

router.post('/', (req,res)=>{
	let user = req.session.user;
	let currentUserId = user.id;
	let currentUserName = user.name;
	let clickedBtn = req.body.btn;
	let activityId = req.body.id;
	let status;

	if(clickedBtn === "Accept"){
		status = true;
		db.Activity.findOne({
			where: {
				id: activityId
			},
			include: {model: db.User}
		})
		.then((activity)=> {
			console.log("activity")
			console.log(activity)
			activity.update({
				status: true,
				accepter: currentUserId
			})
			.then(()=>{
				db.User.findOne({
					where: {id: activity.plannerId}
				})
				.then((planner)=>{
					db.User.findOne({
						where: {id: activity.accepter}						
					})
					.then ((accepter)=>{
						client.messages.create({
						    body: `Hallo ${planner.name}, jouw vriend ${accepter.name} heeft je uitnodiging om te ${activity.categorie} geaccepteerd, Bekijk het op je profiel!`,
						    to: planner.phoneNumber,  // Text this number
						    from: '+3197004498785' // From a valid Twilio number
						})
					})
				})
				.then(()=> {
					res.send(req.body);				
				})
			})
		})
	}
	else {
		status = false
		res.send(req.body);
	}
})

module.exports = router;