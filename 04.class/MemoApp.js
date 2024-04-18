import enquirer from "enquirer";

export default class MemoApp {
  constructor(memos) {
    this.memos = memos;
  }

  async choose(request_message) {
    // enquireを使ってメモタイトルを表示させるために、
    // convert()で{ name: 'memoTitle', id: 'memoID' }に変換する
    const choices = this.memos.map((memo) => ({
      name: memo.title,
      id: memo.id,
    }));
    const question = [
      {
        type: "select",
        name: "memo",
        message: `${request_message}`,
        choices,
        result() {
          return this.focused;
        },
      },
    ];
    const answer = await enquirer.prompt(question);
    const chosenMemo = this.memos.find((memo) => memo.id === answer.memo.id);
    return chosenMemo;
  }
}
