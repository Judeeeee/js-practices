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
        message: `${requestMessage}`,
        choices: this.memos,
        result() {
          return this.focused;
        },
      },
    ];
    try {
      const answer = await enquirer.prompt(question);
      return answer.memo;
    } catch (error) {
      if (error === "") {
        process.exit(0);
      } else {
        throw new Error("An unexpected error has occurred");
      }
    }
  }
}
