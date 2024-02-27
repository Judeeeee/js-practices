import { run, all, display } from "./commonQuery.js";
import sqlite3 from "sqlite3";

const noErrorAsyncFunction = async function () {
  const db = new sqlite3.Database(":memory:");
  const createTableQuery =
    "CREATE TABLE IF NOT EXISTS books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)";
  const insertTableQuery = "INSERT INTO books(title) VALUES('OK')";
  const getRecordsQuery = "SELECT * FROM books";
  const dropTableQuery = "DROP TABLE books";

  await run(db, createTableQuery);
  const { lastID } = await run(db, insertTableQuery);
  console.log(`自動採択されたID ${lastID}`);
  const rows = await all(db, getRecordsQuery);
  await display(rows);
  await run(db, dropTableQuery);
};

noErrorAsyncFunction();
