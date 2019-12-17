const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const consultationSchema = new Schema (
  {
    doctor: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Doctor'
    },
    patient: {
      type: Schema.Types.ObjectId,
      // required: true,
      ref: 'Patient',
      default: null
    },
    date: {
      type: Date,
      default: Date.now,
      required: true
    },
    title: {
      type: String,
      default: 'Consulta'
    },
    facility: {
      type: Schema.Types.ObjectId,
      // required: true,
      ref: 'Facility',
      default: null
    },
    chief_complaint: {
      type: String,
      default: 'Consulta por realizar'
    },
    systems_chief_complaint: {
      type: [String]
    },
    vital_signs: {
      type: Schema.Types.ObjectId,
      ref: 'VitalSigns'
    },
    phys_exam: {
      type: String,
      default: 'Consulta por realizar'
    },
    systems_phys_exam: {
      type: [String],
    },
    diagnosis: {
      type: String,
      default: 'Consulta por realizar'
    },
    prognosis: {
      type: String
    },
    prescription: {
      type: Schema.Types.ObjectId,
      ref: 'Prescription'
    },
    isDone: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  { timestamps: true }
);

module.exports = model('Consultation', consultationSchema);