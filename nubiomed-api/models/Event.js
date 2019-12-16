const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const eventSchema = new Schema(
  {
    doctor: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Doctor'
    },
    patient: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    medical_facility: {
      type: Schema.Types.ObjectId,
      ref: 'Facility'
    },
    consultation: {
      type: Schema.Types.ObjectId,
      ref: 'Consultation'
    },
    isDone: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  { timestamps: true }
);

module.exports = model('Event', eventSchema);