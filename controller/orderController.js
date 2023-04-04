const asyncHandler = require('express-async-handler');
const Order = require('../models/orderModel');

const addOrder = asyncHandler(async (req, res) => {
  const { orderItems, shippingAddress, paymentResult, paymentMethod, shippingPrice, totalPrice, isPaid } = req.body;
  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items');
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentResult,
      paymentMethod,
      shippingPrice,
      totalPrice,
      isPaid,
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
});

const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({});
  res.json(orders);
});

module.exports = { addOrder, getOrders };
