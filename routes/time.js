											/* Require libraries */
const express = require('express');
const router = express.Router();
const db = require('../models/database.js');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const twilio = require('twilio');
const accountSid = 'ACbcdc77c3e680fef8b9eecbdb7bcc5ba4'; // Your Account SID from www.twilio.com/console
const authToken = 'f038a6a0dc3c0c41916100aeefca14f5';   // Your Auth Token from www.twilio.com/console
const client = new twilio(accountSid, authToken);

											/* Register (time) page */
router.get('/', (req, res) => {
	let categorie = req.query.categorie;
	let friendsIds = req.query.friends;
	let friends = [];
	// If session
	let user = req.session.user; 
	if(user) {
		let currentUser = user.name;
		let currentUserId = user.id;
		// Find current user's friends
		db.Relationship.findAll({
			where: {user_one_id: currentUserId}
		})
		.then((ids) =>{
			// Loop over them
			for(var i=0; i<ids.length; i++){
				let friendId = ids[i].user_two_id;
				// Find each friend's information and push them to friends array
				db.User.findOne({
					where: {id: friendId}
				})
				.then((friend)=>{
					let friendName = friend.dataValues.name;
					let id = friend.dataValues.id;
					let img = friend.dataValues.image;
					friends.push({name: friendName, id: id, img: img});
				})
				.then(()=>{
					// When loop is over
					if(friends.length === ids.length){
						res.render('time', {friends: friends,user:currentUser,  categorie: categorie, friendsIds: friendsIds/*, Ids: Ids*/ , title: 'plan activity'})
					}
				});
			}
		});
	}
	// If no session
	else {
		res.redirect('/login?message=' + encodeURIComponent("Login First"));
	}
});

router.post('/', (req, res) =>{
    let categorie = req.query.categorie;
	let friendsIds = req.query.friends.split(',');
   	let currentUserName = req.session.user.name;
	let currentUserId = req.session.user.id;
	let time = req.body.time;
	let date = req.body.date;
	let location = req.body.location;
	// If there are multiple friends
	if(Array.isArray(friendsIds)){
		// Create activity
		db.Activity.create({
			plannerId: currentUserId,
			plannerName: currentUserName,
			categorie: categorie,
			time: time,
			date: date,
			location: location,
			status: false
		})
		.then((activity)=>{
			// Link activity to planner
			db.User.findOne({
				where : {
					id: currentUserId
				}
			})
			.then ((user)=>{
				activity.setUsers(user)
			});
			for (var i = 0; i < friendsIds.length; i++) {
				// Link activity to friends
				db.User.findOne({
					where : {
						id: Number(friendsIds[i])
					},
					include : [	
						{model: db.Activity}
					]
				})
				.then ((user)=>{
					activity.setUsers(user);
					client.messages.create({
					    body: `Hallo ${user.name} dit is Emma van Vriendendienst, je vriend ${currentUserName} heeft je uitgenodigd voor een activiteit, bekijk de activiteit op de website!`,
					    to: user.phoneNumber,  // Text this number
					    from: '+3197004498785' // From a valid Twilio number
					});
				})
				.then(()=>{
					// If loop is over
					if(i === friendsIds.length){
						res.redirect('/activityPlanned')
					}
				});
			}
		});
	}
	// If there is only one friend
	else {
		// Create activity
		db.Activity.create({
			plannerId: currentUserId,
			plannerName: currentUserName,
			categorie: categorie,
			time: time,
			date: date,
			location: location,
			status: false
		})
		.then((activity)=>{
			// Link activity to planner
			db.User.findOne({
				where : {
					id: currentUserId
				}
			})
			.then ((user)=>{
				activity.setUsers(user);
			});
			// Link activity to friends
			db.User.findOne({
				where: {
					id: friendsIds
				}
			})
			.then((user)=> {
				activity.setUsers(user);
				client.messages.create({
				    body: `Hallo ${user.name} dit is Emma van Vriendendienst, je vriend ${currentUserName} heeft je uitgenodigd voor een activiteit, bekijk de activiteit op de website!`,
				    to: user.phoneNumber,  // Text this number
				    from: '+3197004498785' // From a valid Twilio number
				});
				res.redirect('/activityPlanned');
			});
		});
	}
});

module.exports = router;