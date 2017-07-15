var express = require('express');
var mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate')(mongoose);
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

      // var returnObj = {};
      //
      skillsArr = skillsArr.sort(function(a, b) {
        return a.level > b.level;
      })

      console.log(skillsArr[0]);
      res.json(skillsArr[0]);
      //
      // Skill.find({
      //     level: 1,
      //     owner: req.user._id
      //   })
      //   .then(function(skillsArr2) {
      //     skillsArr2.forEach(function(skill) {
      //       returnObj.children.push({
      //         name: skill.name,
      //         parent: 'Skills'
      //       });
      //     })
      //
      //     var maxLevel = skillsArr[skillsArr.length - 1].level;
      //
      //     // console.log(skillsArr2);
      //
      //     // console.log('max level', maxLevel)
      //     // for (var i = 1; i < maxLevel; i++) {
      //     //   Skill.find({
      //     //       level: i,
      //     //       owner: req.user._id
      //     //     })
      //     //     .then(function(skillsArr3) {
      //     //       i--;
      //     //       console.log('skills arr3', skillsArr3)
      //     //       skillsArr3.forEach(function(skill, index) {
      //     //         if (skill.children.length > 0) {
      //     //           Skill.find({
      //     //               level: (i + 1),
      //     //               owner: req.user._id,
      //     //               parent: skill._id
      //     //             })
      //     //             .then(function(skillsArr4) {
      //     //               console.log('skills arr4', skillsArr4)
      //     //               skillsArr4.forEach(function(skill2, index2) {
      //     //                 var tempObj = {
      //     //                   name: skill2.name,
      //     //                   parent: skill.name,
      //     //                   children: []
      //     //                 }
      //     //                 console.log('tempObj', tempObj);
      //     //                 //   returnObj.children[index]
      //     //               })
      //     //             })
      //     //         }
      //     //       })
      //     //     })
      //     // }
    })


    // skillsArr.forEach(function(skill) {
    //   var parent;
    //   if (skill.parent) {
    //     parent = skill.parent.name;
    //   } else {
    //     parent = 'Skills';
    //   }
    // returnObj.children.push({
    //   name: skill.name,
    //   parent: parent
    // });
    // });
    // res.json(returnObj);
    .catch(function(err) {
      console.log(err);
    });
})
// });

module.exports = router;