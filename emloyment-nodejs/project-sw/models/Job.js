const ApiError = require("../utils/apiError");
const Database = require("../config/database");
const Search = require("../models/Search");

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
    await this.db.query(sql, args);
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
    const data = await this.db.query(sql);
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
    const data = await this.db.query(sql);
    return data;
  };

  getJob = async (id) => {
    await this.db.connect();
    const sql = `SELECT jobs.id,jobs.position,jobs.requirements,jobs.salary,
    jobs.description as job_description,jobs.num_applicant,
    qualifications.description as qualification_description
     FROM jobs
     LEFT JOIN qualifications 
    on qualifications.job_id = jobs.id 
    WHERE jobs.id = ?`;
    const args = [id];
    const data = await this.db.query(sql, args);
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
    const data = await this.db.query(sql, args);
    return data;
  };

  deleteJob = async (id) => {
    await this.db.connect();
    const sql = "DELETE FROM Jobs WHERE id = ?";
    const args = [id];
    const data = await this.db.query(sql, args);
    return data;
  };

  IncreamentNumApplicantByOne = async (id, num_applicant) => {
    await this.db.connect();
    const plusNum_applicantByOne = num_applicant + 1;
    const sql = `UPDATE jobs SET num_applicant = ? WHERE id = ?`;
    const args = [plusNum_applicantByOne, id];
    const data = await this.db.query(sql, args);
    return data;
  };

  searchInJobs = async (keyword, userId, next) => {
    await this.db.connect();
    //1-search by the keyword and return jobs that contain in his qualification this keyword
    if (keyword.trim().length === 0) {
      return next(new ApiError(`There Is No Word To Search`, 404));
    }
    const LikeExpression = [`%${keyword}%`];
    const sql = `SELECT jobs.id,jobs.position,jobs.requirements,jobs.salary,
    jobs.description as job_description,
    qualifications.description as qualification_description
    FROM qualifications
    JOIN jobs
    ON jobs.id = qualifications.job_id
    WHERE qualifications.description LIKE ? 
    AND
    jobs.maxCandidateNumber > jobs.num_applicant`;
    const args = [LikeExpression];
    const data = await this.db.query(sql, args);

    //2- save this word in search history
    const search = new Search();
    await search.saveKeyWord(keyword, userId);

    //3- return the jobs containing this keyword in it's qualification
    return data;
  };
  getJobInfoByApplicationId = async (application_id) => {
    await this.db.connect();
    const sql = ` SELECT jobs.num_applicant,jobs.id FROM jobs
    JOIN applications 
    on jobs.id = applications.job_id
    where applications.id = ?
  `;
    const args = [application_id];
    const data = await this.db.query(sql, args);
    return data;
  };

}

module.exports = JobManager;
