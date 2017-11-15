const express = require('express');
const router = express.Router();
const db = require('../models/database.js');
const bodyParser = require('body-parser');

router.get('/', function(req, res) {
	var user = req.session.user
	db.User.findAll()
	.then((users) =>{
		console.log(users)
		res.render('addFriends', {users: users})
	})
})

module.exports = router;