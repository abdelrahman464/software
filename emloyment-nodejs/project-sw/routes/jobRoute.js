const express = require("express");
const {
  createJob,
  updateJob,
  getAllJobs,
  getAllJobsForAdmin,
  getJob,
  deleteJob,
} = require("../services/JobServices");
const {
  createJobValidator,
  updateJobValidator,
} = require("../utils/validators/jobValidator");
const router = express.Router();

router.route("/").get(getAllJobs).post(createJobValidator, createJob);
router.route("/all").get(getAllJobsForAdmin);
router
  .route("/:id")
  .get(getJob)
  .put(updateJobValidator, updateJob)
  .delete(deleteJob);
module.exports = router;
