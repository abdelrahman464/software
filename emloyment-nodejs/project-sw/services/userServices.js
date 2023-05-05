const Admin = require("../models/person/Admin");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");

// @desc    Create user
// @route   POST  /api/v1/users
// @access  Private
exports.createUser = asyncHandler(async (req, res) => {
  const admin = new Admin();
  const { name, email, password, phone } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const created_at = new Date();
  const updated_at = new Date();

  await admin.createUser({
    name: name,
    email: email,
    password: hashedPassword,
    phone: phone,
    created_at: created_at,
    updated_at: updated_at,
  });
  res.status(201).json({
    message: "User created successfully",
  });
});

// @desc    get all users
// @route   GET  /api/v1/users
// @access  Private
exports.getAllUsers = asyncHandler(async (req, res, next) => {
  const admin = new Admin();
  const data = await admin.getAllUsers();
  if (data.length === 0) {
    return next(new ApiError(`No documents Found`, 404));
  }
  res.status(200).json({
    data: data,
  });
});
// @desc    get user
// @route   GET  /api/v1/users/:id
// @access  Private
exports.getUser = asyncHandler(async (req, res, next) => {
  const admin = new Admin();
  const { id } = req.params;
  const data = await admin.getUser(id);
  if (data.length === 0) {
    return next(new ApiError(`No documents For this id ${id}`, 404));
  }
  res.status(200).json({
    data: data,
  });
});
// @desc    Update specific user
// @route   PUT /api/v1/users/:id
// @access  Private
exports.updateUser = asyncHandler(async (req, res, next) => {
  const admin = new Admin();
  const id = req.params.id;
  const { name, email, password, phone, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const updated_at = new Date();
  // update a new user
  const data = await admin.updateUser(id, {
    name: name,
    email: email,
    password: hashedPassword,
    phone: phone,
    role: role,
    updated_at: updated_at,
  });
  if (data.affectedRows === 0) {
    return next(new ApiError(`No document For this id ${id}`, 404));
  }
  res.status(201).json({
    message: "User updated successfully",
  });
});
// @desc    Delete specific user
// @route   DELETE /api/v1/users/:id
// @access  Private
exports.deleteUser = asyncHandler(async (req, res, next) => {
  const admin = new Admin();
  const { id } = req.params;
  const data = await admin.deleteUser(id);
  if (data.affectedRows === 0) {
    return next(new ApiError(`No document For this id ${id}`, 404));
  }
  res.status(200).json({
    message: "User deleted successfully",
  });
});
