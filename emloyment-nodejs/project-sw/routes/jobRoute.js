const express = require("express");

const {
  createJobValidator,
  updateJobValidator,
} = require("../utils/validators/jobValidator");
const authServices = require("../services/authServices");
const {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
  getAllJobsForAdmin,
} = require("../services/JobServices");

const router = express.Router();

router
  .route("/")
  .get(getAllJobs)
  .post(
    authServices.protect,
    authServices.allowedTo("admin"),
    createJobValidator,
    createJob
  );
router
  .route("/all")
  .get(
    authServices.protect,
    authServices.allowedTo("admin"),
    getAllJobsForAdmin
  );
router
  .route("/:id")
  .get(
    authServices.protect,
    authServices.allowedTo("applicant", "admin"),
    getJob
  )
  .put(
    authServices.protect,
    authServices.allowedTo("admin"),
    updateJobValidator,
    updateJob
  )
  .delete(authServices.protect, authServices.allowedTo("admin"), deleteJob);

module.exports = router;
