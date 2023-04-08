const asyncHandler = require('express-async-handler');
const orderModel = require('../models/orderModel');

/**
 * @desc Get all order
 *  @route GET orders/
 *  @access Private
 */
const getOrderAll = asyncHandler(async (req, res) => {
  const orders = await orderModel.find({});
  res.json({ orders });
});

/**
 *   @desc Get my order
 *  @route GET orders/myorder
 *  @access Private
 */
const getMyOrders = asyncHandler(async (req, res) => {
  console.log({ user: req.user._id });
  const orders = await orderModel.find({ user: req.user._id });
  res.json(orders);
});

/**
 *   @desc Get order by id
 *  @route GET orders/:id
 *  @access Private, admin
 */
const getOrderById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  console.log(req.params.id);
  const order = await orderModel.findById(id);
  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error('orderModel not found');
  }
});

/**
 *   @desc Get my order
 *  @route GET orders/myorder
 *  @access Private
 */
const addOrder = asyncHandler(async (req, res) => {
  const { orderItems, shippingAddress, paymentResult, paymentMethod, shippingPrice, totalPrice, isPaid } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items');
  } else {
    const order = new orderModel({
      orderItems, // Sử dụng orderItems đã được cập nhật với product là ObjectId
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
