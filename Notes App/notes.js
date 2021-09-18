const fs = require("fs");
const chalk = require("chalk");

const getNote = () => "Your Note ..";

const addNote = (title, body) => {
  const notes = loadNotes();

  const checkDuplicateNotes = notes.find((note) => note.title === title);

  if (!checkDuplicateNotes) {
    const note = {
      title: title,
      body: body,
      timestamp: new Date().getTime(),
    };

    notes.push(note);

    saveNotes(notes);

    console.log(chalk.green.inverse.bold(`Note added successfully!`));
  } else {
    console.log(chalk.bgRed.bold(`Note title is taken!, title:'${title}'`));
  }
};

const removeNote = (title) => {
  const checkExistNotes = notes.find((note) => note.title === title);

  if (checkExistNotes) {
    const deletedNote = notes.filter((note) => note.title !== title);
    saveNotes(deletedNote);
    console.log(chalk.green.inverse.bold(`Note deleted successfully!`));
  } else {
    console.log(chalk.bgRed.bold(`Note Not Found`));
  }
};

const listNotes = () => {
  const notes = loadNotes();
  console.log("📝", chalk.bgBlue.bold("The Notes: "));
  notes.map((note) => {
    console.log(`\n 👑 ${chalk.green.bold.inverse(` ${note.title} `)}`);
    console.log(`    📜`, chalk.yellow.bold.inverse(note.body));
  });
};

const readNote = (title) => {
  const notes = loadNotes();
  const checkExistNotes = notes.find((note) => note.title === title);
  if (checkExistNotes) {
    console.log("📝", chalk.bgBlue.bold("The Note: "));
    console.log(
      ` 👑 ${chalk.green.bold.inverse(` ${checkExistNotes.title} `)}`
    );
    console.log(`    📜`, chalk.yellow.bold.inverse(checkExistNotes.body));
  } else {
    console.log(chalk.bgRed.bold(`Note Not Found`));
  }
};

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  try {
    fs.writeFileSync("notes.json", dataJSON);
  } catch (error) {
    console.log(error);
  }
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch {
    return [];
  }
};

module.exports = {
  getNote: getNote,
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote,
};
