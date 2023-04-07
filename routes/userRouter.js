const express = require('express');
const router = express.Router();

const {
  registerUser,
  authLogin,
  getUserProfile,
  updateUser,
  getAllUser,
  deleteUser,
  getUserById,
  updateUserById,
} = require('../controller/userController');
const { protect, isAdmin } = require('../middleware/authMiddleware');

router.get('/', protect, isAdmin, getAllUser);
router.get('/profile', protect, getUserProfile);
router.get('/:id', protect, isAdmin, getUserById);

router.post('/login', authLogin);
router.post('/', registerUser);

router.put('/profile', protect, updateUser);
router.put('/:id', protect, isAdmin, updateUserById);

router.delete('/:id', protect, isAdmin, deleteUser);

module.exports = router;
