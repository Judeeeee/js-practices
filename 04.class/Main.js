#!/usr/bin/env node

import MemoApp from "./MemoApp.js";
import Memo from "./Memo.js";
import Record from "./Record.js";

const main = async function () {
  await Record.createTable();
  const convertedRecords = await Record.all();
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
        let chosenMemo = await memoapp.choose();
        console.log(chosenMemo.text());
        break;
      }
      case "-d": {
        let chosenMemo = await memoapp.choose();
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
