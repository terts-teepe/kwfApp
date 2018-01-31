											/* Require libraries */
const express = require('express');
const router = express.Router();
const db = require('../models/database.js');
const bodyParser = require('body-parser');

											/* Tutorial page */
router.get('/', function(req, res) {
	res.render('tutorial');
})

module.exports = router;