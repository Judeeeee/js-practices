import Table from "./commonQuery.js";

const createTableQuery =
  "CREATE TABLE IF NOT EXISTS books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)";
const errorInsertTableQuery = "INSERT INTO books(title) VALUES(NULL)";
const GetRecordsQuery = "SELECT * FROM books";
const dropTableQuery = "DROP TABLE books";

const db = new Table();
db.run(createTableQuery)
  .then(() => db.run(errorInsertTableQuery))
  .then(({ lastID }) => console.log(`自動採択されたID ${lastID}`))
  .then(() => db.all(GetRecordsQuery))
  .then((rows) => db.display(rows))
  .then(() => db.run(dropTableQuery))
  .catch((e) => console.error(e));
