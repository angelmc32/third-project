const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const userModel = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    first_name: {
      type: String,
      default: ''
    },
    last_name1: {
      type: String,
      default: ''
    },
    last_name2: {
      type: String,
      default: ''
    },
    curp: {
      type: String,
      default: '',
      maxlength: 18
    },
    date_of_birth: {
      type: Date,
      default: Date.now
    },
    gender: {
      type: String,
      enum: ['F','M','U'],
      default: 'U'
    },
    isActive: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

module.exports = model('User', userModel);