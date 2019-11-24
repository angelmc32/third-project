const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const orderSchema = new Schema(
  {
    patient: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    service: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Service'
    },
    medical_facility: {
      type: Schema.Types.ObjectId,
      ref: 'MedicalFacility'
    },
    isDone: {
      type: Boolean,
      required: true,
      default: false
    },
    doctor: {
      type: Schema.Types.ObjectId,
      ref: 'Doctor'
    },
    consultation: {
      type: Schema.Types.ObjectId,
      ref: 'Consultation'
    }
  },
  { timestamps: true }
);

module.exports = model('Order', orderSchema);