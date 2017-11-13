const express = require('express');
const router = express.Router();
const db = require('../models/database.js');

// Render profile page
router.get('/profile', function(req, res) {
	res.render('profile');
});

module.exports = router;