const express = require('express');
const router = express.Router();
const db = require('../models/database.js');
const bodyParser = require('body-parser');

// Render profile page
router.get('/', function(req, res) {
	res.render('inviteFriends')
})

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