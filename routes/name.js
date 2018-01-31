											/* Require libraries */
const express = require('express');
const router = express.Router();
const db = require('../models/database.js');
const bodyParser = require('body-parser');

											/* Register (name) page */
router.get('/', (req, res) => {
    res.render('name');
});

router.post('/', (req, res) =>{
    let name = req.body.name;
    res.redirect('/reachMethod?name=' + name);
});

module.exports = router;