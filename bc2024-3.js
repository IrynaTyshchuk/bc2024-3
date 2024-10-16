const fs = require('fs');
const {program} = require("commander");

program
.option("-i,--input <path>")
.option("-o,--output <path>")
.option("-d,--display")
program.parse();

const options= program.opts();

if (!options.input) {
    console.error("Please, specify input file");
    process.exit(1);
}

if (!fs.existsSync(options.input)) {
    console.error("Cannot find input file");
    process.exit(1);
}

const r_data=fs.readFileSync(options.input, "utf8");
const data = JSON.parse(r_data);
if (options.display){
    console.log(data);
} 
if (options. output){
    fs.writeFileSync(options.output, JSON.stringify(data,null,2));
    console.log("Result written to ${options.output}");
}