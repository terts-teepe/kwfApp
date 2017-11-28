const express = require('express');
const router = express.Router();
const db = require('../models/database.js');
const bodyParser = require('body-parser');

// Render profile page
router.get('/', (req, res) => {
	var currentUserId = req.session.user.id;
	var friends = [];
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
				var friendName = friend.dataValues.name;
				friends.push(friendName);
			})
			.then(()=>{
				if(friends.length === ids.length){
					res.render('activity', {friends: friends})
				}
			})
		}
	})  
})


router.post('/', (req,res)=>{
	let currentUserId = req.session.user.id;
	let categorie = req.body.categorie;
	let friends = req.body.friends;
	let time = req.body.time;
	let date = req.body.date;
	let location = req.body.location;
	console.log('friends')
	console.log(friends)
/*	console.log('date')
	console.log(date)*/
	// If there are multiple friends
	if(Array.isArray(friends)){
		for (var i = 0; i < friends.length; i++) {
			db.Activity.create({
				plannerId: currentUserId,
				categorie: categorie,
				time: time,
				date: date,
				friend: friends[i],
				location: location
			})
			if(i === friends.length - 1){
				res.redirect('/index')
			}
		}
	}
	else {
		db.Activity.create({
			plannerId: currentUserId,
			categorie: categorie,
			time: time,
			date: date,
			friend: friends,
			location: location
		})
		.then(()=>{
			res.redirect('/index')
		})
	}
})

module.exports = router;