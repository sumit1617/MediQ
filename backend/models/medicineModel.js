const mongoose = require("mongoose");

const medicineSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter medicine Name"],
    trim: true,
  },

  description: {
    type: String,
    required: [true, "Please Enter medicine Description"],
  },

  price: {
    type: Number,
    required: [true, "Please Enter medicie Price"],
    maxLength: [8, "Price cannot exceed 8 characters"],
  },

  ratings: {
    type: Number,
    default: 0,
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

  category: {
    type: String,
    required: [true, "Please Enter Medicine Category"],
  },

  stock: {
    type: Number,
    required: [true, "Please Enter Medicine Stock"],
    maxLength: [4, "Stock cannot exceed 4 characters"],
    default: 1,
  },

  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    // required: true,
  },
  
  createdAt: {
    type: Date,
    default: Date.now,
  },

});


module.exports = mongoose.model("Medicine", medicineSchema);