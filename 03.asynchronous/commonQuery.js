import sqlite3 from "sqlite3";

class Table {
  constructor() {
    this.db = new sqlite3.Database(":test:");
  }

  run = (sql) => {
    return new Promise((resolve, reject) => {
      this.db.run(sql, function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({ lastID: this.lastID });
        }
      });
    });
  };

  all = (sql) => {
    return new Promise((resolve, reject) => {
      this.db.all(sql, function (err, rows) {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  };

  display = (rows) => {
    return new Promise((resolve, reject) => {
      if (rows == undefined) {
        reject();
      } else {
        for (const row of rows) {
          console.log(`${row.id} ${row.title}`);
        }
        resolve();
      }
    });
  };
}

export default Table;
