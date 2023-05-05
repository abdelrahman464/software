const Database = require("../config/database");

class JobManager {
  constructor() {
    this.db = new Database({
      host: "localhost",
      user: "root",
      password: "",
      database: "appp",
    });
  }

  createJob = async (job) => {
    await this.db.connect();
    const {
      position,
      description,
      requirements,
      salary,
      maxCandidateNumber,
      created_at,
      updated_at,
    } = job;
    const sql = `INSERT INTO jobs 
    ( position, description,requirements,salary , maxCandidateNumber,created_at,updated_at	)
  VALUES
     (?,?,?, ?,?,?,?)`;
    const args = [
      position,
      description,
      requirements,
      salary,
      maxCandidateNumber,
      created_at,
      updated_at,
    ];
    this.db.query(sql, args);
    return true;
  };

  getAllJobs = async () => {
    await this.db.connect();
    const sql = `SELECT jobs.id,jobs.position,jobs.requirements,jobs.salary,
    jobs.description as job_description,
    qualifications.description as qualification_description
     FROM jobs
     LEFT JOIN qualifications 
    on qualifications.job_id = jobs.id 
     WHERE jobs.maxCandidateNumber > jobs.num_applicant`;
    const data = this.db.query(sql);
    return data;
  };

  getAllJobsForAdmin = async () => {
    await this.db.connect();
    const sql = `SELECT jobs.id,jobs.position,jobs.requirements,jobs.salary,
    jobs.description as job_description, jobs.num_applicant,jobs.maxCandidateNumber,
    qualifications.description as qualification_description
     FROM jobs
    LEFT JOIN qualifications 
    on qualifications.job_id = jobs.id`;
    const data = this.db.query(sql);
    return data;
  };

  getJob = async (id) => {
    await this.db.connect();
    const sql = `SELECT jobs.id,jobs.position,jobs.requirements,jobs.salary,
    jobs.description as job_description,
    qualifications.description as qualification_description
     FROM jobs
     LEFT JOIN qualifications 
    on qualifications.job_id = jobs.id 
    WHERE jobs.id = ?`;
    const args = [id];
    const data = this.db.query(sql, args);
    return data;
  };

  updateJob = async (id, job) => {
    await this.db.connect();
    const {
      position,
      description,
      requirements,
      salary,
      maxCandidateNumber,
      updated_at,
    } = job;
    const sql = `UPDATE jobs SET position = ?, description = ?, requirements = ? , salary=?,
    maxCandidateNumber = ? ,updated_at = ? WHERE  id = ?`;
    const args = [
      position,
      description,
      requirements,
      salary,
      maxCandidateNumber,
      updated_at,
      id,
    ];
    const data = this.db.query(sql, args);
    return data;
  };

  deleteJob = async (id) => {
    await this.db.connect();
    const sql = "DELETE FROM Jobs WHERE id = ?";
    const args = [id];
    const data = this.db.query(sql, args);
    return data;
  };
}

module.exports = JobManager;
