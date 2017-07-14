var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var User = require('../models/models').User;

module.exports = function(password) {
  router.get('/signup', function(req, res) {
    res.render('/signup';)
  })

  router.post('/signup', function(req, res) {
    if (req.body.password !== req.body.password_confirm) {
      res.render('/signup');
    } else {
      var user = new User({
        username: req.body.username,
        password: req.body.password
      })

      user.save()
        .then(function() {
          res.redirect('/login');
        })
        .catch(function(err) {
          console.log(err);
        })
    }
  })

  router.get('/login', function(req, res) {
    res.render('/login');
  })

  router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
  }))

  router.use('/', function(req, res, next) {
    if (!req.user) {
      res.redirect('/login')
    } else {
      next()
    }
  })

  return router;
}
