const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const vitalSignsSchema = new Schema(
  {
    patient: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    doctor: {
      type: Schema.Types.ObjectId,
      ref: 'Doctor'
    },
    consultation: {
      type: Schema.Types.ObjectId,
      ref: 'Consultation'
    },
    date: {
      type: Date,
      default: Date.now,
      required: true
    },
    temperature: {
      type: Number
    },
    blood_pressure: {
      type: [Number]
    },
    heart_rate: {
      type: Number
    },
    resp_rate: {
      type: Number
    },
    blood_sugar: {
      type: Number
    },
    isFasting: {
      type: Boolean
    },
    height: {
      type: Number
    },
    weight: {
      type: Number
    }
  },
  { timestamps: true }
);

module.exports = model('VitalSigns', vitalSignsSchema);