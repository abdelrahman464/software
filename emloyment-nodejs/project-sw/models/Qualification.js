const Database = require("../config/database");

class QualificationManager {
  constructor() {
    this.db = new Database({
      host: "localhost",
      user: "root",
      password: "",
      database: "appp",
    });
  }

  createQualification = async (Qualification) => {
    await this.db.connect();
    const { job_id, description, created_at, updated_at } = Qualification;
    const sql = `INSERT INTO qualifications 
    (job_id,description,created_at,updated_at	)
  VALUES
     (?,?,?,?)`;
    const args = [job_id, description, created_at, updated_at];
    await this.db.query(sql, args);
    return true;
  };

  getAllQualifications = async () => {
    await this.db.connect();
    const sql = `SELECT * FROM qualifications`;
    const data = await this.db.query(sql);
    return data;
  };

  getQualification = async (id) => {
    await this.db.connect();
    const sql = `SELECT * FROM qualifications WHERE id = ?`;
    const args = [id];
    const data = await this.db.query(sql, args);
    return data;
  };

  updateQualification = async (id, Qualification) => {
    await this.db.connect();
    const { job_id, description, updated_at } = Qualification;
    const sql = `UPDATE qualifications SET job_id = ?, description = ?,updated_at = ? WHERE  id = ?`;
    const args = [job_id, description, updated_at, id];
    const data = await this.db.query(sql, args);
    return data;
  };

  deleteQualification = async (id) => {
    await this.db.connect();
    const sql = "DELETE FROM qualifications WHERE id = ?";
    const args = [id];
    const data = await this.db.query(sql, args);
    return data;
  };
  
}

module.exports = QualificationManager;
