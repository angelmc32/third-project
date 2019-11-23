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
      required: true,
      ref: 'User'
    },
    date: {
      type: Date,
      default: Date.now,
      required: true
    },
    chief_complaint: {
      type: String,
      required: true
    },
    systems_chief_complaint: {
      type: [String],
      required: true
    },
    vital_signs: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'VitalSigns'
    },
    phys_exam: {
      type: String,
      required: true,
      default: 'Sin observaciones en el examen físico.'
    },
    systems_phys_exam: {
      type: [String],
      required: true
    },
    diagnosis: {
      type: String,
      required: true
    },
    prognosis: {
      type: String,
      required: true
    },
    prescription: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Prescription'
    }
  }
)