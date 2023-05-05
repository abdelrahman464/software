const Job = require("../models/Job");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");

// @desc    Create job
// @route   POST  /api/v1/jobs
// @access  Private/protected  (admin)
exports.createJob = asyncHandler(async (req, res) => {
  const job = new Job();
  const { position, description, requirements, salary, maxCandidateNumber } =
    req.body;
  const created_at = new Date();
  const updated_at = new Date();

  await job.createJob({
    position,
    description,
    requirements,
    salary,
    maxCandidateNumber,
    created_at,
    updated_at,
  });
  res.status(201).json({
    message: "Job created successfully",
  });
});

// @desc    Get list of jobs
// @route   GET /api/v1/jobs
// @access  public
exports.getAllJobs = asyncHandler(async (req, res, next) => {
  const job = new Job();
  const data = await job.getAllJobs();
  if (data.length === 0) {
    return next(new ApiError(`No Jobs Found`, 404));
  }
  res.status(200).json({
    data: data,
  });
});
// @desc    Get list of jobs
// @route   GET /api/v1/jobs/all
// @access  private/protected (admin)
exports.getAllJobsForAdmin = asyncHandler(async (req, res, next) => {
  const job = new Job();
  const data = await job.getAllJobsForAdmin();
  if (data.length === 0) {
    return next(new ApiError(`No Jobs Found`, 404));
  }
  res.status(200).json({
    data: data,
  });
});
// @desc    Get specific job by id
// @route   GET /api/v1/jobs/:id
// @access  protected
exports.getJob = asyncHandler(async (req, res, next) => {
  const job = new Job();
  const { id } = req.params;
  const data = await job.getJob(id);
  if (data.length === 0) {
    return next(new ApiError(`No Job For this id ${id}`, 404));
  }
  res.status(200).json({
    data: data,
  });
});
// @desc    Update specific job
// @route   PUT /api/v1/jobs/:id
// @access  Private/protected  (admin)
exports.updateJob = asyncHandler(async (req, res, next) => {
  const job = new Job();
  const id = req.params.id;
  const { position, description, requirements, salary, maxCandidateNumber } =
    req.body;
  const updated_at = new Date();
  // update a new user
  const data = await job.updateJob(id, {
    position,
    description,
    requirements,
    salary,
    maxCandidateNumber,
    updated_at,
    id,
  });
  if (data.affectedRows === 0) {
    return next(new ApiError(`No Job For this id ${id}`, 404));
  }
  res.status(201).json({
    message: "Job updated successfully",
  });
});
// @desc    Delete specific job
// @route   DELETE /api/v1/jobs/:id
// @access  Private/protected  (admin)
exports.deleteJob = asyncHandler(async (req, res, next) => {
  const job = new Job();
  const { id } = req.params;
  const data = await job.deleteJob(id);
  if (data.affectedRows === 0) {
    return next(new ApiError(`No Job For this id ${id}`, 404));
  }
  res.status(200).json({
    message: "Job deleted successfully",
  });
});
