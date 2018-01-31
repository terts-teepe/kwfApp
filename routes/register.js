const express = require('express');
const router = express.Router();
const db = require('../models/database.js');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

// Render signup form
router.get('/', function(req, res) {
  res.render('register')
})

// Create user to database
router.post('/', function(req, res) {
  let username = req.body.username;
  let password = req.body.password;
  let email = req.body.email;
  // Check if Username already exists
  db.User.findOne({
    where: {
      username: req.body.username
    }
  })
  .then((user) => {
    if (user) {
      // Put alert that username already exist
      res.redirect('/register?message=' + encodeURIComponent("Username already exists"));
    } 
    else {
      bcrypt.hash(password, 10, function(err, hash) {
        db.User.create({
          username: username,
          password: hash,
          email: email
        })       
        .then((user) => {
          req.session.user = user;
          res.redirect('/addFriends?message=' + encodeURIComponent("User created"));
          // Alert that user registered worked
        })
        .catch((err) =>{
          throw err;
        });
      });
    }
  })
});

module.exports = router;