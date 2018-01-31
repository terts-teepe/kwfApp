											/* Require libraries */
const express = require('express');
const router = express.Router();
const db = require('../models/database.js');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

											/* Plan activity page */
router.get('/', (req, res) => {
	var friends = [];
	// If session
	let user = req.session.user;
	if(user) {
		var currentUserId = user.id;
		// Find all current user's friends
		db.Relationship.findAll({
			where: {user_one_id: currentUserId}
		})
		.then((ids) =>{
			// If no friends
			if (ids.length === 0) {
				res.render('noFriends');
			}
			// If friends 
			else {
				// Loop over them
				for(var i=0; i<ids.length; i++){
					var friendId = ids[i].user_two_id;
					// Find friends information and push them into friends arr
					db.User.findOne({
						where: {id: friendId}
					})
					.then((friend)=>{
						var friendName = friend.dataValues.name;
						var id = friend.dataValues.id;
						friends.push({name: friendName, id: id});
					})
					.then(()=>{
						// When loop is over
						if(friends.length === ids.length){
							res.render('activity', {friends: friends, title: 'plan activity'})
						}
					})
				}
			}
		})
	}
	// If no session
	else {
		res.redirect('/login?message=' + encodeURIComponent("Login First"));
	}
})

router.post('/', (req, res) =>{
    let categorie = req.body.categorie;
    res.redirect('/friends?categorie=' + categorie);
});

module.exports = router;