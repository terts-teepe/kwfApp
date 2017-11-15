const express = require('express');
const router = express.Router();
const db = require('../models/database.js');
const bodyParser = require('body-parser');

var users = [];
router.get('/', function(req, res) {
	if (req.session.user) {
		var currentUsername = req.session.user.username
		db.User.findAll()
		.then((AllUsers) =>{
			var users = [];
			for(var i=0; i<AllUsers.length; i++){
				if(AllUsers[i].username !== currentUsername){
					users.push(AllUsers[i])
				}
			}
			res.render('addFriends', {users: users})
		})
	} 
	else {
    	res.redirect('/login??message=' + encodeURIComponent("Login First"));
    }
});

router.post('/', function(req,res){
	var currentUserId = req.session.user.id
	var friends = req.body.friends
	for(var i=0; i<friends.length; i++){
		db.Relationship.create({
			user_one_id: currentUserId,
	  		user_two_id: friends[i],
	  		action_user_id: currentUserId
		})
	}
	res.redirect('inviteFriends')
})

module.exports = router;