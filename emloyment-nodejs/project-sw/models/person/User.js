const Database = require("../../config/database");


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
    const data = this.db.query(sql, args);

    return data;
  };
}

module.exports = User;
