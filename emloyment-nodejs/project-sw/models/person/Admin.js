const Database = require("../../config/database");
const ApiError = require("../../utils/apiError");
const User = require("./User");

class Admin extends User {
  constructor() {
    super();
  }

  createUser = async (user) => {
    await this.db.connect();
    const { name, email, password, role, phone, created_at, updated_at } = user;
    const sql = `INSERT INTO users (name, email, password, role , phone, created_at, updated_at)
       VALUES (? , ? , ? , 'applicant', ?,?,?)`;
    const args = [name, email, password, phone, created_at, updated_at];
    this.db.query(sql, args);
    return true;
  };

  getAllUsers = async () => {
    await this.db.connect();
    const sql = "SELECT * FROM users ";
    const data = this.db.query(sql);
    return data;
  };

  getUser = async (id) => {
    await this.db.connect();
    const sql = "SELECT * FROM users WHERE id = ?";
    const args = [id];
    const data = this.db.query(sql, args);
    return data;
  };

  updateUser = async (id, user) => {
    await this.db.connect();
    const { role, updated_at } = user;
    const sql =
      "UPDATE users SET role = ?, updated_at = ? WHERE id = ?";
    const args = [role, updated_at, id];
    const data = this.db.query(sql, args);
    return data;
  };

  deleteUser = async (id) => {
    await this.db.connect();
    const sql = "DELETE FROM users WHERE id = ?";
    const args = [id];
    const data = this.db.query(sql, args);
    return data;
  };
}

module.exports = Admin;
