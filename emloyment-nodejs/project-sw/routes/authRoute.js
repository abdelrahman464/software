const express = require("express");
const {
  loginValidator,
  signupValidator,
} = require("../utils/validators/authValidator");
const { login, signup } = require("../services/authServices");
const router = express.Router();

router.route("/login").post(loginValidator, login);
router.route("/signup").post(signupValidator, signup);
module.exports = router;
