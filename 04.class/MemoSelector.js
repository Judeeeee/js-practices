import enquirer from "enquirer";

export default class MemoSelector {
  constructor(memos) {
    this.memos = memos;
  }

  async choose(requestMessage) {
    const question = [
      {
        type: "select",
        name: "memo",
        message: requestMessage,
        choices: this.memos,
        result() {
          return this.focused;
        },
      },
    ];
    const answer = await enquirer.prompt(question);
    return answer.memo;
  }
}
