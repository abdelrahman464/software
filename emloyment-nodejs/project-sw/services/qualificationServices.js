const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const Qualification = require("../models/Qualification");
const Job = require("../models/Job");
const Search = require("../models/Search");
// @desc    Get list of Qualifications
// @route   GET /api/v1/qualifications
// @access  public
exports.getAllQualifications = asyncHandler(async (req, res, next) => {
  const qualification = new Qualification();
  const data = await qualification.getAllQualifications();
  if (data.length === 0) {
    return next(new ApiError(`No Qualifications Found`, 404));
  }
  res.status(200).json({
    result: data.length,
    data: data,
  });
});

// @desc    Get specific Qualification by id
// @route   GET /api/v1/qualifications/:id
// @access  public
exports.getQualification = asyncHandler(async (req, res, next) => {
  const qualification = new Qualification();
  const { id } = req.params;
  const data = await qualification.getQualification(id);
  if (data.length === 0) {
    return next(new ApiError(`No Qualification For this id ${id}`, 404));
  }
  res.status(200).json({
    data: data,
  });
});
// @desc    Create Qualification
// @route   POST  /api/v1/qualifications
// @access  Private/protected  (admin)
exports.createQualification = asyncHandler(async (req, res, next) => {
  const qualification = new Qualification();
  const { job_id, description } = req.body;
  const created_at = new Date();
  const updated_at = new Date();

  await qualification.createQualification({
    job_id,
    description,
    created_at,
    updated_at,
  });
  res.status(201).json({
    message: "Qualification created successfully",
  });
});
// @desc    Update specific Qualification
// @route   PUT /api/v1/qualifications/:id
// @access  Private/protected  (admin)
exports.updateQualification = asyncHandler(async (req, res, next) => {
  const qualification = new Qualification();
  const id = req.params.id;
  const { job_id, description } = req.body;
  const updated_at = new Date();
  // update a new user
  const data = await qualification.updateQualification(id, {
    job_id,
    description,
    updated_at,
  });
  if (data.affectedRows === 0) {
    return next(new ApiError(`No Qualification For this id ${id}`, 404));
  }
  res.status(201).json({
    message: "Qualification updated successfully",
  });
});
// @desc    Delete specific Qualification
// @route   DELETE /api/v1/qualifications/:id
// @access  Private/protected  (admin)
exports.deleteQualification = asyncHandler(async (req, res, next) => {
  const qualification = new Qualification();
  const { id } = req.params;
  const data = await qualification.deleteQualification(id);
  if (data.affectedRows === 0) {
    return next(new ApiError(`No Qualification For this id ${id}`, 404));
  }
  res.status(200).json({
    message: "Qualification deleted successfully",
  });
});

// @desc    search in jobs based on qualifications
// @route   POST /api/v1/qualifications/search
// @access  public
exports.searchInJobs = asyncHandler(async (req, res, next) => {
  const job = new Job();
  const keyword = req.body.keyword;
  const data = await job.searchInJobs(keyword, req.user.id, next);
  if (data.length === 0) {
    return next(new ApiError(`No Jobs Found`, 404));
  }
  res.status(200).json({
    result: data.length,
    data: data,
  });
});
// @desc    looged apllicant search history
// @route   GET /api/v1/qualifications/search
// @access  public
exports.getLoggedUserSearchHistory = asyncHandler(async (req, res, next) => {
  const search = new Search();
  const userId = req.user.id;
  const data = await search.getHistory(userId);
  if (data.length === 0) {
    return next(new ApiError(`No History For You`, 404));
  }
  res.status(200).json({
    result: data.length,
    data: data,
  });
});
