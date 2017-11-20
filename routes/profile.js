const express = require('express');
const router = express.Router();
const db = require('../models/database.js');
const bodyParser = require('body-parser');

// Render profile page
router.get('/', (req, res) =>{
  if (req.session.user) {
    res.render('profile', {user: req.session.user.name})
  } else {
    res.redirect('/login?message=' + encodeURIComponent("Login First"));
  }
})

module.exports = router;