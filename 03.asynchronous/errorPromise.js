import { run, all } from "./databaseFunctions.js";
import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");
const display = (rows) => {
  for (const row of rows) {
    console.log(`${row.id} ${row.title}`);
  }
};

run(db, "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)")
  .then(() => run(db, "INSERT INTO books(title) VALUES(NULL)"))
  .then(
    (lastID) => {
      console.log(`自動採番されたID ${lastID}`);
    },
    (err) => {
      console.log(err.message);
    },
  )
  .then(
    () => {
      return all(db, "SELECT undefined FROM books");
    },
    (err) => {
      return err;
    },
  )
  .then(
    (rows) => {
      display(rows);
    },
    (err) => {
      console.log(err.message);
    },
  )
  .then(() => run(db, "DROP TABLE books"));
