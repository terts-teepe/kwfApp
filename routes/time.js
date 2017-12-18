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

// Render profile page
router.get('/', (req, res) => {
	let categorie = req.query.categorie;
	let friend = req.query.friends;
	let friendsIds = req.query.friendsIds;
	let currentUserId = req.session.user.id;
	let friends = [];
	db.Relationship.findAll({
		where: {action_user_id: currentUserId}
	})
	.then((ids) =>{
		for(var i=0; i<ids.length; i++){
			var friendId = ids[i].user_two_id;
			db.User.findOne({
				where: {id: friendId}
			})
			.then((friend)=>{
				var friendName = friend.dataValues.name;
				var id = friend.dataValues.id;
				var img = friend.dataValues.image;
				friends.push({name: friendName, id: id, img: img}); // Adding the same id
			})
			.then(()=>{
				console.log(friends)
				if(friends.length === ids.length){
					res.render('time', {friends: friends, categorie: categorie, friend: friend, friendsIds: friendsIds})
				}
			})
		}
	})
})


/*router.post('/', (req,res)=>{
	var currentUserName = req.session.user.name;
	let currentUserId = req.session.user.id;
	let categorie = req.body.categorie;
	let friends = req.body.friends;
	let friendsIds = req.body.friendId;
	let time = req.body.time;
	let date = req.body.date;
	let location = req.body.location;
	// If there are multiple friends
	if(Array.isArray(friends)){
			db.Activity.create({
				plannerId: currentUserId,
				plannerName: currentUserName,
				categorie: categorie,
				time: time,
				date: date,
				location: location
			})
			.then((activity)=>{
				for (var i = 0; i < friends.length; i++) {
					db.User.findOne({
						where : {
							id: friendsIds[i]
						},
						include : [	
							{model: db.Activity}
						]
					})
					.then ((user)=>{
						activity.setUsers(user)
						client.messages.create({
						    body: `Hello ${user.name} this is Emma, your friend ${currentUserName} has planned an activity, check it out!`,
						    to: user.phoneNumber,  // Text this number
						    from: '+3197004498785' // From a valid Twilio number
						})
						
						if(i === friends.length){
							res.redirect('/index')
						}
					})
				}
			})
	}
	else {
		db.Activity.create({
			plannerId: currentUserId,
			plannerName: currentUserName,
			categorie: categorie,
			time: time,
			date: date,
			location: location
		})
		.then((activity)=>{
			db.User.findOne({
				where: {
					id: friendsIds
				}
			})
			.then((user)=>{
				console.log("check phoneNumber");
				console.log(user.phoneNumber);
				activity.setUsers(user)
				client.messages.create({
				    body: `Hello ${user.name} this is Emma, your friend ${currentUserName} has planned an activity, check it out!`,
				    to: user.phoneNumber,  // Text this number
				    from: '+3197004498785' // From a valid Twilio number
				})
				res.redirect('/index')
			})
		})
	}
})*/

router.post('/', (req, res) =>{
    let categorie = req.query.categorie;
    let friends = req.query.friends;
	let friendsIds = req.query.friendsIds;
   	let currentUserName = req.session.user.name;
	let currentUserId = req.session.user.id;
	let time = req.body.time;
	let date = req.body.date;
	let location = req.body.location;
	console.log("Array.isArray(friends)")
	console.log(Array.isArray(friends))
	console.log("Array.isArray(friendsIds)")
	console.log(Array.isArray(friendsIds))
	console.log("friends");
	console.log(friends);
	console.log("friendsIds");
	console.log(friendsIds);
/*	console.log(window.location.hash.split('#')[1]friendsIds);*/
	// If there are multiple friends
	if(Array.isArray(friends)){
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
			/* Link activity to planner */
			db.User.findOne({
				where : {
					id: currentUserId
				}
			})
			.then ((user)=>{
				activity.setUsers(user)
			});
			for (var i = 0; i < friends.length; i++) {
				/* Link activity to friends */
				db.User.findOne({
					where : {
						id: friendsIds[i]
					},
					include : [	
						{model: db.Activity}
					]
				})
				.then ((user)=>{
					activity.setUsers(user)
					client.messages.create({
					    body: `Hello ${user.name} this is Emma, your friend ${currentUserName} has planned an activity, check it out!`,
					    to: user.phoneNumber,  // Text this number
					    from: '+3197004498785' // From a valid Twilio number
					})
					
					if(i === friends.length){
						res.redirect('/index')
					}
				})
			}
		});
	}
	else {
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
			/* Link activity to planner */
			db.User.findOne({
				where : {
					id: currentUserId
				}
			})
			.then ((user)=>{
				activity.setUsers(user)
			});
			/* Link activity to friends */
			db.User.findOne({
				where: {
					id: friendsIds
				}
			})
			.then((user)=>{
				activity.setUsers(user)
				client.messages.create({
				    body: `Hello ${user.name} this is Emma, your friend ${currentUserName} has planned an activity, check it out!`,
				    to: user.phoneNumber,  // Text this number
				    from: '+3197004498785' // From a valid Twilio number
				})
				res.redirect('/index')
			})
		})
	}
});

module.exports = router;