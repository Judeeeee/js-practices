import { run, all } from "./commonQuery.js";
import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

const createTableQuery =
  "CREATE TABLE IF NOT EXISTS books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)";
const errorInsertTableQuery = "INSERT INTO books(title) VALUES(NULL)";
const errorGetRecordsQuery = "SELECT undefined FROM books";
const dropTableQuery = "DROP TABLE books";

const display = (rows) => {
  for (const row of rows) {
    console.log(`${row.id} ${row.title}`);
  }
};

run(db, createTableQuery)
  .then(() => run(db, errorInsertTableQuery))
  .catch((err) => { console.log(err.message); })
  .then(({ lastID }) => {
    console.log(`自動採番されたID ${lastID}`)
    return all(db, errorGetRecordsQuery)
  })
  .then((rows) => display(rows))
  .catch((err) => { console.log(err.message); })
  .then(() => run(db, dropTableQuery))
