const express = require('express');
const router = express.Router();
const db = require('../models/database.js');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

router.get('/', (req, res) =>{
	if (req.session.user) {
		let currentUsername = req.session.user.name;
		// Find friends
		db.User.findAll({
			where: {
				name: {
					[Op.ne]: currentUsername
				}
			}
		})
		.then((notMe)=>{

		

			db.Relationship.findAll({
				where: {action_user_id: currentUserId}
			})

			.then((ids) =>{
				var friends = [];
				if(ids.length !== 0){
					for(var i=0; i<ids.length; i++){
						var friendId = ids[i].user_two_id;
						db.User.findOne({
							where: {id: friendId}
						})
						.then((friend)=>{
							var friendName = friend.dataValues.name;
							friends.push(friendName);
						})
						.then(()=>{
							if(friends.length === ids.length && friends.length !== 0){
								res.render('addFriends', {friends: friends, notMe: notMe})
							}
						})
					}
				}
			})		
		})



	} 
	else {
    	res.redirect('/login?message=' + encodeURIComponent("Login First"));
    }
});

router.post('/', (req, res) =>{
	var currentUserId = req.session.user.id;
	var friends = req.body.friends;
	for(var i=0; i<friends.length; i++){
		db.Relationship.create({
			user_one_id: currentUserId,
	  		user_two_id: friends[i],
	  		action_user_id: currentUserId
		});
	}
	res.redirect('/inviteFriends');
});

module.exports = router;