const express = require("express");
const {
  createUserValidator,
  updateUserValidator,
} = require("../utils/validators/userValidator");
const {
  createUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("../services/userServices");

const { protect } = require("../services/authServices");
const router = express.Router();

router.route("/").get(getAllUsers).post(createUserValidator, createUser);
router
  .route("/:id")
  .get(protect, getUser)
  .put(updateUserValidator, updateUser)
  .delete(deleteUser);
module.exports = router;
