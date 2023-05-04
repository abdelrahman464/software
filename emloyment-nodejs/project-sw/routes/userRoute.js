const express = require("express");
const {
  createUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("../services/userServices");
const {
  createUserValidator,
  updateUserValidator,
} = require("../utils/validators/userValidator");
const router = express.Router();

router.route("/").get(getAllUsers).post(createUserValidator, createUser);
router
  .route("/:id")
  .get(getUser)
  .put(updateUserValidator, updateUser)
  .delete(deleteUser);
module.exports = router;
