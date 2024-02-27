import sqlite3 from "sqlite3";



const ErrorCallbackFunction = () => {
  const db = new sqlite3.Database(":memory:");
  db.run("CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)", () => {
    db.run("INSERT INTO books(title) VALUES(NULL)", function (err) {
      if (err) {
        console.error(err);
      } else {
        console.log(`自動採番されたID ${this.lastID}`);
        db.all("SELECT undefined FROM books", function (err, rows) {
          if (err) {
            console.error(err);
          } else {
            for (const row of rows) {
              console.log(`${row.id} ${row.title}`);
            }
            db.run("DROP TABLE books");
          }
        });
      }
    });
  });
};

ErrorCallbackFunction();
