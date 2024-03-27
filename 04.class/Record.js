import sqlite3 from "sqlite3";

export default class Record {
  static db = new sqlite3.Database("./memo.db");
  constructor(id, text) {
    this.id = id;
    this.text = text;
  }

  static createTable() {
    const sql =
      "CREATE TABLE IF NOT EXISTS memos(id INTEGER PRIMARY KEY AUTOINCREMENT, text TEXT NOT NULL)";
    Record.db.run(sql);
  }

  static async all() {
    const records = await Record.select();
    const convertedRecords = records.map((record) =>
      new Record(record.id, record.text).convert(),
    );
    return convertedRecords;
  }

  static select() {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM memos ORDER BY id ASC";
      Record.db.all(sql, function (err, rows) {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  static insert(text) {
    const sql = "INSERT INTO memos(text) VALUES(?)";
    Record.db.run(sql, text);
  }

  static delete(memoId) {
    const sql = "DELETE FROM memos WHERE id = ?";
    Record.db.run(sql, memoId);
  }

  convert() {
    const memo = {
      memoId: this.id,
      name: this.text.split("\n")[0],
      value: this.text,
    };
    return memo;
  }
}
