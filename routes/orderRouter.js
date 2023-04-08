const express = require('express');
const router = express.Router();

const { getOrderAll, getMyOrders, getOrderById, addOrder } = require('../controller/orderController.js');
const { protect, isAdmin } = require('../middleware/authMiddleware.js');

router.get('/', protect, isAdmin, getOrderAll);
router.get('/myorder', protect, getMyOrders);
router.get('/:id', protect, getOrderById);
router.post('/', protect, addOrder);

module.exports = router;
