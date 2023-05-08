const Database = require("../../config/database");
const generateToken = require("../../utils/generateToken");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const ApiError = require("../../utils/apiError");

class User {
  constructor() {
    this.db = new Database({
      host: "localhost",
      user: "root",
      password: "",
      database: "appp",
    });
  }

  login = async (user, res, next) => {
    const { email, password } = user;
    await this.db.connect();
    const sql = "SELECT * FROM users WHERE email = ?";
    const args = [email];
    const data = await this.db.query(sql, args);
    if (data.length === 0) {
      return next(new ApiError(`Invalid email or password`, 401));
    }
    bcrypt.compare(password, data[0].password, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Internal server error");
      }
      // Passwords match
      if (result) {
        const token = generateToken(data[0].id);
        res.status(200).json({ data: data, token: token });
      }
      // Passwords do not match
      if (!result) {
        return next(new ApiError(`Invalid email or password`, 401));
      }
    });
  };

  checkTokenAndRerturnDecoded = async (authorizationHeader) => {
    // check if token exists, if exist get it
    const token = authorizationHeader.split(" ")[1];
    // verify token (no change happens,expired token)
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    return decoded;
  };

  protect = async (authorizationHeader) => {
    const decoded = await this.checkTokenAndRerturnDecoded(authorizationHeader);
    //check if user exists
    await this.db.connect();
    const sql = "SELECT * FROM users WHERE id = ?";
    const args = [decoded.userId];
    const data = await this.db.query(sql, args);
    return data;
  };
}

module.exports = User;
