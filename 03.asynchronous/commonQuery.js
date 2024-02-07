class Table {
    static create = (db) => {
        return new Promise((resolve)=> {
            const sql = "CREATE TABLE IF NOT EXISTS books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)";
            db.run(sql, function(){
                resolve();
            });
        });
    };

    static drop = (db) => {
        const sql = "DROP TABLE books";
        db.run(sql);
    };

    static insert = (db, param) => {
        return new Promise((resolve, reject) => {
            const sql = "INSERT INTO books(title) VALUES(?)";
            db.run(sql, param, function(arg){
                if (arg == null){
                    console.log(`自動採択されたID ${this.lastID}`);
                    return resolve();
                } else {
                    return reject(arg);
                }
            });
        });
    };

    static outputRecord = (db, sql) => {
        return new Promise((resolve, reject) => {
            db.each(sql, function(err, row){
                if (row != undefined) {
                    console.log(`${row.id} ${row.title}`);
                    return resolve();
                }
                else {
                    return reject(err);
                }
            });
        });
    };
};

export default Table;
