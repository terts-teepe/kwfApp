const express = require('express');
const router = express.Router();
const db = require('../models/database.js');
const bodyParser = require('body-parser');

// Render profile page
router.get('/', function(req, res) {
  if (req.session.user) {
    res.render('profile')
  } else {
    res.redirect('/login??message=' + encodeURIComponent("Login First"));
  }
})

module.exports = router;