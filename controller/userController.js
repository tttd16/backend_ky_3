const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');

const tokenTime = require('../utils/tokenTime');
const userModel = require('../models/userModel');

/**
 *  @desc Register new user
 *  @route POST users/
 *  @access public
 * @type {*|express.RequestHandler<core.ParamsDictionary, any, any, core.Query>}
 */
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await userModel.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('Tài khoản người dùng đã tồn tại');
  }
  const newUser = await userModel.create({ name, email, password });
  if (newUser) {
    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
      token: tokenTime(newUser._id),
    });
  } else {
    res.status(400);
    throw new Error('Dữ liệu nhập không hợp lệ');
  }
});

/**
 * @desc Auth & get token
 *  @route POST users/login
 *  @access public
 * @type {*|express.RequestHandler<core.ParamsDictionary, any, any, core.Query>}
 */
const authLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: tokenTime(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Email hoặc mật khẩu không chính xác');
  }
});

/**
 * @desc Get user profie
 *  @route GET users/profile
 *  @access Private
 * @type {*|express.RequestHandler<core.ParamsDictionary, any, any, core.Query>}
 */
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await userModel.findById(req.user._id);
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error('Không tìm thấy hồ sơ người dùng');
  }
});

/**
 * @desc Update user
 *  @route PUT users/profile
 *  @access Private
 * @type {*|express.RequestHandler<core.ParamsDictionary, any, any, core.Query>}
 */
const updateUser = asyncHandler(async (req, res) => {
  const user = await userModel.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: tokenTime(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error('Không tìm thấy người dùng');
  }
});

/**
 * @desc Get all user
 *  @route GET users/
 *  @access Private Admin
 * @type {*|express.RequestHandler<core.ParamsDictionary, any, any, core.Query>}
 */
const getAllUser = asyncHandler(async (req, res) => {
  const users = await userModel.find({});
  res.json(users);
});

/**
 * @desc Delete user
 *  @route DELETE users/:id
 *  @access Private Admin
 * @type {*|express.RequestHandler<core.ParamsDictionary, any, any, core.Query>}
 */
const deleteUser = asyncHandler(async (req, res) => {
  const user = await userModel.findByIdAndDelete(req.params.id);
  if (user) {
    res.status(200).send('Xóa thành công');
  } else {
    res.status(404);
    throw new Error('Xóa không thành công');
  }
});

/**
 * @desc Get user by id
 *  @route GET users/:id
 *  @access Private Admin
 * @type {*|express.RequestHandler<core.ParamsDictionary, any, any, core.Query>}
 */
const getUserById = asyncHandler(async (req, res) => {
  const user = await userModel.findById(req.params.id);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404);
    throw new Error('Không tìm thấy');
  }
});

/**
 * @desc Update user by id
 *  @route PUT users/:id
 *  @access Private Admin
 * @type {*|express.RequestHandler<core.ParamsDictionary, any, any, core.Query>}
 */
const updateUserById = asyncHandler(async (req, res) => {
  const user = await userModel.findById(req.params.id);
  console.log(user);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('Không tìm thấy người dùng');
  }
});

module.exports = {
  registerUser,
  authLogin,
  getUserProfile,
  updateUser,
  getAllUser,
  deleteUser,
  getUserById,
  updateUserById,
};
