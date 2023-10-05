const mongoose = require("mongoose");
const validator = require("validator");

const storeSchema = mongoose.Schema({
  shopName: {
    type: String,
    required: [true, "Please Enter Store Name"],
    trim: true,
  },

  ownerName: {
    type: String,
    required: [true, "Please Enter your Name"],
    trim: true,
  },

  email: {
    type: String,
    required: [true, "Please enter your Mail"],
    unique: true,
    validate: [validator.isEmail, "Please enter valid Mail"],
  },

  phoneNo: {
    type: Number,
    required: true,
  },

  licenseNumber: {
    type: String,
    required: true,
  },

  images: [
    {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
],

  storeInfo: {
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    pinCode: {
      type: Number,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },

  medicines: [],

  ratings: {
    type: Number,
    default: 0,
  },

  numOfReviews: {
    type: Number,
    default: 0,
  },

  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],

  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Store", storeSchema);
