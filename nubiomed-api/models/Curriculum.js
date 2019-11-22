const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const curriculumModel = new Schema(
  {

  },
  { timestamps: true }
);

module.exports = model('Curriculum', curriculumModel);