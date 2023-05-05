const express = require("express");

const {
  createUserValidator,
  updateUserValidator,
} = require("../utils/validators/userValidator");
const authServices = require("../services/authServices");
const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../services/userServices");

const router = express.Router();

router.use(authServices.protect, authServices.allowedTo("admin"));
router.route("/").get(getAllUsers).post(createUserValidator, createUser);

router
  .route("/:id")
  .get(getUser)
  .put(updateUserValidator, updateUser)
  .delete(deleteUser);

module.exports = router;
