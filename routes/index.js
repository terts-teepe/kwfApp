const express = require('express');
const router = express.Router();
const db = require('../models/database.js');
const bodyParser = require('body-parser');

router.get('/', function(req, res) {
  if (req.session.user) {
    res.render('index')
  } else {
    res.redirect('/login??message=' + encodeURIComponent("Login First"));
  }
})

module.exports = router;