const express = require("express");
const authServices = require("../services/authServices");
const {
  createApplication,
  getAllApplications,
  getApplication,
  updateApplication,
  deleteApplication,
  acceptApllication,
  rejectApllication,
  getLoggedUserApllications,
} = require("../services/applicationServices");

const router = express.Router();

router
  .route("/")
  .get(
    authServices.protect,
    authServices.allowedTo("admin"),
    getAllApplications
  )
  .post(
    authServices.protect,
    authServices.allowedTo("applicant"),
    createApplication
  );
router
  .route("/myapplications")
  .get(
    authServices.protect,
    authServices.allowedTo("applicant"),
    getLoggedUserApllications
  );
router
  .route("/:id")
  .get(authServices.protect, authServices.allowedTo("admin"), getApplication)
  .put(
    authServices.protect,
    authServices.allowedTo("applicant"),
    updateApplication
  )
  .delete(
    authServices.protect,
    authServices.allowedTo("applicant"),
    deleteApplication
  );
router
  .route("/:id/accept")
  .put(
    authServices.protect,
    authServices.allowedTo("admin"),
    acceptApllication
  );
router
  .route("/:id/reject")
  .put(
    authServices.protect,
    authServices.allowedTo("admin"),
    rejectApllication
  );

module.exports = router;
