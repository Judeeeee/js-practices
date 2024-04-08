export default class Memo {
  constructor(id, text) {
    this.id = id;
    this.text = text;
  }

  title() {
    return this.text.match(/^[^\n]+/m)[0];
  }

  text() {
    return this.value;
  }
}
