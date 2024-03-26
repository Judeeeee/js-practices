#!/usr/bin/env node

import sqlite3 from "sqlite3";
import MemoApp from "./MemoApp.js";
import Memo from "./Memo.js";
import Record from "./Record.js";

const db = new sqlite3.Database("./memo.db");

const main = async function () {
  await Record.createTable(db);
  const convertedRecords = await Record.all(db);
  const memos = convertedRecords.map(
    (convertedRecord) => new Memo(convertedRecord),
  );
  const memoapp = new MemoApp(memos);
  const args = process.argv.slice(2);

  if (args.length > 0) {
    switch (args[0]) {
      case "-l": {
        memoapp.firstLines();
        break;
      }
      case "-r": {
        let chosenMemo = await memoapp.choise();
        console.log(chosenMemo.text());
        break;
      }
      case "-d": {
        let chosenMemo = await memoapp.choise();
        const memoId = chosenMemo.memoId;
        Record.delete(db, memoId);
        break;
      }
    }
  } else {
    process.stdin.on("data", (data) => {
      const text = data.toString().trim();
      Record.insert(db, text);
    });
  }
};

main();
