const express = require('express');
const router = express.Router();
const db = require('../models/database.js');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


router.get('/', (req, res) =>{
	if (req.session.user) {
		let currentUserId = req.session.user.id;
		let currentUsername = req.session.user.name;
				// Find friends
		db.User.findAll({
			where: {
				id: {
					[Op.ne] : currentUserId
				}						
			}
		})
		.then((allButMe) => {
			db.Relationship.findAll({
				where: {
					user_one_id: currentUserId
				}
			})
			.then((friends) => {
				if(allButMe.length === friends.length){
					res.render('inviteFriends', {note: 'No people left'})
				}
				else {
					if(friends.length !== 0) {
						console.log("*****************")
						console.log(friends)
						var notFriends = [];
						var friend = false;
						for(var i=0; i<allButMe.length; i++) { //3			
							for (var j = 0; j < friends.length; j++) { //2
								if (allButMe[i].id === (friends[j].user_two_id)) {
									friend = true;
								}
								if (j === friends.length - 1){
									// If not friend
									if (friend === false){
										var notFriendName = allButMe[i].dataValues;
										notFriends.push(notFriendName);							
									}
									// If friend
									if (friend === true){
										friend = false;
									}
									else if(i === (allButMe.length -1)){
										res.render('addFriends', {notFriends: notFriends})
									}
								}
							}					
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

						.then((users)=>	{
							res.render('addFriends', {notFriends: users, title: 'friends'})
						})
					}
				}
			});	
		})
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