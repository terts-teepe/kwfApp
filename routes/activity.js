const express = require('express');
const router = express.Router();
const db = require('../models/database.js');
const bodyParser = require('body-parser');

// Render profile page
var friends = [];
router.get('/', (req, res) => {
	var currentUserId = req.session.user.id;
	console.log(currentUserId)
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
				var username = friend.dataValues.username;
				friends.push(username);
				console.log('Check here');
				console.log(friends);
				console.log(friend);
				console.log(username);
			})
			.then(()=>{
				if(friends.length === ids.length){
					console.log("friends")
					console.log(friends)
					res.render('activity', {friends: friends})
				}
			})
		}
		console.log('Check here');
		console.log(friends);
		console.log(friend);
		console.log(username);
	})  
})

module.exports = router;