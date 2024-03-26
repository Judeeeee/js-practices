#!/usr/bin/env node

import MemoApp from "./MemoApp.js";
import Memo from "./Memo.js";
import Record from "./Record.js";
import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./memo.db");

const Main = async function () {
  await Record.createTable(db);
  const convertedRecords = await Record.all(db);
  const memos = convertedRecords.map(
    (convertedRecord) => new Memo(convertedRecord),
  );
  const memoapp = new MemoApp(memos);
  const args = process.argv.slice(2);

  if (args.length > 0) {
    const arg = args[0];

    switch (arg) {
      case "-l": {
        memoapp.firstLines();
        break;
      }
      case "-r": {
        let choicedMemo = await memoapp.choise();
        console.log(choicedMemo.text());
        break;
      }
      case "-d": {
        let choicedMemo = await memoapp.choise();
        const memoId = choicedMemo.memoId;
        Record.delete(db, memoId);
        break;
      }
    }
  } else {
    await process.stdin.on("data", (data) => {
      const text = data.toString().trim();
      Record.insert(db, text);
    });
  }
};

Main();