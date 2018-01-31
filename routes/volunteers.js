											/* Require libraries */
const express = require('express');
const router = express.Router();
const db = require('../models/database.js');
const bodyParser = require('body-parser');

											/* Volunteers page */
router.get('/', function(req, res) {
	res.render('volunteers', {title: 'plan activity'})
})

module.exports = router;