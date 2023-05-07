const Application = require("../models/Application");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");

// @desc    Create Application
// @route   POST  /api/v1/applications
// @access  Private/protected  (applicant)
exports.createApplication = asyncHandler(async (req, res) => {
  const application = new Application();
  const { job_id, attachment } = req.body;
  const created_at = new Date();
  const updated_at = new Date();
  await application.createApplication({
    userid: req.user.id,
    job_id,
    attachment,
    created_at,
    updated_at,
  });
  res.status(201).json({
    message: "Application created successfully",
  });
});

// @desc    Get list of Applications
// @route   GET /api/v1/applications
// @access  protected  (admin)
exports.getAllApplications = asyncHandler(async (req, res, next) => {
  const application = new Application();
  const data = await application.getAllApplications();
  if (data.length === 0) {
    return next(new ApiError(`No Applications Found`, 404));
  }
  res.status(200).json({
    result: data.length,
    data: data,
  });
});

// @desc    Get specific Application by id
// @route   GET /api/v1/Applications/:id
// @access  protected (admin)
exports.getApplication = asyncHandler(async (req, res, next) => {
  const application = new Application();
  const { id } = req.params;
  const data = await application.getApplication(id);
  if (data.length === 0) {
    return next(new ApiError(`No Application For this id ${id}`, 404));
  }
  res.status(200).json({
    data: data,
  });
});
// @desc    Update specific Application
// @route   PUT /api/v1/Applications/:id
// @access  Private/protected  (applicant)
exports.updateApplication = asyncHandler(async (req, res, next) => {
  const application = new Application();
  const id = req.params.id;
  const { attachment } = req.body;
  const updated_at = new Date();
  // update a new user
  const data = await application.updateApplication(id, {
    attachment,
    updated_at,
  });
  if (data.affectedRows === 0) {
    return next(new ApiError(`No Application For this id ${id}`, 404));
  }
  res.status(201).json({
    message: "Application updated successfully",
  });
});
// @desc    Delete specific application
// @route   DELETE /api/v1/applications/:id
// @access  Private/protected  (applicant)
exports.deleteApplication = asyncHandler(async (req, res, next) => {
  const application = new Application();
  const { id } = req.params;
  const data = await application.deleteApplication(id);
  if (data.affectedRows === 0) {
    return next(new ApiError(`No Application For this id ${id}`, 404));
  }
  res.status(200).json({
    message: "Application deleted successfully",
  });
});
// @desc    Get logged user applications
// @route   GET /api/v1/applications/myapplications
// @access  Private/protected (applicant)
exports.getLoggedUserApllications = asyncHandler(async (req, res, next) => {
  const application = new Application();
  const id = req.user.id;
  const data = await application.getLogedUserApplications(id);
  if (data.length === 0) {
    return next(new ApiError(`No Applications For this User`, 404));
  }
  res.status(200).json({
    result: data.length,
    data: data,
  });
});
// @desc    accept an application
// @route   PUT /api/v1/applications/:id/accept
// @access  Private/protected (admin)
exports.acceptApllication = asyncHandler(async (req, res, next) => {
  const application = new Application();
  const { id } = req.params;
  return await application.acceptApplication(id, res, next);
});
// @desc    reject an application
// @route   PUT /api/v1/applications/:id/reject
// @access  Private/protected (admin)
exports.rejectApllication = asyncHandler(async (req, res, next) => {
  const application = new Application();
  const { id } = req.params;
  return await application.rejectApllication(id, res, next);
});
