const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const prescriptionSchema = new Schema (
  {
    consultation: {
      type: Schema.Types.ObjectId,
      ref: 'Consultation'
    },
    doctor: {
      type: Schema.Types.ObjectId,
      ref: 'Doctor'
    },
    date: {
      type: Date,
      default: Date.now
    },
    patient: {
      type: Schema.Types.ObjectId,
      ref: 'Patient'
    },
    brand_name: {
      type: String
    },
    generic_name: {
      type: String
    },
    dose: {
      type: String
    },
    dosage_form: {
      type: String
    },
    directions: {
      type: String
    }
  },
  { timestamps: true }
);

module.exports = model('Prescription', prescriptionSchema);