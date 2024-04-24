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
      try {
        const chosenMemo = await memoSelector.choose(requestMessage);
        console.log(chosenMemo.text);
      } catch (error) {
        if (error === "") {
          process.exit(1);
        } else {
          throw new Error("An unexpected error has occurred");
        }
      }
    }
  } else if (option === "-d") {
    const requestMessage = "Choose a memo you want to delete";
    if (memos.length !== 0) {
      try {
        const chosenMemo = await memoSelector.choose(requestMessage);
        await memosDatabase.delete(chosenMemo.id);
      } catch (error) {
        if (error === "") {
          process.exit(1);
        } else {
          throw new Error("An unexpected error has occurred");
        }
      }
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
      if (lines.every((line) => line === "")) {
        return;
      }
      await memosDatabase.insert(lines.join("\n"));
    });
  }
};

main();
