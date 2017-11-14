const express = require('express');
const router = express.Router();
const db = require('../models/database.js');
const bodyParser = require('body-parser');

router.get('/', function(req, res) {
	var user = req.session.user
  if (user) {
  	console.log(user)
    res.render('index', {user: user.username})
  } else {
    res.redirect('/login??message=' + encodeURIComponent("Login First"));
  }
})

module.exports = router;