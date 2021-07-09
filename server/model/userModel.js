const mongoose = require('mongoose');
const postSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    apartmentName: {
      type: String,
      // required: true,
    },
    mobileNo: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

exports.superRentalData = mongoose.model('superRentalData', postSchema);
