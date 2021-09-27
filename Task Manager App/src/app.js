require("./db/mongoose");
const express = require("express");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");
const authMiddleware = require("./middleware/auth");
//
const app = express();
const bodyParser = express.json;
const port = process.env.PORT || 4000;

app.use(bodyParser());
// app.use(authMiddleware);
app.use("/users", userRouter);
app.use("/tasks", taskRouter);

app.listen(port, () => {
  console.log(`Server is up on ${port}`);
});

// const Task = require("./models/task");
// const User = require("./models/user");

// (async () => {
//   const task = await Task.findById("6152351f93784d4290a4daeb").populate(
//     "owner"
//   );
//   await task.populate("owner").execPopulate(); // Not Supported Anymore Removed `execPopulate()`
//   console.log(task);
//   const user = await User.findById("6152351793784d4290a4dae5").populate(
//     "tasks"
//   );
//   console.log(user.tasks);
// })();

// const jwt = require("jsonwebtoken");

// const tokens = async () => {
//   const token = jwt.sign({ _id: "abc123" }, "B7bkWallahy", {
//     expiresIn: "0 seconds",
//   });
//   console.log(token);
//   try {
//     const data = jwt.verify(token, "B7bkWallahy");
//     console.log(data);
//   } catch (error) {
//     console.log(error);
//   }
// };

// tokens();

// const bcrypt = require("bcrypt");

// const encryption = async () => {
//   const password = "test123456";
//   const hashPassword = await bcrypt.hash(password, 8);
//   const hashPassword2 = await bcrypt.hash(password, 8);
//   console.log(password);
//   console.log(hashPassword);
//   console.log(hashPassword2);
//   const isMatch = await bcrypt.compare(password, hashPassword);
//   const isMatch2 = await bcrypt.compare(password, hashPassword2);
//   console.log(isMatch);
//   console.log(isMatch2);
// };

// encryption();

// app.get("/users", (request, response) => {
//   User.find({})
//     .then((data) => {
//       response.json(data);
//     })
//     .catch((error) => {
//       response.status(400).json(error);
//     });
// });

// app.post("/users", (request, response) => {
//   const user = new User(request.body);
//   user
//     .save()
//     .then((data) => {
//       response.json(data);
//     })
//     .catch((error) => {
//       response.status(400).json(error);
//     });
// });

// app.get("/users/:id", (request, response) => {
//   User.findById(request.params.id)
//     .then((data) => {
//       if (!data) return response.status(404).send("Not Found");
//       response.json(data);
//     })
//     .catch((error) => {
//       response.status(400).json(error);
//     });
// });

// app.post("/tasks", (request, response) => {
//   const task = new Task(request.body);
//   task
//     .save()
//     .then((data) => {
//       response.json(data);
//     })
//     .catch((error) => {
//       response.status(400).json(error);
//     });
// });

// app.get("/tasks", (request, response) => {
//   Task.find({})
//     .then((data) => {
//       response.json(data);
//     })
//     .catch((error) => {
//       response.status(400).json(error);
//     });
// });

// app.get("/tasks/:id", (request, response) => {
//   Task.findById(request.params.id)
//     .then((data) => {
//       if (!data) return response.status(404).send("Not Found");
//       response.json(data);
//     })
//     .catch((error) => {
//       response.status(400).json(error);
//     });
// });

// app.use((request, response, next) => {
//   if (request.method === "GET") {
//     response.send("GET Request is disabled");
//   } else {
//     next();
//   }
// });
// app.use((request, response, next) => {
//   response.status(503).send("Server under Maintaince");
// });
