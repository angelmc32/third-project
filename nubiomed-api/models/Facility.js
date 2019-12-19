const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const facilitySchema = new Schema(
  {
    ref_model_id: {
      type: Schema.Types.ObjectId,
      required: true,
      refPath: 'ref_model_name'
    },
    ref_model_name: {
      type: String,
      required: true,
      enum: ['Patient', 'Doctor']
    },
    consultations: {
      type: [Schema.Types.ObjectId],
      ref: 'Consultation'
    },
    dates: {
      type: [Date]
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
    images: {
      type: [String],
      minlength: 1
    },
    price: {
      type: Number,
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


facilitySchema.statics.getAvailableFacilities = function() {
  return this.aggregate([
    { $lookup: { from: 'consultations', localField: '_id', foreignField: 'facility', as: 'consultations' } },
    // { $match: { 'date': { $ne: date } } },
    { $group: {_id: '$_id' } }
  ])
};

module.exports = model('Facility', facilitySchema);