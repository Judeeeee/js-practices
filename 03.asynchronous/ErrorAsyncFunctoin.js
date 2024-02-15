import Table from "./commonQuery.js";

const ErrorAsyncFunction = async function () {
  const createTableQuery =
    "CREATE TABLE IF NOT EXISTS books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)";
  const errorInsertTableQuery = "INSERT INTO books(title) VALUES(NULL)";
  const errorGetRecordsQuery = "SELECT undefined FROM books";
  const dropTableQuery = "DROP TABLE books";

  const db = new Table();
  await db.run(createTableQuery);
  try {
    const { lastID } = await db.run(errorInsertTableQuery);
    console.log(`自動採択されたID ${lastID}`);
  } catch (err) {
    console.error(err);
  }
  try {
    const rows = await db.all(errorGetRecordsQuery);
    await db.display(rows);
  } catch (err) {
    console.error(err);
  }
  await db.run(dropTableQuery);
};

ErrorAsyncFunction();
