const express = require('express');
const router = express.Router();
const models = require('../models/models');
const WorkExperience = models.WorkExperience;
const Skill = models.Skill;
const Company = models.Company;
const User = models.User;

// API ROUTES HERE

router.post('/add/experience', function(req, res) {
  console.log('here');
  console.log(req.body);
  var { company, startDate, endDate, role, description, location } = req.body;

  var experience = new WorkExperience({
    company, startDate, endDate, role, description, location
  })
  experience.save()
  .then(experience => {
    var newExperience = req.user.workExperience;
    newExperience.push(experience);
    req.user.workExperience = newExperience;
    req.user.save()
    .then(user => {
      res.json({success: true, experience});
    })
    .catch(err => {
      res.json({ success: false, message: 'invalid experience' });
    })
  })
  .catch(err => {
    console.log(err);
    res.json({ success: false, message: 'invalid experience' });
  })


});

router.post('/add/skill', function(req, res) {
  console.log(req.user);
  Skill.find({name: req.body.skill})
  .then(skills => {
    if (skills.length < 1) {
      var newSkill = new Skill({
        name: req.body.skill
      })
      newSkill.save()
      .then(skill => {
        var newSkills = req.user.skills;
        newSkills.push(skill);
        req.user.skills = newSkills;
        req.user.save()
        .then(user => {
          res.json({success: true, skill});
        })
        .catch(err => {
          res.json({ success: false, message: 'invalid skill' });
        })
      })
      .catch(err => {
        console.log(err);
        res.json({success: false, message: 'skill failed to save'});
      })
    } else {
      var newSkills = req.user.skills;
      newSkills.push(skills[0]);
      req.user.skills = newSkills;
      req.user.save()
      .then(user => {
        res.json({success: true, skill: skills[0]});
      })
      .catch(err => {
        res.json({ success: false, message: 'invalid skill' });
      })
    }
  })
  .catch(err => {
    console.log(err);
    res.json({ success: false, message: 'invalid skill' });
  })


});

router.post('/add/mainSkill', function(req, res) {
  Skill.findOne({name: req.body.skill})
  .then(skill => {
    if (!skill) {
      var newSkill = new Skill({
        name: req.body.skill
      })
      newSkill.save()
      .then(skill => {
        var newSkills = req.user.skills;
        newSkills.push(skill);
        req.user.skills = newSkills;
        var newMainSkills = req.user.mainSkills;
        newMainSkills.push({ name: skill.name, description: req.body.description });
        req.user.mainSkills = newMainSkills;
        req.user.save()
        .then(user => {
          console.log(user);
          res.json({success: true, mainSkill: {name: skill.name, description: req.body.description} });
        })
        .catch(err => {
          res.json({ success: false, message: 'invalid skill' });
        })
      })
      .catch(err => {
        console.log(err);
        res.json({success: false, message: 'skill failed to save'});
      })
    } else {
      var newSkills = req.user.skills.slice();
      newSkills.push(skill);
      req.user.skills = newSkills;
      var newMainSkills = req.user.mainSkills;
      newMainSkills.push({ name: skill.name, description: req.body.description });
      req.user.mainSkills = newMainSkills;
      req.user.save()
      .then(user => {
        console.log(user);
        res.json({success: true, mainSkill: {name: skill.name, description: req.body.description} });
      })
      .catch(err => {
        res.json({ success: false, message: 'invalid skill' });
      })
    }
  })
  .catch(err => {
    console.log(err);
    res.json({ success: false, message: 'invalid skill' });
  })


});

router.post('/add/company', function(req, res) {
  const { title,
  startDate,
  endDate,
  company,
  club,
  description,
  location,
  applicationQuestions } = req.body;

  new Company({
    title,
    startDate,
    endDate,
    company,
    club,
    description,
    location,
    notifications: [],
    messages: [],
    teams: [],
    individuals: [],
    applications: [],
    applicationQuestions
  })
  .save()
  .then(company => {
    res.json({ success: true, company})
  })
  .catch(err => {
    res.json({success: false})
  })
});

router.post('/updateBasicInfo', function(req, res) {
  console.log(req.user);
  User.findById(req.user._id)
  .then(user => {
    user.fname = req.body.fname || user.fname;
    user.lname = req.body.lname || user.lname;
    user.about = req.body.about || user.about;
    user.university = req.body.university || user.university;
    user.major = req.body.major || user.major;
    user.year = req.body.year || user.year;
    user.interests = req.body.interests || user.interests;
    user.linkedin = req.body.linkedin || user.linkedin;
    user.website = req.body.website || user.website;
    user.resume = req.body.resume || user.resume;

    user.save()
    .then(user => {
      console.log(user);
      res.json({user})
    })
    .catch(err => {
      res.json(err)
    })
  })
  .catch(err => {
    res.json(err)
  })
});


module.exports = router;
