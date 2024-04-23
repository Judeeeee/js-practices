#!/usr/bin/env node

import readline from "readline";
import MemosDatabase from "./MemosDatabase.js";
import MemoSelector from "./MemoSelector.js";

const main = async function () {
  const memosDatabase = new MemosDatabase();
  await memosDatabase.createTable();
  const memos = await memosDatabase.selectAll();
  const memoSelector = new MemoSelector(memos);
  const option = process.argv[2];

  if (option === "-l") {
    for (const memo of memos) {
      console.log(memo.title);
    }
  } else if (option === "-r") {
    const requestMessage = "Choose a memo you want to see";
    if (memos.length !== 0) {
      const chosenMemo = await memoSelector.choose(requestMessage);
      console.log(chosenMemo.text);
    }
  } else if (option === "-d") {
    const requestMessage = "Choose a memo you want to delete";
    if (memos.length !== 0) {
      const chosenMemo = await memoSelector.choose(requestMessage);
      await memosDatabase.delete(chosenMemo.id);
    }
  } else if (option === undefined) {
    const lines = [];
    const reader = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    reader.on("SIGINT", () => {
      process.exit(0);
    });

    reader.on("line", (line) => {
      lines.push(line);
    });

    reader.on("close", async () => {
      if (lines.includes("") || lines.length === 0) {
        return;
      }
      await memosDatabase.insert(lines.join("\n"));
    });
  }
};

main();
