const Database = require("../../config/database");
const ApiError = require("../../utils/apiError");
const User = require("./User");

class Admin extends User {
  constructor() {
    super();
  }

  

  create = async (user) => {
    await this.db.connect();
    const { name, email, password, role, phone, created_at, updated_at } = user;
    const sql = `INSERT INTO users (name, email, password, role , phone, created_at, updated_at)
       VALUES (? , ? , ? , 'applicant', ?,?,?)`;
    const args = [name, email, password, phone, created_at, updated_at];
    this.db.query(sql, args);
    return true;
  };

  getAll = async () => {
    await this.db.connect();
    const sql = "SELECT * FROM users ";
    const doc = this.db.query(sql);
    if (doc.length === 0) {
      return next(new ApiError(`No document Found`, 404));
    }
    return doc;
  };

  get = async (id) => {
    await this.db.connect();
    const sql = "SELECT * FROM users WHERE id = ?";
    const args = [id];
    const doc = this.db.query(sql, args);
    if (doc.length === 0) {
      return next(new ApiError(`No document For this id ${id}`, 404));
    }
    return doc;
  };

  update = async (id, user) => {
    await this.db.connect();
    const { name, email, password, role, phone, updated_at } = user;
    const sql =
      "UPDATE users SET name = ?, email = ?, password = ? , phone = ? ,role = ?, updated_at = ? WHERE id = ?";
    const args = [name, email, password, phone, role, updated_at, id];
    this.db.query(sql, args);
    return true;
  };

  delete = async (id) => {
    await this.db.connect();
    const sql = "DELETE FROM users WHERE id = ?";
    const args = [id];
    const doc = this.db.query(sql, args);
    if (doc.length === 0) {
      return next(new ApiError(`No document For this id ${id}`, 404));
    }
    return doc;
  };
}

module.exports = Admin;
