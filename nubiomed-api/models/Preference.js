const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const preferenceSchema = new Schema(
  {
    doctor: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Doctor'
    },
    facilities: {
      type: [Schema.Types.ObjectId]
    },
    zip_codes: {
      type: [Number]
    },
    zones: {
      type: [String],
      enum: ['Polanco', 'Roma', 'Condesa', 'Reforma', 'Del Valle']
    },
    base_price: {
      type: Number,
      default: 100,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = model('Preference', preferenceSchema);