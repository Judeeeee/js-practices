import enquirer from "enquirer";

export default class MemoSelector {
  constructor(memos) {
    this.memos = memos;
  }

  async choose(requestMessage) {
    const choices = this.memos;
    const question = [
      {
        type: "select",
        name: "memo",
        message: `${requestMessage}`,
        choices,
        result() {
          return this.focused;
        },
      },
    ];
    try {
      const answer = await enquirer.prompt(question);
      return answer.memo;
    } catch (error) {
      process.exit(0);
    }
  }
}
