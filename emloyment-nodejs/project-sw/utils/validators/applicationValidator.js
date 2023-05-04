const { check, body } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

exports.createJobValidator = [

  validatorMiddleware,
];

