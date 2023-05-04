const { check, body } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const Database = require("../../config/database");

const isEmailAlreadyInUse = (emailExists = async (email) => {
  db = new Database({
    host: "localhost",
    user: "root",
    password: "",
    database: "appp",
  });
  await db.connect();
  const query = `SELECT COUNT(*) as count FROM users WHERE email = ?`;
  const args = [email];
  const rows = await db.query(query, args);
  const exists = rows[0].count > 0;
  await db.close();
  if (exists) {
    return true;
  }
});

exports.createUserValidator = [
  check("name")
    .notEmpty()
    .withMessage("name required")
    .isLength({ min: 2 })
    .withMessage("too short User name")
    .isLength({ max: 100 })
    .withMessage("too long User name"),

  check("email")
    .notEmpty()
    .withMessage("Email required")
    .isEmail()
    .withMessage("Invalid email address")
    .custom(async (email) => {
      if (await isEmailAlreadyInUse(email)) {
        throw new Error("Email already in use");
      }
      return true;
    }),
  check("password")
    .notEmpty()
    .withMessage("password required")
    .isLength({ min: 8 })
    .withMessage("password must be at least 8 characters")
    .isLength({ max: 32 })
    .withMessage("password must be at least 8 characters")
    .custom((password, { req }) => {
      if (password !== req.body.passwordConfirm) {
        throw new Error("password does not match");
      }
      return true;
    }),
  check("passwordConfirm").notEmpty().withMessage("password required"),

  check("role").optional(),

  check("phone")
    .isMobilePhone(["ar-EG", "ar-SA"])
    .withMessage("Invalid phone number only accepted Egy and SA Phone numbers"),

  validatorMiddleware,
];

exports.updateUserValidator = [
  body("name").optional(),

  check("email")
    .optional()
    .isEmail()
    .withMessage("Invalid email address")
    .custom(async (email) => {
      if (await isEmailAlreadyInUse(email)) {
        throw new Error("Email already in use");
      }
      return true;
    }),
  check("password")
    .notEmpty()
    .withMessage("password required")
    .isLength({ min: 8 })
    .withMessage("password must be at least 8 characters")
    .isLength({ max: 32 })
    .withMessage("password must be at least 8 characters")
    .custom((password, { req }) => {
      if (password !== req.body.passwordConfirm) {
        throw new Error("password does not match");
      }
      return true;
    }),

  check("role").optional(),

  check("phone")
    .optional()
    .isMobilePhone(["ar-EG", "ar-SA"])
    .withMessage("Invalid phone number only accepted Egy and SA Phone numbers"),

  validatorMiddleware,
];
