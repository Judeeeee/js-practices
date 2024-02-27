import { run, all, display } from "./commonQuery.js";
import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

const createTableQuery =
  "CREATE TABLE IF NOT EXISTS books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)";
const errorInsertTableQuery = "INSERT INTO books(title) VALUES(NULL)";
const errorGetRecordsQuery = "SELECT undefined FROM books";
const dropTableQuery = "DROP TABLE books";

run(db, createTableQuery)
  .then(() => run(db, errorInsertTableQuery))
  .then(({ lastID }) => console.log(`自動採択されたID ${lastID}`))
  .then(() => all(db, errorGetRecordsQuery))
  .then((rows) => display(rows))
  .then(() => run(db, dropTableQuery))
  .catch((e) => console.error(e));
