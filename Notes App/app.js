const chalk = require("chalk");
const yargs = require("yargs");
const {
  addNote,
  getNote,
  removeNote,
  listNotes,
  readNote,
} = require("./notes.js");

// custmize version of yaegs
yargs.version("1.1.0");

//create add command
yargs.command({
  command: "add",
  describe: "Add a new note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
    body: {
      describe: "Note body",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    addNote(argv.title, argv.body);
  },
});

//create remove command
yargs.command({
  command: "remove",
  describe: "Remove a note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    removeNote(argv.title);
  },
});

//create read command
yargs.command({
  command: "read",
  describe: "Read a note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    readNote(argv.title);
  },
});

//create list command
yargs.command({
  command: "list",
  describe: "List the notes",
  handler() {
    listNotes();
  },
});

yargs.parse();

//
//
//
//
//
//
//
//
//
//
//
//
//
// console.log(yargs.argv);
// console.log(process.argv);
// const command = process.argv[2];
// if (command === "add") console.log(chalk.green.bold.inverse("Adding Note!"));
// else if (command === "remove")
//   console.log(chalk.red.bold.inverse("Removing Note!"));

// const fs = require("fs");

// fs.writeFileSync("notes.txt", "\nHello I'm Mohamed");

// let conditon = 0;
// while (conditon < 10) {
//   fs.appendFileSync("notes.txt", "\nHello I'm Mohamed");
//   conditon++;
// }

// const utils = require("./utils.js");

// console.log(utils.addFive(50));
// console.log(utils.name);

// const validator = require("validator");
// const chalk = require("chalk");
// const createNote = require("./notes.js");

// console.log(validator.isURL("https://www.npmjs.com/package/validator"));
// console.log(createNote("Hi it's my first Note"));
// console.log(chalk.green.bold.inverse("Success!"));
