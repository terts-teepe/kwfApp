const express = require('express');
const router = express.Router();
const db = require('../models/database.js');
const bodyParser = require('body-parser');

// Render profile page

router.get('/', (req, res) => {
	let user = req.session.user;
	if (user) {
		var currentUserId = user.id;
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
						var friendName = friend;
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
	else {
    	res.redirect('/login?message=' + encodeURIComponent("Login First"));
    }
})

module.exports = router;

