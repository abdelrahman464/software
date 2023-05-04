const Database = require("../config/database");
const User = require("../models/person/User");
const Applicant = require("../models/person/Applicant");
const Admin = require("../models/person/Admin");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const generateToken = require("../utils/generateToken");

const db = new Database({
  host: "localhost",
  user: "root",
  password: "",
  database: "appp",
});

// @desc    login
// @route   POST  /api/v1/users/login
// @access  public
exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = new User();
  const doc = await user.login(email);

  
  bcrypt.compare(password, doc[0].password, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Internal server error");
    }
    // Passwords match
    if (result) {
      const token = generateToken(doc.id);
      res.status(200).json({ data: doc, token: token });
    }
    // Passwords do not match
    if (!result) {
      return res.status(401).send("Invalid email or password");
    }
  });
});

// @desc    Create user
// @route   POST  /api/v1/users
// @access  Private
exports.createUser = asyncHandler(async (req, res) => {
  const admin = new Admin();
  const { name, email, password, phone } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const created_at = new Date();
  const updated_at = new Date();
  // update a new user
  await admin.create({
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
exports.getAllUsers = asyncHandler(async (req, res) => {
  const user = new User();
  const doc = await user.getAll();
  res.status(200).json({
    data: doc,
  });
});
// @desc    get user
// @route   GET  /api/v1/users/:id
// @access  Private
exports.getUser = asyncHandler(async (req, res, next) => {
  const admin = new Admin();
  const { id } = req.params;
  const doc = await admin.get(id);
  res.status(200).json({
    data: doc,
  });
});
// @desc    Update specific user
// @route   PUT /api/v1/users/:id
// @access  Private
exports.updateUser = asyncHandler(async (req, res) => {
  const admin = new Admin();
  const id = req.params.id;
  const { name, email, password, phone, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const updated_at = new Date();
  // update a new user
  await admin.update(id, {
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
  const admin = new Admin();
  const { id } = req.params;
  await admin.delete(id);
  res.status(200).json({
    message: "User deleted successfully",
  });
});
