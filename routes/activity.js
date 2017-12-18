const express = require('express');
const router = express.Router();
const db = require('../models/database.js');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// Render profile page
router.get('/', (req, res) => {
	var currentUserId = req.session.user.id;
	var friends = [];
	db.Relationship.findAll({
		where: {action_user_id: currentUserId}
	})
	.then((ids) =>{
		if (ids.length === 0) {
			res.render('volunteers');
		}

		else { 
			for(var i=0; i<ids.length; i++){
				var friendId = ids[i].user_two_id;
				db.User.findOne({
					where: {id: friendId}
				})
				.then((friend)=>{
					var friendName = friend.dataValues.name;
					var id = friend.dataValues.id;
					friends.push({name: friendName, id: id}); // Adding the same id
				})
				.then(()=>{
					console.log(friends)
					if(friends.length === ids.length){
						res.render('activity', {friends: friends})
					}
				})
			}
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
    let categorie = req.body.categorie;
    console.log("categorie")
    console.log(categorie)
    res.redirect('/friends?categorie=' + categorie);
});

module.exports = router;