const express = require('express');
const router = express.Router();
const db = require('../models/database.js');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

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
				var id = friend.dataValues.id;
				friends.push({name: friendName, id: id}); // Adding the same id
			})
			.then(()=>{
				console.log(friends)
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
	let friendsIds = req.body.friendId;
	let time = req.body.time;
	let date = req.body.date;
	let location = req.body.location;
	console.log('friends')
	console.log(friends)
	console.log("friendsIds")
	console.log(friendsIds)
/*	console.log('friendsis')
	console.log(friendsIds)*/
/*
	db.Activity.create({
		plannerId: currentUserId,
		categorie: categorie,
		time: time,
		date: date,
		friend: friends,
		location: location
	})
	.then((activity)=>{
		db.User.findAll({
			where : {
				id: {
					[Op.or]: [activity.plannerId, activity.friend.id]
				}
			}
		})
		.then ((user)=>{
			activity.setUsers(user)
			res.redirect('/index')
		})
	})*/
/*	console.log('date')
	console.log( date)*/
	// If there are multiple friends
	if(Array.isArray(friends)){
/*		for (var i = 0; i < friends.length; i++) {*/
			db.Activity.create({
				plannerId: currentUserId,
				categorie: categorie,
				time: time,
				date: date,
/*				friend: friends[i],*/
				location: location
			})
			.then((activity)=>{
				for (var i = 0; i < friends.length; i++) {
/*					db.User.findOne({
						where: {
							name: friends[i]
						}
					})
					.then((friend)=>{*/
						db.User.findOne({
							where : {
								id: friendsIds[i]/*{
									[Op.or]: [activity.plannerId, friendsIds[i]]
								}*/
							}
						})
						.then ((user)=>{
							activity.setUsers(user)
							if(i === friends.length - 1){
								res.redirect('/index')
							}
						})
					/*})*/
				}
			})
	}
	else {
		db.Activity.create({
			plannerId: currentUserId,
			categorie: categorie,
			time: time,
			date: date,
/*			friend: friends,*/
			location: location
		})
		.then((activity)=>{
			db.User.findAll({
				where: {
					id: friendsIds[i]/*{
						[Op.or]: [activity.plannerId, friendsIds[i]]
					}*/
				}
			})
			.then((user)=>{
				activity.setUsers(user)
				res.redirect('/index')
			})
		})
	}
})
/*	if(Array.isArray(friends)){
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
		.then((activity)=>{
			db.User.findAll({
				where: {
					id: currentUserId && 
				}
			})
			.then((user)=>{
				activity.setUsers(user)
				res.redirect('/index')
			})
		})
	}
})
*/
module.exports = router;