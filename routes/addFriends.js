const express = require('express');
const router = express.Router();
const db = require('../models/database.js');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
/*		.then((ids) =>{
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
							res.render('profile', {friends: friends, user: user})
						}
					})
				}
			}
			else {
				res.render('profile', {user: user})
			}
		})
	}
*/
router.get('/', (req, res) =>{
	if (req.session.user) {
		let currentUserId = req.session.user.id;
		let currentUsername = req.session.user.name;
		// Find friends
		db.Relationship.findAll({
			where: {user_one_id: currentUserId}
		})
		.then((ids) =>{
			console.log("ids")
			console.log(ids)
			var notFriends = [];
			if(ids.length !== 0){
				for(var i=0; i<ids.length; i++){
					var friendId = ids[i].user_two_id;
					db.User.findOne({
						where: {
							id: {
								[Op.ne] : friendId/*,
								[Op.ne] : currentUserId*/
							}
						}
					})
					.then((notFriend)=>{
						console.log("notFriend")
						console.log(notFriend)
						var notFriendName = notFriend.dataValues.name;
						notFriends.push(notFriendName);
					})
					.then(()=>{
						console.log("notFriends")
						console.log(notFriends)
						if(notFriends.length === ids.length && notFriends.length !== 0){
							res.render('addFriends', {notFriends: notFriends})
						}
					})
				}
			}
			else {
				// Find friends
				db.User.findAll({
					where: {
						id: {
							[Op.ne]: currentUserId
						}
					}
				})
				.then((users)=>{
					res.render('addFriends', {notFriends: users})
				})
			}
		})
	}
})
/*		.then((relationships)=>{
			db.User.findAll({
				where: {
					name: {
						[Op.ne]: currentUsername
					},
					id: {
						[Op.ne]: relationships.user_two_id
					}
				}
			})
		})
		.then((newpeople)=>{
			console.log("newpeople")
			console.log(newpeople)
			res.render('addFriends', {newpeople: newpeople})*/
/*			.then((ids) =>{
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
			})	*/	



/*	} 
	else {
    	res.redirect('/login?message=' + encodeURIComponent("Login First"));
    }
});*/

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