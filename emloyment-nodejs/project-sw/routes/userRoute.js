const express = require("express");
const {
  createUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("../services/userServices");
const router = express.Router();

router.route("/").get(getAllUsers).post(createUser);
router.route("/:id").get(getUser).put(updateUser).delete(deleteUser);

module.exports = router;
