											/* Require libraries */
const express = require('express');
const router = express.Router();
const db = require('../models/database.js');
const bodyParser = require('body-parser');
const session = require('express-session');

											/* Logout page */
router.get('/', function (req, res) {
  	req.session.destroy(function (error) {
	    if(error) {
	        throw error;
	    }
	    res.redirect( '/?message=' + encodeURIComponent("Succesfully logged out.") );
  	})
})

module.exports = router;