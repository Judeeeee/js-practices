import sqlite3 from "sqlite3";

const noErrorCallbackFunction = () => {
  const db = new sqlite3.Database(":memory:");
  db.run("CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)", () => {
    db.run("INSERT INTO books(title) VALUES('OK')", function () {
      console.log(`自動採択されたID ${this.lastID}`);
      db.all("SELECT * FROM books", function (err, rows) {
        for (const row of rows) {
          console.log(`${row.id} ${row.title}`);
        }
        db.run("DROP TABLE books");
      });
    });
  });
};

noErrorCallbackFunction();
