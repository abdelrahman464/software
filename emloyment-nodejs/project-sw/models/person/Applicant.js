const Database = require("../../config/database");
const ApiError = require("../../utils/apiError");
const User = require("./User");

class Applicant extends User {
  constructor() {
    super();
  }

  create(user) {
    const { name, email, password, role, phone, created_at, updated_at } = user;
    const sql = `INSERT INTO users (name, email, password, role , phone, created_at, updated_at)
      VALUES (? , ? , ? , 'applicant', ?,?,?)`;
    const args = [name, email, password, phone, created_at, updated_at];
    return this.db.query(sql, args);
  }
}

module.exports = Applicant;
