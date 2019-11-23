const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const prescriptionSchema = new Schema (
  {
    consultation: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Consultation'
    },
    brand_name: {
      type: [String],
      default: ''
    },
    generic_name: {
      type: [String],
      required: true
    },
    dose: {
      type: [String],
      required: true
    },
    dosage_form: {
      type: [String],
      required: true
    },
    quantity: {
      type: [Number],
      required: true
    },
    frequency: {
      type: [String],
      required: true
    },
    duration: {
      type: [String],
      required: true
    },
    directions: {
      type: [String]
    }
  },
  { timestamps: true }
);

module.exports = model('Prescription', prescriptionSchema);