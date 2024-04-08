import sqlite3 from "sqlite3";

export default class Database {
  static db = new sqlite3.Database("./memo.db");

  initialize() {
    return new Promise((resolve, reject) => {
      Database.db.run(
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
      Database.db.all(
        "SELECT * FROM memos ORDER BY id ASC",
        function (err, rows) {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        },
      );
    });
  }

  insert(text) {
    Database.db.run("INSERT INTO memos(text) VALUES(?)", text);
  }

  delete(memoID) {
    Database.db.run("DELETE FROM memos WHERE id = ?", memoID);
  }
}
