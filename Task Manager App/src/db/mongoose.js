const { model, connect } = require("mongoose");
const databaseName = "task-manager-api";
const connectionURL = `mongodb://127.0.0.1:27017/${databaseName}`;

connect(connectionURL, {
  useNewUrlParser: true,
  // useFindAndModify: true, // not supported any more
  //   useCreateIndex: true, // not supported any more
});

// const User = model("User", {
//   name: {
//     type: String,
//     required: true,
//     trim: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     trim: true,
//     lowercase: true,
//     validate(value) {
//       if (!validator.isEmail(value)) {
//         throw new Error("Email is invalid");
//       }
//     },
//   },
//   password: {
//     type: String,
//     trim: true,
//     minLength: 7,
//     required: true,
//     validate(value) {
//       if (value.toLowerCase().includes("password"))
//         throw new Error("Dont use 'Password' as ur password idiot");
//     },
//   },
//   age: {
//     type: Number,
//     default: 0,
//     validate(value) {
//       if (value < 0) throw new Error("Age must be a positive");
//     },
//   },
// });

// const me = new User({
//   name: "Mohamed Elghandour",
//   email: "test@test.test",
//   age: 21,
//   password: "etsttestest",
// });

// me.save()
//   .then(() => {
//     console.log(me);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// const myTask = new Task({
//   description: "Learn React Redux",
//   completed: true,
// });

// myTask
//   .save()
//   .then(() => {
//     console.log(myTask);
//   })
//   .catch((error) => {
//     console.log(error);
//   });
