const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const facilitySchema = new Schema(
  {
    owner_type: {
      type: String,
      enum: ['user', 'doctor'],
      required: true,
    },
    owner_doctor: {
      type: Schema.Types.ObjectId,
      ref: 'Doctor'
    },
    owner_user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    title: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    },
    description: {
      type: String,
      required: true
    },
    is_med_facility: {
      type: Boolean,
      required: true,
      default: false
    },
    amenities: {
      type: Schema.Types.ObjectId,
      ref: 'Amenity'
    },
    rating: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

module.exports = model('Facility', facilitySchema);