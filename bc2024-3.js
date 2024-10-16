const fs = require('fs');
const { program } = require("commander");

program
  .option("-i,--input <path>", "Input file path")
  .option("-o,--output <path>", "Output file path")
  .option("-d,--display", "Display minimum asset");
program.parse();

const options = program.opts();

// Перевірка існування файлу
if (!options.input) {
  console.error("Please specify an input file.");
  process.exit(1);
}

if (!fs.existsSync(options.input)) {
  console.error("Cannot find input file.");
  process.exit(1);
}

// Зчитування вхідного файлу
const r_data = fs.readFileSync(options.input, "utf8");

let data;
if (r_data) {
  data = JSON.parse(r_data);
} else {
  console.error("Input file is empty or could not be read.");
  process.exit(1);
}

// Перевірка, чи дані є масивом
if (!Array.isArray(data) || !data.every(item => item.txt && item.value !== undefined)) {
  console.error("Data must be an array of objects with 'txt' and 'value' properties.");
  process.exit(1);
}

// Знаходження активу з мінімальним значенням
const minAsset = data.reduce((past, that) => {
  return (past.value < that.value) ? past : that;
});

// Результат
const res = `${minAsset.txt}: ${minAsset.value}`;

// Виведення або збереження результату
if (options.display) {
  console.log(res);
}

if (options.output) {
  fs.writeFileSync(options.output, res);
  console.log(`Result written to ${options.output}`);
}
