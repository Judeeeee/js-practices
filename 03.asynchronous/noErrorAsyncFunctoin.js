import Table from "./commonQuery.js";
import sqlite3 from 'sqlite3';
const db = new sqlite3.Database(':test:');

const bookTitle = "bookTitleTest";
const selectQuery = "SELECT * FROM books";

const noErrorAsyncFunction = async function(db){
    await Table.create(db);
    await Table.insert(db,bookTitle);
    await Table.outputRecord(db,selectQuery);
    await Table.drop(db);
};

noErrorAsyncFunction(db);
