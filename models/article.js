const mongoose = require('mongoose');
const validator = require('validator');

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  source: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: 'Please enter a valid URL',
    },
  },
  image: {
    type: String,
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: 'Please enter a valid URL',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: 'There is must be user id',
  },
});

articleSchema.path('image').validate((val) => {
  const urlRegex = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
  return urlRegex.test(val);
}, 'Invalid URL.');

module.exports = mongoose.model('article', articleSchema);
