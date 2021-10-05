require("../src/db/mongoose");

const Task = require("../src/models/task");

// Task.findByIdAndRemove("614dc27d5d1bf10e759d7102")
//   .then((user) => {
//     console.log(user);
//     return Task.countDocuments({ completed: false });
//   })
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((e) => {
//     console.log(e);
//   });

const removeTaskAndCountUncompleted = async (id) => {
  const task = await Task.findByIdAndRemove(id);
  const count = await Task.countDocuments({ completed: false });
  return { task, count };
};

removeTaskAndCountUncompleted("614ddeb288d7fb5611d864eb")
  .then((data) => console.log(data))
  .catch((e) => console.log(e));
