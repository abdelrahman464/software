class User {
  constructor(database) {
    this.db = database;
  }

  create(user) {
    const { name, email, password, role, phone, created_at, updated_at } = user;
    const sql = `INSERT INTO users (name, email, password, role , phone, created_at, updated_at)
      VALUES (? , ? , ? , 'applicant', ?,?,?)`;
    const args = [name, email, password, phone, created_at, updated_at];
    return this.db.query(sql, args);
  }

  getAll() {
    const sql = "SELECT * FROM users ";
    return this.db.query(sql);
  }

  get(id) {
    const sql = "SELECT * FROM users WHERE id = ?";
    const args = [id];
    return this.db.query(sql, args);
  }

  update(id, user) {
    const { name, email, password, role, phone, updated_at } = user;
    const sql =
      "UPDATE users SET name = ?, email = ?, password = ? , phone = ? ,role = ?, updated_at = ? WHERE id = ?";
    const args = [name, email, password, phone, role, updated_at, id];
    return this.db.query(sql, args);
  }

  delete(id) {
    const sql = "DELETE FROM users WHERE id = ?";
    const args = [id];
    return this.db.query(sql, args);
  }
}

module.exports = User;
