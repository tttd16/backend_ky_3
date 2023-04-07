const asyncHandler = require("express-async-handler");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await userModel.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const newUser = await userModel.create({ name, email, password });
  if (newUser) {
    res.status(200).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
      token: jwt.sign({ id: newUser._id }, "masobimat", {
        expiresIn: "1d",
      }),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});


const authLogin = asyncHandler(async (req, res) => {

  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: jwt.sign({ id: user._id }, "masobimat", {
        expiresIn: "1d",
      }),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});


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
    throw new Error("User info not found");
  }
});


const updateUser = asyncHandler(async (req, res) => {
  const user = await userModel.findOneAndUpdate(
    { _id: req.user._id },
    { $set: { name: req.body.name, email: req.body.email } },
    { new: true }
  );

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// 5.
const getAllUser = asyncHandler(async (req, res) => {
  const users = await userModel.find({});
  res.json(users);
});


const deleteUser = asyncHandler(async (req, res) => {
  const user = await userModel.findByIdAndDelete(req.params.id);
  if (user) {
    res.status(200).send("Xoa thanh cong");
  } else {
    res.status(404);
    throw new Error("Xoa khong thanh cong");
  }
});

const getUserById = asyncHandler(async (req, res) => {
  const user = await userModel.findById(req.params.id);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404);
    throw new Error("not found");
  }
});

const updateUserById = asyncHandler(async (req, res) => {
  const user = await userModel.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        name: req.body.name,
        email: req.body.email,
      },
    },
    { new: true }
  );
  console.log(user);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
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
