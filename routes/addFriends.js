const express = require('express');
const router = express.Router();
const db = require('../models/database.js');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

router.get('/', (req, res) =>{
	if (req.session.user) {
		let currentUsername = req.session.user.username;
		// Find friends
		db.User.findAll({
			where: {
				username: {
					[Op.ne]: currentUsername
				}
			}
		})
		.then((users) =>{
			/*var users = [];
			for(var i=0; i<AllUsers.length; i++){
				if(AllUsers[i].username !== currentUsername){
					users.push(AllUsers[i])
				}
			}*/
			res.render('addFriends', {users: users})
		})
	} 
	else {
    	res.redirect('/login??message=' + encodeURIComponent("Login First"));
    }
});

router.post('/', (req,res) =>{
	var currentUserId = req.session.user.id
	var friends = req.body.friends
	for(var i=0; i<friends.length; i++){
		db.Relationship.create({
			user_one_id: currentUserId,
	  		user_two_id: friends[i],
	  		action_user_id: currentUserId
		})
	}
	res.redirect('/inviteFriends')
})

module.exports = router;