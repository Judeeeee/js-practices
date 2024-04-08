#!/usr/bin/env node

import readline from "readline";
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

  if (args && records.length) {
    switch (args[0]) {
      case "-l": {
        memoapp.firstLines();
        break;
      }
      case "-r": {
        const chosenMemo = await memoapp.choose();
        console.log(chosenMemo.text);
        break;
      }
      case "-d": {
        const chosenMemo = await memoapp.choose();
        database.delete(chosenMemo.id);
      }
    }
  }

  if (args.length == 0) {
    const lines = [];
    const reader = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    reader.on("line", (line) => {
      lines.push(line);
    });

    reader.on("close", () => {
      database.insert(lines.join("\n"));
    });
  }
};

main();
