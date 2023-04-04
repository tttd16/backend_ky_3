const express = require('express');
const router = express.Router();

const { addOrder, getOrders } = require('../controller/orderController');
router.post('/', addOrder);
router.get('/', getOrders);

module.exports = router;
