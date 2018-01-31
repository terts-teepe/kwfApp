											/* Require libraries */
const express = require('express');
const router = express.Router();
const db = require('../models/database.js');
const bodyParser = require('body-parser');

											/* Pierre's profile page */
router.get('/', function(req, res) {
	let name = req.query.name;
	res.render('profielPierre', {title: 'plan activity', name: name});
});

module.exports = router;