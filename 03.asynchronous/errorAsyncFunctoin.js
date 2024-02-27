import { run, all, display } from "./commonQuery.js";
import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

const ErrorAsyncFunction = async function () {
  const createTableQuery =
    "CREATE TABLE IF NOT EXISTS books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)";
  const errorInsertTableQuery = "INSERT INTO books(title) VALUES(NULL)";
  const errorGetRecordsQuery = "SELECT undefined FROM books";
  const dropTableQuery = "DROP TABLE books";

  await run(db, createTableQuery);
  try {
    const { lastID } = await run(db, errorInsertTableQuery);
    console.log(`自動採択されたID ${lastID}`);
  } catch (err) {
    console.error(err);
  }
  try {
    const rows = await all(db, errorGetRecordsQuery);
    await display(rows);
  } catch (err) {
    console.error(err);
  }
  await run(db, dropTableQuery);
};

ErrorAsyncFunction();
