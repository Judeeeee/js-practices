const run = (db, sql) => {
  return new Promise((resolve, reject) => {
    db.run(sql, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({ lastID: this.lastID });
      }
    });
  });
};

const all = (db, sql) => {
  return new Promise((resolve, reject) => {
    db.all(sql, function (err, rows) {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

const display = (rows) => {
  return new Promise((resolve, reject) => {
    if (rows == undefined) {
      reject();
    } else {
      for (const row of rows) {
        console.log(`${row.id} ${row.title}`);
      }
      resolve();
    }
  });
};

export {run, all, display};
