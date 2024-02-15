import sqlite3 from "sqlite3";
const db = new sqlite3.Database(":test:");

const ErrorCallbackFunction = (db) => {
  createTable(db, () => {
    insertTable(db, () => {
      outputRecord(db, () => {
        dropTable(db);
      });
    });
  });
};

const createTable = (db, func) => {
  const sql =
    "CREATE TABLE IF NOT EXISTS books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE) ";
  db.run(sql, function () {
    func();
  });
};

const insertTable = (db, func) => {
  const sql = "INSERT INTO books(title) VALUES(NULL)";
  db.run(sql, function (err) {
    if (err) {
      console.error(err);
    } else {
      console.log(`自動採択されたID ${this.lastID}`);
      func();
    }
  });
};

const outputRecord = (db, func) => {
  const sql = "SELECT * FROM books";
  db.all(sql, function (err, rows) {
    if (err) {
      console.error(err);
    } else {
      for (const row of rows) {
        console.log(`${row.id} ${row.title}`);
      }
      func();
    }
  });
};

const dropTable = (db) => {
  const sql = "DROP TABLE books";
  db.run(sql);
};

ErrorCallbackFunction(db);
