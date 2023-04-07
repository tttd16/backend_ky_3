const express = require('express');
const router = express.Router();

const { getOrderAll, getMyOrders, getOrderById, addOrder } = require('../controller/orderController.js');
router.get('/', getOrderAll); //Private/admin
router.get('/myorders', getMyOrders); // Private
router.get('/:id', getOrderById); //Private
router.post('/', addOrder); // private

module.exports = router;
