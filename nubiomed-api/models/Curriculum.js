const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const curriculumSchema = new Schema(
  {
    doctor: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Doctor'
    },
    bio: {
      type: String,
      default: 'No ha añadido información'
    },
    university: {
      type: String,
      required: true,
      default: 'No ha añadido información'
    },
    med_license: {
      type: String,
      required: true,
      default: 'No ha añadido información'
    },
    specialty: {
      type: String,
      default: 'Sin especialidad'
    },
    specialty_univ: {
      type: String,
      default: 'Sin especialidad'
    },
    specialty_license: {
      type: String,
      default: 'Sin especialidad'
    },
    subspecialty: {
      type: String,
      default: 'Sin subespecialidad'
    },
    subspecialty_univ: {
      type: String,
      default: 'Sin especialidad'
    },
    subspecialty_license: {
      type: String,
      default: 'Sin subespecialidad'
    },
    images: {
      type: [String],
      minlength: 1
    }
  },
  { timestamps: true }
);

module.exports = model('Curriculum', curriculumSchema);