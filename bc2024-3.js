const fs = require('fs');
const { program } = require("commander");

program
  .option("-i,--input <path>")
  .option("-o,--output <path>")
  .option("-d,--display");
program.parse();

const options = program.opts();

if (!options.input) {
  console.error("Please, specify input file");
  process.exit(1);
}

if (!fs.existsSync(options.input)) {
  console.error("Cannot find input file");
  process.exit(1);
}

// Read and parse the input file
const r_data = fs.readFileSync(options.input, "utf8");
let data;

try {
  data = JSON.parse(r_data);
} catch (error) {
  console.error("Error parsing JSON:", error.message);
  process.exit(1);
}

if (data && Array.isArray(data)) {
  const min = data.reduce((past, that) => {
    return (past.value < that.value) ? past : that;
  });

  const res = `Minimum value: ${min.value}`;

  if (options.display) {
    console.log(res);
  }

  if (options.output) {
    fs.writeFileSync(options.output, res);
    console.log(`Result written to ${options.output}`);
  }
} else {
  console.error("Data is not an array or is undefined.");
  process.exit(1);
}
