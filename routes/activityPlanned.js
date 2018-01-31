											/* Require libraries */
const express = require('express');
const router = express.Router();
const db = require('../models/database.js');
const bodyParser = require('body-parser');

											/* Activity planned page */
router.get('/', (req,res)=>{
	var user = req.session.user.name;
	res.render('activityPlanned', {user: user})
})

module.exports = router;