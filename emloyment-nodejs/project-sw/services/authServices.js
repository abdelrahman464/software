const Applicant = require("../models/person/Applicant");
const User = require("../models/person/User");
const generateToken = require("../utils/generateToken");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");

//@desc signup
//@route POST /api/v1/users/auth/signup
//@access public
exports.signup = asyncHandler(async (req, res) => {
  const { name, email, password, phone } = req.body;
  const applicant = new Applicant();
  await applicant.signup({ name, email, password, phone });
  res.status(201).json({
    message: "welcom with us",
  });
});
// @desc    login
// @route   POST  /api/v1/users/auth/login
// @access  public
exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = new User();
  const data = await user.login(email);

  bcrypt.compare(password, data[0].password, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Internal server error");
    }
    // Passwords match
    if (result) {
      const token = generateToken(data.id);
      res.status(200).json({ data: data, token: token });
    }
    // Passwords do not match
    if (!result) {
      return res.status(401).send("Invalid email or password");
    }
  });
});
