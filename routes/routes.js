var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var User = require('../models/models').User;
var Skill = require('../models/models').Skill;

router.get('/', function(req, res) {
  Skill.find({
      owner: req.user._id
    })
    .then(function(skills) {
      res.render('landingPage', {
        title: 'Skill Tree',
        skills: skills
      });
    })
    .catch(function(err) {
      console.log(err);
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

router.post('/getSkills', function(req, res) {
  Skill.find({
      owner: req.user._id
    })
    .populate('parent')
    .populate({
      path: 'children',
      populate: {
        path: 'children'
      }
    })
    .then(function(skillsArr) {

      skillsArr = skillsArr.sort(function(a, b) {
        return a.level > b.level;
      })

      console.log(skillsArr[0]);
      res.json(skillsArr[0]);
    })
    .catch(function(err) {
      console.log(err);
    });
})

module.exports = router;