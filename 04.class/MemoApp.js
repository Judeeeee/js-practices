import pkg from "enquirer";
const { prompt } = pkg;

export default class MemoApp {
  constructor(memos) {
    this.memos = memos;
  }

  async choose(request_message) {
    // enquireを使ってメモタイトルを表示させるために、
    // convert()で{ name: 'memoTitle', value: 'memoID' }に変換する
    const choices = this.memos.map((memo) => ({
      name: memo.title,
      value: memo.id,
    }));
    const lines = [
      {
        type: "select",
        name: "memo",
        message: `${request_message}`,
        choices: choices,
        result(names) {
          return this.map(names);
        },
      },
    ];
    const chosenline = await prompt(lines);
    const chosenMemoID = Object.values(chosenline.memo)[0];
    const chosenMemo = this.memos.find((memo) => memo.id === chosenMemoID);
    return chosenMemo;
  }

  displayTitles() {
    for (const memo of this.memos) {
      console.log(memo.title);
    }
  }
}
