const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const amenitySchema = new Schema(
  {
    facility: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Facility'
    },
    wifi: {
      type: Boolean,
      required: true,
      default: false
    },
    security: {
      type: Boolean,
      required: true,
      default: false
    },
    printer: {
      type: Boolean,
      required: true,
      default: false
    },
    exam_table: {
      type: Boolean,
      required: true,
      default: false
    },
    wait_room: {
      type: Boolean,
      required: true,
      default: false
    },
    receptionist: {
      type: Boolean,
      required: true,
      default: false
    },
    nurse: {
      type: Boolean,
      required: true,
      default: false
    },
    bp_cuff: {
      type: Boolean,
      required: true,
      default: false
    },
    scale: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  { timestamps: true }
);

module.exports = model('Amenity', amenitySchema);