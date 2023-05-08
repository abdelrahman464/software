const Applicant = require("../models/person/Applicant");
const User = require("../models/person/User");
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
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = new User();
  return await user.login({ email, password }, res, next);
});

exports.protect = asyncHandler(async (req, res, next) => {
  if (!req.headers.authorization) {
    return next(new ApiError("you are not login,please login first", 401));
  }
  if (req.headers.authorization) {
    if (!req.headers.authorization.startsWith("Bearer")) {
      return next(new ApiError("you are not login,please login first", 401));
    }
  }
  const user = new User();
  const data = await user.protect(req.headers.authorization);
  if (data.length === 0) {
    next(new ApiError("user is not available", 404));
  }
  req.user = data[0];
  next();
});
//@desc  Authorization (user permissions)
// ....roles => retrun array for example ["admin","applicatn"]
exports.allowedTo = (...roles) =>
  asyncHandler(async (req, res, next) => {
    //1- access roles
    //2- access registered user (req.user.role)
    if (!roles.includes(req.user.role)) {
      return next(
        new ApiError("you are not allowed to access this route", 401)
      );
    }
    next();
  });
