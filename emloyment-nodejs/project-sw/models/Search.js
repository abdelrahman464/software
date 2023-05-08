const Database = require("../config/database");

class SearchManager {
  constructor() {
    this.db = new Database({
      host: "localhost",
      user: "root",
      password: "",
      database: "appp",
    });
  }

  saveKeyWord = async (keyword, userId) => {
    await this.db.connect();
    const sql = `INSERT INTO searchedjobs
    (word,user_id)
  VALUES
     (?,?)`;
    const args = [keyword, userId];
    const data = await this.db.query(sql, args);
    return data;
  };

    getHistory = async (userId) => {
      await this.db.connect();
      const sql = `SELECT created_at,word FROM searchedjobs WHERE user_id = ? `;
      const args = [userId];
      const data = await this.db.query(sql, args);
      return data;
    };
}

module.exports = SearchManager;
