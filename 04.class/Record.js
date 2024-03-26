import sqlite3 from "sqlite3";

class Record {
  constructor(id, text) {
    this.id = id;
    this.text = text;
  }

  static async createTable() {
    const db = new sqlite3.Database("./memo.db");
    const sql =
      "CREATE TABLE IF NOT EXISTS memos(id INTEGER PRIMARY KEY AUTOINCREMENT, text TEXT NOT NULL UNIQUE)";
    db.run(sql);
  }

  static async all() {
    const db = new sqlite3.Database("./memo.db");
    const records = await Record.select(db);
    const convertedRecords = records.map((record) =>
      new Record(record.id, record.text).convert(),
    );
    return convertedRecords;
  }

  static async select() {
    return new Promise((resolve, reject) => {
      const db = new sqlite3.Database("./memo.db");
      const sql = "SELECT * FROM memos ORDER BY id ASC";
      db.all(sql, function (err, rows) {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  convert() {
    const memo = {
      memoId: this.id,
      name: this.text.split("\n")[0],
      value: this.text,
    };
    return memo;
  }

  static async insert(text) {
    const db = new sqlite3.Database("./memo.db");
    const sql = "INSERT INTO memos(text) VALUES(?)";
    db.run(sql, `${text}`);
  }

  static async delete(memoId) {
    const db = new sqlite3.Database("./memo.db");
    const sql = "DELETE FROM memos WHERE id = ?";
    db.run(sql, `${memoId}`);
  }
}

export default Record;
