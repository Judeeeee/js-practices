import { run, all } from "./databaseFunctions.js";
import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");
const display = (rows) => {
  for (const row of rows) {
    console.log(`${row.id} ${row.title}`);
  }
};

await run(db, "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)");
try {
  const { lastID } = await run(db, "INSERT INTO books(title) VALUES(NULL)");
  console.log(`自動採番されたID ${lastID}`);
} catch (err) {
  if (err instanceof Object) {
    console.log(err.message);
  } else {
    throw err;
  }
}
try {
  const rows = await all(db, "SELECT undefined FROM books");
  await display(rows);
} catch (err) {
  if (err instanceof Object) {
    console.log(err.message);
  }
}
await run(db, "DROP TABLE books");
