const express = require('express');
const router = express.Router();
const db = require('../models/database.js');
const bodyParser = require('body-parser');


router.get('/', (req, res) => {
	let name = req.query.name;
	res.render('contactVolunteerPierre', {name: name, title: 'plan activity'});
})

module.exports = router;