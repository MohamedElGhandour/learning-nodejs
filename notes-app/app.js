const chalk = require("chalk");
const valdiator = require("validator");
const getNotes = require('./notes');
const yargs = require('yargs');

const note = getNotes();

// console.log(note);
// console.log('Email ', valdiator.isEmail('elghandour@gexample.com'));
// console.log('URL ', valdiator.isURL('mohamedelghandour.io'));
// console.log(chalk.green('success!'));
// console.log(chalk.bold.bgRed('wraning text!'));
// console.log(chalk.bold.blue.inverse('test nodeom npm pakage'));

console.log(process.argv);
console.log(yargs.argv);