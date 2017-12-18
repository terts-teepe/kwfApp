const express = require('express');
const router = express.Router();
const db = require('../models/database.js');
const bodyParser = require('body-parser');

// Render profile page
router.get('/', function(req, res) {
	res.render('volunteers')
})

module.exports = router;