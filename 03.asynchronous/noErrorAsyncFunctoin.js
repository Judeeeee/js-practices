import Table from "./commonQuery.js";

const noErrorAsyncFunction = async function () {
  const createTableQuery =
    "CREATE TABLE IF NOT EXISTS books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)";
  const insertTableQuery = "INSERT INTO books(title) VALUES('OK')";
  const getRecordsQuery = "SELECT * FROM books";
  const dropTableQuery = "DROP TABLE books";

  const db = new Table();
  await db.run(createTableQuery);
  const { lastID } = await db.run(insertTableQuery);
  console.log(`自動採択されたID ${lastID}`);
  const rows = await db.all(getRecordsQuery);
  await db.display(rows);
  await db.run(dropTableQuery);
};

noErrorAsyncFunction();
