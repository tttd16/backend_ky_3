const mongoose = require('mongoose');

const schema = mongoose.Schema;
// const user = require('../models/userModel');

const productSchema = new schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  tag: [
    {
      type: String,
      required: false,
    },
  ],
  price: {
    type: Number,
    default: 0,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  pulish: {
    type: String,
    required: true,
  },
  tran: {
    type: String,
    required: true,
  },
  nxb: {
    type: String,
    required: true,
  },
  page: {
    type: Number,
    required: true,
  },
  rate: {
    type: Number,
    default: 0,
    required: true,
  },
  category: [
    {
      type: String,
      required: true,
    },
  ],
  description: [
    {
      type: String,
      required: true,
    },
  ],

  review: [
    {
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: false,
      },
      user: {
        // type: mongoose.Schema.Types.ObjectId,
        // ref: user,
        type: String,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model('product', productSchema);
