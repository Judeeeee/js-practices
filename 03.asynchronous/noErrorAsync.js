import sqlite3 from "sqlite3";
import { run, all } from "./databaseFunctions.js";

const db = new sqlite3.Database(":memory:");

await run(
  db,
  "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
);
const { lastID } = await run(
  db,
  "INSERT INTO books(title) VALUES('吾輩は猫である')",
);
console.log(`自動採番されたID ${lastID}`);
const rows = await all(db, "SELECT * FROM books");
for (const row of rows) {
  console.log(`${row.id} ${row.title}`);
}
await run(db, "DROP TABLE books");
