import Table from "./commonQuery.js";
import sqlite3 from 'sqlite3';
const db = new sqlite3.Database(':test:');

const bookTitle = null;
const selectQuery = "SELECT undefined FROM books";

const ErrorAsyncFunction = async function(db){
        await Table.create(db);
        try {
            await Table.insert(db,bookTitle);
        } catch(err) {
            console.error(err);
        }
        try {
            await Table.outputRecord(db,selectQuery);
        } catch(err) {
            console.error(err);
        }
        await Table.drop(db);
};

ErrorAsyncFunction(db);
