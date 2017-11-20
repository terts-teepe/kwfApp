const express = require('express');
const router = express.Router();
const db = require('../models/database.js');
const bodyParser = require('body-parser');
// const passport = require('passport');

// Render index form
router.get('/', function(req, res) {
  res.render('login');
});

router.post('/', function(request, response) {
  if (request.body.name.length === 0) {
    response.redirect('/login?message=' + encodeURIComponent("Please fill out your username"));
    return;
  }

  if (request.body.password.length === 0) {
    response.redirect('/login?message=' + encodeURIComponent("Please fill out your password."));
    return;
  }

  db.User.findOne({
      where: {
        name: request.body.name
      }
    })
  
    .then(function(user) {
        if (user !== null && request.body.password === user.password) {
          request.session.user = user;
          response.redirect('/index?message=' + encodeURIComponent("logged in successfully"));
        } else {
          response.redirect('/login?message=' + encodeURIComponent("Invalid email or password."));
        }
      },

      function(error) {
        response.redirect('/login?message=' + encodeURIComponent("Invalid email or password."));
      })
});

// route for facebook authentication and login
// different scopes while logging in
// router.get('/', 
//   passport.authenticate('facebook', { scope : 'email' }
// ));
 
// // handle the callback after facebook has authenticated the user
// router.get('/',
//   passport.authenticate('facebook', {
//     successRedirect : '/home',
//     failureRedirect : '/'
//   })
// );
module.exports = router;