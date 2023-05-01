const Database = require("../config/database");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");

const db = new Database({
  host: "localhost",
  user: "root",
  password: "",
  database: "appp",
});

// @desc    Create user
// @route   POST  /api/v1/users
// @access  Private
exports.createUser = asyncHandler(async (req, res) => {
  await db.connect();
  const user = new User(db);

  const { name, email, password, phone } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const created_at = new Date();
  const updated_at = new Date();
  // Create a new user

  const doc = await user.create({
    name: name,
    email: email,
    password: hashedPassword,
    phone: phone,
    created_at: created_at,
    updated_at: updated_at,
  });

  res.status(201).json({
    message: "User created successfully",
    dtaa: doc.insertId,
  });
});

// @desc    get all users
// @route   GET  /api/v1/users
// @access  Private
exports.getAllUsers = asyncHandler(async (req, res) => {
  await db.connect();
  const user = new User(db);
  const doc = await user.getAll();
  if (doc.length === 0) {
    return next(new ApiError(`No document Found`, 404));  
  }
  res.status(200).json({
    data: doc,
  });
});
// @desc    get user
// @route   GET  /api/v1/users/:id
// @access  Private
exports.getUser = asyncHandler(async (req, res, next) => {
  await db.connect();
  const user = new User(db);
  const { id } = req.params;
  const doc = await user.get(id);
  if (doc.length === 0) {
    return next(new ApiError(`No document For this id ${id}`, 404));
  }
  res.status(200).json({
    data: doc,
  });
});
// @desc    Update specific user
// @route   PUT /api/v1/users/:id
// @access  Private
exports.updateUser = asyncHandler(async (req, res) => {
  await db.connect();
  const user = new User(db);
  const id = req.params.id;
  const { name, email, password, phone, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const updated_at = new Date();
  // update a new user
  await user.update(id, {
    name: name,
    email: email,
    password: hashedPassword,
    phone: phone,
    role: role,
    updated_at: updated_at,
  });
  res.status(201).json({
    message: "User updated successfully",
  });
});
// @desc    Delete specific user
// @route   DELETE /api/v1/users/:id
// @access  Private
exports.deleteUser = asyncHandler(async (req, res, next) => {
  await db.connect();
  const user = new User(db);
  const { id } = req.params;
  const doc = await user.delete(id);
  if (doc.length === 0) {
    return next(new ApiError(`No document For this id ${id}`, 404));
  }
  res.status(204).json({
    message: "User deleted successfully",
  });
});
