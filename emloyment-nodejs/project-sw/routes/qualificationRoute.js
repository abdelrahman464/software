const express = require("express");

const authServices = require("../services/authServices");
const {
  getQualification,
  getAllQualifications,
  createQualification,
  updateQualification,
  deleteQualification,
  searchInJobs,
  getLoggedUserSearchHistory
} = require("../services/qualificationServices");

const router = express.Router();

router
  .route("/")
  .get(
    authServices.protect,
    authServices.allowedTo("admin"),
    getAllQualifications
  )
  .post(
    authServices.protect,
    authServices.allowedTo("admin"),
    createQualification
  );

router
  .route("/:id")
  .get(authServices.protect, authServices.allowedTo("admin"), getQualification)
  .put(
    authServices.protect,
    authServices.allowedTo("admin"),
    updateQualification
  )
  .delete(
    authServices.protect,
    authServices.allowedTo("admin"),
    deleteQualification
  );
router
  .route("/search/history")
  .get(
    authServices.protect,
    authServices.allowedTo("applicant"),
    getLoggedUserSearchHistory
  );
router
  .route("/search")
  .post(
    authServices.protect,
    authServices.allowedTo("applicant"),
    searchInJobs
  );
module.exports = router;
