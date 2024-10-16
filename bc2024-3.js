const fs = require('fs');
const { program } = require("commander");

program
  .option("-i,--input <path>", "Input file path")
  .option("-o,--output <path>", "Output file path")
  .option("-d,--display", "Display minimum asset");
program.parse();

const options = program.opts();

// Перевірка наявності вхідного файлу
if (!options.input) {
  console.error("Please specify an input file.");
  process.exit(1);
}

if (!fs.existsSync(options.input)) {
  console.error("Cannot find input file.");
  process.exit(1);
}

// Зчитування і парсинг вхідного файлу
let data;
try {
  const r_data = fs.readFileSync(options.input, "utf8");
  data = JSON.parse(r_data);
} catch (error) {
  console.error("Error reading or parsing JSON:", error.message);
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

// Формування результату
const result = `${minAsset.txt}: ${minAsset.value}`;

// Виведення або збереження результату
if (options.display) {
  console.log(result);
}

if (options.output) {
  fs.writeFileSync(options.output, result);
  console.log(`Result written to ${options.output}`);
}
