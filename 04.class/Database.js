import sqlite3 from "sqlite3";

export default class Database {
  constructor() {
    this.db = new sqlite3.Database("./memo.db");
  }

  initialize() {
    return new Promise((resolve, reject) => {
      this.db.run(
        "CREATE TABLE IF NOT EXISTS memos(id INTEGER PRIMARY KEY AUTOINCREMENT, text TEXT NOT NULL)",
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        },
      );
    });
  }

  selectAll() {
    return new Promise((resolve, reject) => {
      this.db.all("SELECT * FROM memos ORDER BY id ASC", function (err, rows) {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  insert(text) {
    this.db.run("INSERT INTO memos(text) VALUES(?)", text);
  }

  delete(memoID) {
    this.db.run("DELETE FROM memos WHERE id = ?", memoID);
  }
}
