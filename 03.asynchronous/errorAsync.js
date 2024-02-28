import { run, all } from "./databaseFunctions.js";
import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");
const createTableQuery =
  "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)";
const errorInsertTableQuery = "INSERT INTO books(title) VALUES(NULL)";
const errorGetRecordsQuery = "SELECT undefined FROM books";
const dropTableQuery = "DROP TABLE books";
const display = (rows) => {
  for (const row of rows) {
    console.log(`${row.id} ${row.title}`);
  }
};

await run(db, createTableQuery);
try {
  const { lastID } = await run(db, errorInsertTableQuery);
  console.log(`自動採番されたID ${lastID}`);
} catch (err) {
  if (err instanceof Object) {
    console.log(err.message);
  } else {
    throw err;
  }
}
try {
  const rows = await all(db, errorGetRecordsQuery);
  await display(rows);
} catch (err) {
  if (err instanceof Object) {
    console.log(err.message);
  }
}
await run(db, dropTableQuery);
