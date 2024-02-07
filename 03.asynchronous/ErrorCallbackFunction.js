import sqlite3 from 'sqlite3';
const db = new sqlite3.Database(':test:');

const ErrorCallbackFunction = (db) => {
    createTable(db, () => {
        insertTable(db, () => {
            outputRecord(db, () => {
                dropTable(db);
            });
        });
    });
};

const createTable = (db, func) => {
    const sql = "CREATE TABLE IF NOT EXISTS books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE) ";
    db.run(sql, function(){
        func();
    });
};

const insertTable = (db, func) => {
    try {
        const sql = "INSERT INTO books(title) VALUES(?)";
        const bookTitle = null;
        db.run(sql, bookTitle, function(){
        console.log(`自動採択されたID ${this.lastID}`);
        func();
        });
    } catch (error) {
        console.error(error);
    }
};

const outputRecord = (db, func) => {
    const sql = "SELECT undefined FROM books";
    db.each(sql, function(error,row){
        try {
            console.log(`${row.id} ${row.title}`);
            func();
        } catch (error) {
            console.error(error);
        }
    });
};

const dropTable = (db) => {
    const sql = "DROP TABLE books";
    db.run(sql);
};

ErrorCallbackFunction(db);
