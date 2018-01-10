const express = require('express');
const router = express.Router();
const db = require('../models/database.js');
const bodyParser = require('body-parser');


router.get('/', (req,res)=>{
	res.render('chatFeed')
})

















module.exports = router;