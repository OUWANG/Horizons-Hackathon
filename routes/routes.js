var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var User = require('../models/models').User;
var Skill = require('../models/models').Skill;

router.get('/', function(req, res) {
  res.render('landingPage', {
    title: 'Skill Tree',
    title2: 'test'
  });
});

router.post('/addSkill:parentId', function(req, res) {
  var newSkill = new Skill({
    name: req.body.name,
    description: req.body.description,
    parent: req.params.parentId
  });
  newSkill.save()
    .then(function() {
      res.send('Saved!');
    })
    .catch(function(err) {
      console.log(err);
    });
});

module.exports = router;
