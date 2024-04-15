#!/usr/bin/env node

import readline from "readline";
import MemosDatabase from "./MemosDatabase.js";
import MemoApp from "./MemoApp.js";

const main = async function () {
  const memosDatabase = new MemosDatabase();
  await memosDatabase.createTable();
  const memos = await memosDatabase.selectAll();
  const memoApp = new MemoApp(memos);
  const option = process.argv[2];

  if (option === undefined) {
    const lines = [];
    const reader = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    reader.on("line", (line) => {
      lines.push(line);
    });

    reader.on("close", async () => {
      await memosDatabase.insert(lines.join("\n"));
    });
  } else if (memos.length !== 0) {
    switch (option) {
      case "-l": {
        const titles = memoApp.createTitles();
        for (const title of titles) {
          console.log(title);
        }
        break;
      }
      case "-r": {
        const request_message = "Choose a memo you want to see";
        try {
          const chosenMemo = await memoApp.choose(request_message);
          console.log(chosenMemo.text);
        } catch {
          return;
        }
        break;
      }
      case "-d": {
        const request_message = "Choose a memo you want to delete";
        try {
          const chosenMemo = await memoApp.choose(request_message);
          await memosDatabase.delete(chosenMemo.id);
        } catch {
          return;
        }
        break;
      }
    }
  }
};

main();
