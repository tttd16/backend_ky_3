const express = require('express');
const productRouter = express.Router();
const {
  getProduct,
  getProductById,
  deleteProductByID,
  createProduct,
  updateProduct,
  reviewProduct,
  getTop,
} = require('../controller/productController');

const { protect, isAdmin } = require('../middleware/authMiddleware');

// 1. @desc: Get all products
productRouter.get('/', getProduct);

// 2. @desc: Get product by ID
productRouter.get('/:id', getProductById);

// 3. @desc: Delete product by ID
productRouter.delete('/:id', protect, isAdmin, deleteProductByID);

// 4. @desc: Create product
productRouter.post('/', protect, isAdmin, createProduct);

// 5. @desc: Update a product
productRouter.put('/:id', protect, isAdmin, updateProduct);

// 6. @desc: Create new review for product
productRouter.post('/:id/reviews', protect, reviewProduct);

// 7. @desc: Get top 5 products
productRouter.get('/a/top', getTop);

module.exports = productRouter;
