const express = require('express');
const router = express.Router();
const db = require('../models/database.js');
const bodyParser = require('body-parser');

router.get('/', function(req, res) {
	var user = req.session.user
  if (user) {
    res.render('index', {user: user.name})
  } else {
    res.redirect('/login??message=' + encodeURIComponent("Login First"));
  }
})

module.exports = router;