var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

var skillSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  parent: {
    type: Schema.ObjectId,
    ref: 'Skill',
    required: true
  },
  owner: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  }
});

var messageSchema = new Schema({
  from: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  to: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  }
})

var Skill = mongoose.model('Skill', skillSchema);
var User = mongoose.model('User', userSchema);
var Message = mongoose.model('Message', messageSchema);

module.exports = {
  User: User,
  Skill: Skill,
  Message: Message
};