const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    orderItems: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Product',
        },
      },
    ],
    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    paymentResult: {
      id: { type: String },
      status: { type: String },
      email_address: { type: String },
      update_time: { type: String },
    },
    paymentMethod: { type: String, required: true },
    shippingPrice: { type: Number, required: true },
    totalPrice: { type: Number },
    isPaid: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  },
);

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
