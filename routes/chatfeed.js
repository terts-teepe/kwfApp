											/* Require libraries */
const express = require('express');
const router = express.Router();
const db = require('../models/database.js');
const bodyParser = require('body-parser');

											/* chatfeed page */
router.get('/', (req,res)=>{
	var user = req.session.user.name;
	res.render('chatfeed', {user: user})
})

module.exports = router;