#!/usr/bin/env node

import Database from "./DataBase.js";
import Memo from "./Memo.js";
import MemoApp from "./MemoApp.js";

const main = async function () {
  const database = new Database();
  await database.initialize();
  const records = await database.selectAll();
  const memos = records.map((record) => new Memo(record.id, record.text));
  const memoapp = new MemoApp(memos);
  const args = process.argv.slice(2);

  if (args.length > 0) {
    switch (args[0]) {
      case "-l": {
        memoapp.firstLines();
        break;
      }
      case "-r": {
        const chosenMemo = await memoapp.choose();
        console.log(chosenMemo.text());
        break;
      }
      case "-d": {
        const chosenMemo = await memoapp.choose();
        const memoId = chosenMemo.memoId;
        Record.delete(memoId);
        break;
      }
    }
  } else {
    process.stdin.on("data", (data) => {
      const text = data.toString().trim();
      Record.insert(text);
    });
  }
};

main();
