											/* Require libraries */
const express = require('express');
const router = express.Router();
const db = require('../models/database.js');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

											/* Choose friends page */
router.get('/', (req, res) => {
	// If session
	let user = req.session.user; 
	if(user) {
		let categorie = req.query.categorie;
		let currentUserId = user.id;
		let friends = [];
		// Find current user's friend
		db.Relationship.findAll({
			where: {user_one_id: currentUserId}
		})
		.then((ids) =>{
			// Loop over friends
			for(var i=0; i<ids.length; i++){
				let friendId = ids[i].user_two_id;
				// Find each friend and push it to friends array
				db.User.findOne({
					where: {id: friendId}
				})
				.then((friend)=>{
					let friendName = friend.dataValues.name;
					let id = friend.dataValues.id;
					let img = friend.dataValues.image;
					friends.push({name: friendName, id: id, img: img}); // Adding the same id
				})
				.then(()=>{
					// When loop is done
					if(friends.length === ids.length){
						res.render('friends', {friends: friends, categorie: categorie, title: 'plan activity'})
					}
				})
			}
		})
	}
	// If no session
	else {
		res.redirect('/login?message=' + encodeURIComponent("Login First"));
	} 
})

router.post('/', (req, res) =>{
    let categorie = req.query.categorie;
    let friendsIds = req.body.friends;
    // If multiple friends are chosen
	if(Array.isArray(friendsIds)){
		for (var i = 0; i < friendsIds.length; i++) {			
			res.redirect('/time?categorie=' + categorie + '&friends=' + friendsIds);
		}
	}
    // If only one friend is chosen
	else {
		res.redirect('/time?categorie=' + categorie + '&friends=' + friendsIds);		
	}
});

module.exports = router;