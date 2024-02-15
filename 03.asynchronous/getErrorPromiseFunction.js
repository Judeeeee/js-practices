import Table from "./commonQuery.js";

const createTableQuery =
  "CREATE TABLE IF NOT EXISTS books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)";
const insertTableQuery = "INSERT INTO books(title) VALUES('OK')";
const errorGetRecordsQuery = "SELECT undefined FROM books";
const dropTableQuery = "DROP TABLE books";

const db = new Table();
db.run(createTableQuery)
  .then(() => db.run(insertTableQuery))
  .then(({ lastID }) => console.log(`自動採択されたID ${lastID}`))
  .then(() => db.all(errorGetRecordsQuery))
  .then((rows) => db.display(rows))
  .then(() => db.run(dropTableQuery))
  .catch((e) => console.error(e));
