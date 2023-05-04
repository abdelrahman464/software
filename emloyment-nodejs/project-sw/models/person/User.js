const Database = require("../../config/database");
const ApiError = require("../../utils/apiError");
const bcrypt = require("bcrypt");
const generateToken = require("../../utils/generateToken");

class User {
  constructor() {
    this.db = new Database({
      host: "localhost",
      user: "root",
      password: "",
      database: "appp",
    });
  }

  login = async (email) => {
    await this.db.connect();
    const sql = "SELECT * FROM users WHERE email = ?";
    const args = [email];
    const doc = this.db.query(sql, args);

    return doc;
  };
}

module.exports = User;
