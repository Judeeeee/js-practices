export default class Memo {
  constructor(id, text) {
    this.id = id;
    this.text = text;
    this.title = this.text.match(/^[^\n]+/m)[0];
  }

  //enquireを使ってメモタイトルを表示させるために、
  //convert()で{ name: 'memoTitle', value: 'memoID' }に変換する
  convert() {
    return { name: this.title, value: this.id };
  }
}
