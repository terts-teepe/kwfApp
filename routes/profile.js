const express = require('express');
const router = express.Router();
const db = require('../models/database.js');
const bodyParser = require('body-parser');

// Render index form
router.get('/', function(req, res) {
  res.render('profile')
})

module.exports = router;