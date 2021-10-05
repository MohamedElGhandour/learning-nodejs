require("../src/db/mongoose");
const User = require("../src/models/user");

// User.findByIdAndUpdate("614ddd9ec9c8ad0d6bce2a47", { age: 1 })
//   .then((user) => {
//     console.log(user);
//     return User.countDocuments({ age: 1 });
//   })
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((e) => {
//     console.log(e);
//   });

const updateAgeAndCount = async (id, age) => {
  const user = await User.findByIdAndUpdate(id, {
    age,
  });
  const count = await User.countDocuments({ age });
  return { user, count };
};

updateAgeAndCount("614ddd9ec9c8ad0d6bce2a47", 2)
  .then((data) => console.log(data))
  .catch((e) => console.log(e));
