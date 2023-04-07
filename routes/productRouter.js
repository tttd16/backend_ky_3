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
// @route: GET /api/products
// @access: Public
productRouter.get('/', getProduct);

// 2. @desc: Get product by ID
// @route: GET /api/products/:id
// @access: Public
productRouter.get('/:id', getProductById);

// 3. @desc: Delete product by ID
// @route: DELETE /api/products/:id
// @access: Private/admin
// productRouter.delete('/:id', protect, isAdmin, deleteProductByID);
productRouter.delete('/:id', deleteProductByID);

// 4. @desc: Create product
// @route: POST /api/products
// @access: Private/admin
// productRouter.post('/', protect, isAdmin, createProduct);
productRouter.post('/', createProduct);

// 5. @desc: Update a product
// @route: PUT /api/products/:id
// @access: Private/admin
// productRouter.put('/:id', protect, isAdmin, updateProduct);
productRouter.put('/:id', updateProduct);

// 6. @desc: Create new review for product
// @route: POST /api/products/:id/reviews
// @access: Private
// productRouter.post('/:id/reviews', protect, reviewProduct);
productRouter.post('/:id/review', reviewProduct);

// 7. @desc: Get top 5 products
// @route: GET /api/products/top
// @access: Public
productRouter.get('/a/top', getTop);

module.exports = productRouter;
