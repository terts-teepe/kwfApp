											/* Require libraries */
const express = require('express');
const router = express.Router();
const db = require('../models/database.js');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

											/* Add friends page */
router.get('/', (req, res) =>{
	// If session
	var user = req.session.user;
	if (user) {
		let currentUserId = user.id;
		let currentUsername = user.name;
		// Find all users but current user
		db.User.findAll({
			where: {
				id: {
					[Op.ne] : currentUserId
				}						
			}
		})
		.then((allButMe) => {
			// Find all current user's friend
			db.Relationship.findAll({
				where: {
					user_one_id: currentUserId
				}
			})
			.then((friends) => {
				// Compare both
				// If no people left
				if(allButMe.length === friends.length){
					res.render('inviteFriends', {note: 'No people left'})
				}
				// If people left
				else {
					if(friends.length !== 0) {
						let notFriends = [];
						let friend = false;
						// Loop over all users but current user
						for(var i=0; i < allButMe.length; i++) {
							//	Loop over friends
							for (var j = 0; j < friends.length; j++) {
								// Compare both
								if (allButMe[i].id === (friends[j].user_two_id)) {
									friend = true;
								}
								if (j === friends.length - 1){
									// If not friend
									if (friend === false){
										let notFriendName = allButMe[i].dataValues;
										notFriends.push(notFriendName);							
									}
									// If friend
									if (friend === true){
										friend = false;
									}
									// When loop is over
									if(i === (allButMe.length - 1)){
										res.render('addFriends', {notFriends: notFriends})
									}
								}
							}					
						}
					}
					// If no friends
					else {
						// Find all users but current user
						db.User.findAll({
							where: {
								id: {
									[Op.ne]: currentUserId
								}
							}
						})
						.then((users)=>	{
							res.render('addFriends', {notFriends: users, title: 'friends'});
						});
					}
				}
			});	
		})
	}
});

router.post('/', (req, res) =>{
	let currentUserId = req.session.user.id;
	let friends = req.body.friends;
	for(var i=0; i<friends.length; i++){
		// Create relationship between users
		db.Relationship.create({
			user_one_id: currentUserId,
	  		user_two_id: friends[i]
		});
	}
	res.redirect('/inviteFriends');
});

module.exports = router;