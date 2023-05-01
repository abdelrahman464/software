// database
const mysql = require("mysql2");

class Database {
  constructor(config) {
    this.connection = mysql.createConnection(config);
  }

  connect() {
    return new Promise((resolve, reject) => {
      this.connection.connect((err) => {
        if (err) return reject(err);
        console.log("Connected to MySQL server.");
        resolve();
      });
    });
  }

  query(sql, args) {
    return new Promise((resolve, reject) => {
      this.connection.query(sql, args, (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      });
    });
  }

  close() {
    this.connection.end();
    console.log("Connection to MySQL server closed.");
  }
}

module.exports = Database;
