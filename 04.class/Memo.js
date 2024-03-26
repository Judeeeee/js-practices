export default class Memo {
  constructor(convertedRecord) {
    this.memoId = convertedRecord.memoId;
    this.name = convertedRecord.name;
    this.value = convertedRecord.value;
  }

  firstLine() {
    return this.name;
  }

  text() {
    return this.value;
  }
}
