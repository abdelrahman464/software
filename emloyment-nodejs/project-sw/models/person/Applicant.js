const bcrypt = require("bcrypt");
const User = require("./User");

class Applicant extends User {
  constructor() {
    super();
  }

  signup = async (user) => {
    const { name, email, password, phone } = user;
    const hashedPassword = await bcrypt.hash(password, 10);
    const created_at = new Date();
    const updated_at = new Date();
    const sql = `INSERT INTO users 
    (name,email,password,role,phone,status,created_at,updated_at)
  VALUES
     (?, ? , ? ,"applicant" , ? , "active" , ? , ?)`;
    const args = [name, email, hashedPassword, phone, created_at, updated_at];
    return this.db.query(sql, args);
  };
}

module.exports = Applicant;
