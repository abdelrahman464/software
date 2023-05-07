const Database = require("../config/database");
const Job = require("./Job");
const ApiError = require("../utils/apiError");

class ApplicationManager {
  constructor() {
    this.db = new Database({
      host: "localhost",
      user: "root",
      password: "",
      database: "appp",
    });
  }

  createApplication = async (Application) => {
    await this.db.connect();
    const { userid, job_id, attachment, created_at, updated_at } = Application;
    const status = "pending";
    const sql = `INSERT INTO applications ( user_id  , job_id , status ,attachment, created_at , updated_at)
     VALUES (? , ? ,? , ? , ? ,?)`;
    const args = [userid, job_id, status, attachment, created_at, updated_at];
    this.db.query(sql, args);
    return true;
  };

  getAllApplications = async () => {
    await this.db.connect();
    const sql = `SELECT users.name as username ,applications.*
    FROM applications 
    JOIN users 
    on applications.user_id = users.id`;
    const data = this.db.query(sql);
    return data;
  };

  getApplication = async (id) => {
    await this.db.connect();
    const sql = `SELECT users.name as username ,applications.*
    FROM applications 
    JOIN users 
    on applications.user_id = users.id 
    WHERE applications.id = ?`;
    const args = [id];
    const data = this.db.query(sql, args);
    return data;
  };

  updateApplication = async (id, Application) => {
    await this.db.connect();
    const { attachment, updated_at } = Application;
    const sql = `UPDATE applications SET attachment = ? ,updated_at = ? WHERE  id = ?`;
    const args = [attachment, updated_at, id];
    const data = this.db.query(sql, args);
    return data;
  };

  deleteApplication = async (id) => {
    await this.db.connect();
    const sql = "DELETE FROM applications WHERE id = ?";
    const args = [id];
    const data = this.db.query(sql, args);
    return data;
  };

  getLogedUserApplications = async (id) => {
    await this.db.connect();
    const sql = `SELECT * FROM applications WHERE user_id = ? `;
    const args = [id];
    const data = this.db.query(sql, args);
    return data;
  };

  acceptApplication = async (id, res, next) => {
    await this.db.connect();
    const updated_at = new Date();
    //1-update application status to accepted
    const status = "accepted";
    const sql = `UPDATE applications SET status = ?, updated_at= ?  WHERE  id = ?`;
    const args = [status, updated_at, id];
    const updatedApplication = await this.db.query(sql, args);
    if (updatedApplication.affectedRows === 0) {
      return next(
        new ApiError(`There Is No Application With This id ${id}`, 404)
      );
    }
    //2-get column (job_id) from applications table
    const applicantion = await this.getApplication(id);
    const jobIdFromApplication = applicantion[0].job_id;
    //3- get coulmn (num_applicant) from job table
    const job = new Job();
    const jobData = await job.getJob(jobIdFromApplication);
    const num_applicant = jobData[0].num_applicant;
    //4-Increamnet coulmn (num apllicant) from job table by one
    const UpdatedJop = await job.IncreamentNumApplicantByOne(
      jobIdFromApplication,
      num_applicant
    );
    if (UpdatedJop.affectedRows === 0) {
      return next(new ApiError(`There Is No Job With This id ${id}`, 404));
    }
    return res.json({ message: "applications accepted successfully" });
  };

  rejectApllication = async (id, res, next) => {
    await this.db.connect();
    const updated_at = new Date();
    const status = "rejected";
    const sql = `UPDATE applications SET status = ?, updated_at= ?  WHERE  id = ?`;
    const args = [status, updated_at, id];
    const updatedApplication = await this.db.query(sql, args);
    if (updatedApplication.affectedRows === 0) {
      return next(
        new ApiError(`There Is No Application With This id ${id}`, 404)
      );
    }
    return res.json({ message: "applications rejected successfully" });
  };
}

module.exports = ApplicationManager;
