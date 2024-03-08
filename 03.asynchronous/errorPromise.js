import sqlite3 from "sqlite3";
import { run, all } from "./databaseFunctions.js";

const db = new sqlite3.Database(":memory:");

run(db, "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)")
  .then(() => run(db, "INSERT INTO books(title) VALUES(NULL)"))
  .then((lastID) => { console.log(`自動採番されたID ${lastID}`);})
  .catch((err) => {console.log(err.message);})
  .then(() => { return all(db, "SELECT undefined FROM books");})
  .then(
    (rows) => {
      for (const row of rows) {
        console.log(`${row.id} ${row.title}`);
      }
    }
  )
  .catch((err) => {console.log(err.message);})
  .then(() => run(db, "DROP TABLE books"));
