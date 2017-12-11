const express = require('express');
const router = express.Router();
const db = require('../models/database.js');
const bodyParser = require('body-parser');

router.get('/', function(req, res) {
	if(req.session.user) {
		let user = req.session.user
		let currentUserId = user.id;
		let currentUserName = user.name;

		db.User.findOne({
			where: {
				id: currentUserId
			},
			include : [	
				{model: db.Activity}
			]
		})
		.then((user) => {
			if(user.dataValues.activities.length !== 0){
				res.render('chat', {user: user})
			}

			else {
				res.render('chat', {user: user})
			}
		})

	}
	
	else {
		res.redirect('/login?message=' + encodeURIComponent("Login First"));
	}
})

router.post('/', (req,res)=>{
	let user = req.session.user
	let currentUserId = user.id;
	let currentUserName = user.name;
	let obj = {};
	console.log('body: ' + JSON.stringify(req.body));

	let clickedBtn = JSON.stringify(req.body.btn)
	let activityId = JSON.stringify(req.body.id)
/*		db.User.findOne({
			where: {
				id: currentUserId
			},
			include: {model: Activity, where: {id: activityId}}
		})
		.then((user)=>{*/
			let status;
			if(clickedBtn === 1){
				status = true;
/*				Filter.find({
				  where: { id: 3 }, 
				  include: [ { model : FilteredContent, as : 'filteredContent' } ] 
				}).then ( function( filter ) {*/
				  db.Activity.update({
					  status: true,
					}, {
					  where: { id: activityId }
					})
					.then(function (result) {
					  console.log(result);  
					  	 res.send(req.body); 
					  // result = [x] or [x, y]
					  // [x] if you're not using Postgres
					  // [x, y] if you are using Postgres
					});
/*				}).then(function () {
				  // DONE! :)
				});*/
/*				status = true;
				db.Activity.findOne({
					where: {id: activityId}
				})
				.then((activity)=>{
					activity.update({
						accept: currentUserId,
						status: status
					})
					.then(()=>{
						res.send(req.body);
					})
				})*/
			}
			else {
				status = false
				res.send(req.body);
			}
	/*	})*/
})

module.exports = router;