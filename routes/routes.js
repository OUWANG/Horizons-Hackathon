var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('landingPage', {title: 'Skill Tree', title2: 'test'});
});

module.exports = router;
