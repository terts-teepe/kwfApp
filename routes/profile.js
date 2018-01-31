											/* Require libraries */
const express = require('express');
const router = express.Router();
const db = require('../models/database.js');
const bodyParser = require('body-parser');

											/* Profile page */
router.get('/', (req, res) => {
	// If session
	let user = req.session.user;
	if (user) {
		let currentUserId = user.id;
		// Find current user's friends
		db.Relationship.findAll({
			where: {user_one_id: currentUserId}
		})
		.then((ids) =>{
			let friends = [];
			// If user has friends
			if(ids.length !== 0){
				// Loop over them
				for(var i=0; i<ids.length; i++){
					// Find each friend and push them to friends array
					let friendId = ids[i].user_two_id;
					db.User.findOne({
						where: {id: friendId}
					})
					.then((friend)=>{
						friends.push(friend);
					})
					.then(()=>{
						// When loop is over
						if(friends.length === ids.length && friends.length !== 0){
							res.render('profile', {friends: friends, user: user, title: 'profile'});
						}
					});
				}
			}
			// If not
			else {
				res.render('profile', {user: user, title: 'profile'});
			}
		});
	}
	// If no session
	else {
    	res.redirect('/login?message=' + encodeURIComponent("Login First"));
    }
});

module.exports = router;