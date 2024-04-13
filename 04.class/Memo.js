export default class Memo {
  constructor(id, text) {
    this.id = id;
    this.text = text;
    this.title = this.text.split("\n")[0];
  }
}
