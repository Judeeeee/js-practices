import { run, all } from "./commonQuery.js";
import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

const createTableQuery =
  "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)";
const insertTableQuery = "INSERT INTO books(title) VALUES('吾輩は猫である')";
const getRecordsQuery = "SELECT * FROM books";
const dropTableQuery = "DROP TABLE books";
const display = (rows) => {
  for (const row of rows) {
    console.log(`${row.id} ${row.title}`);
  }
};

run(db, createTableQuery)
  .then(() => run(db, insertTableQuery))
  .then(({ lastID }) => {
      console.log(`自動採番されたID ${lastID}`)
      return all(db, getRecordsQuery)
  })
  .then((rows) => display(rows))
  .then(() => run(db, dropTableQuery))
