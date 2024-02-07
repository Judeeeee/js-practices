import pkg from "enquirer";
const { prompt } = pkg;

class MemoApp {
  constructor(memos) {
    this.memos = memos;
  }

  async firstLines() {
    for (let memo of this.memos) {
      console.log(memo.firstLine());
    }
  }

  async choise() {
    const memoList = MemoApp.memoList(this.memos);
    const choicedRecord = await prompt(memoList);
    const choicedMemo = this.memos.find(
      (memo) => memo.name === choicedRecord.firstLine,
    );

    return choicedMemo;
  }

  static memoList(memos) {
    const list = [
      {
        type: "select",
        name: "firstLine",
        value: "value",
        message: "Choose a note you want to see:",
        initial: 1,
        choices: memos,
      },
    ];
    return list;
  }
}

export default MemoApp;
