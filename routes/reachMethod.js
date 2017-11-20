const express = require('express');
const router = express.Router();
const db = require('../models/database.js');
const bodyParser = require('body-parser');


router.get('/', (req, res) => {
	let name = req.query.name;
	res.render('reachMethod', {name: name});
})

router.post('/', (req,res) => {
	let name = req.query.name;
	let email = req.body.email;
	let number = req.body.number;
	res.redirect(`/password?name=${name}&email=${email}&number=${number}`)
})

module.exports = router;