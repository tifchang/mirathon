var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Student = require('./Student')
var Skill = require('./Skill')
var CompetitionExperience = require('./CompetitionExperience')
var WorkExperience = require('./WorkExperience')
var Competition = require('./Competition')
var Company = require('./Company')
var Club = require('./Club')

module.exports = {
  Student,
  Skill,
  CompetitionExperience,
  WorkExperience,
  Competition,
  Company,
  Club
};
