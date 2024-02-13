import minimist from "minimist";
class Calender {
  constructor(argv, today) {
    this.year = argv["y"] || today.getFullYear();
    this.month = argv["m"] || today.getMonth() + 1;
  }

  display() {
    const convertDays = this.createDays();
    console.log(`       ${this.month}月 ${this.year}    `);
    console.log("日 月 火 水 木 金 土");

    for (let i = 0; i <= 5 * 7; i = i + 7) {
      console.log(convertDays.slice(i, i + 7).join(" "));
    }
  }

  createDays() {
    const headBlankCount = new Date(this.year, this.month - 1, 1).getDay();
    const lastDay = new Date(this.year, this.month, 0).getDate();
    const days = [
      ...Array(headBlankCount).fill("  "),
      ...Array.from({ length: lastDay }, (_, index) => index + 1),
    ];
    const convertDays = days.map((x) => x.toString().padStart(2));
    return convertDays;
  }
}

const Main = () => {
  const argv = minimist(process.argv.slice(2));
  delete argv._;

  const today = new Date();
  const calender = new Calender(argv, today);
  calender.display();
};

Main();
