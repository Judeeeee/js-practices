import sqlite3 from "sqlite3";
const db = new sqlite3.Database(":memory:");

const ErrorCallbackFunction = (db) => {
  const createTableQuery =
    "CREATE TABLE IF NOT EXISTS books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)";
  db.run(createTableQuery, () => {
    const insertQuery = "INSERT INTO books(title) VALUES(NULL)";
    db.run(insertQuery, function (err) {
      if (err) {
        console.error(err);
      } else {
        console.log(`自動採択されたID ${this.lastID}`);
        const selectRecordsQuery = "SELECT undefined FROM books";
        db.all(selectRecordsQuery, function (err, rows) {
          if (err) {
            console.error(err);
          } else {
            for (const row of rows) {
              console.log(`${row.id} ${row.title}`);
            }
            const dropQuery = "DROP TABLE books";
            db.run(dropQuery);
          }
        });
      }
    });
  });
};

ErrorCallbackFunction(db);
