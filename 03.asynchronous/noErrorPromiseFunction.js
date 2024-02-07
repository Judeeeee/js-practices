import Table from "./commonQuery.js";
import sqlite3 from "sqlite3";
const db = new sqlite3.Database(":test:");

const bookTitle = "bookTitleTest";
const selectQuery = "SELECT * FROM books";

Table.create(db)
  .then(() => Table.insert(db, bookTitle))
  .then(() => Table.outputRecord(db, selectQuery))
  .then(() => Table.drop(db));
