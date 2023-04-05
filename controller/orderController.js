const asyncHandler = require('express-async-handler');
const Order = require('../models/orderModel');

const getOrderAll = asyncHandler(async (req, res) => {
  const orders = await Order.find({});
  res.json(orders);
});

const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});

const getOrderById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  console.log(req.params.id);
  const order = await Order.findById(id);
  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

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

module.exports = { getOrderAll, getMyOrders, getOrderById, addOrder };
