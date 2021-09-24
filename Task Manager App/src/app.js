require("./db/mongoose");
const express = require("express");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");
//
const app = express();
const bodyParser = express.json;
const port = process.env.PORT || 4000;

app.use(bodyParser());

app.use("/users", userRouter);
app.use("/tasks", taskRouter);

app.listen(port, () => {
  console.log(`Server is up on ${port}`);
});

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
