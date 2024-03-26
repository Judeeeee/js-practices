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

  async choose() {
    const memoList = MemoApp.memoList(this.memos);
    const chosenRecord = await prompt(memoList);
    const chosenMemo = this.memos.find(
      (memo) => memo.name === chosenRecord.firstLine,
    );

    return chosenMemo;
  }

  static memoList(memos) {
    const list = [
      {
        type: "select",
        name: "firstLine",
        value: "value",
        message: "Choose a note you want to seae:",
        choices: memos,
      },
    ];
    return list;
  }
}

export default MemoApp;
