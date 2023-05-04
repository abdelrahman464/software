const { check, body } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

exports.createJobValidator = [
  check("position")
    .notEmpty()
    .withMessage("position required")
    .isLength({ min: 2 })
    .withMessage("too short position name")
    .isLength({ max: 100 })
    .withMessage("too long position name"),
  validatorMiddleware,
];
exports.updateJobValidator = [body("position").optional(), validatorMiddleware];
