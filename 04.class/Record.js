import sqlite3 from "sqlite3";

export default class Record {
  static db = new sqlite3.Database("./memo.db");
  constructor(id, text) {
    this.id = id;
    this.text = text;
  }

  static initialize() {
    return new Promise((resolve, reject) => {
      Record.db.run(
        "CREATE TABLE IF NOT EXISTS memos(id INTEGER PRIMARY KEY AUTOINCREMENT, text TEXT NOT NULL)",
        function () {
          Record.db.all(
            "SELECT * FROM memos ORDER BY id ASC",
            function (err, rows) {
              if (err) {
                reject(err);
              } else {
                const records = rows.map((row) =>
                  new Record(row.id, row.text).convert(),
                );
                resolve(records);
              }
            },
          );
        },
      );
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
