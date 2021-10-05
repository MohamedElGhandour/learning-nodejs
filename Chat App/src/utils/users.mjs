const users = [];

// addUser, removeUser, getUser, getUsersInRoom

const addUser = ({ id, username, room }) => {
  // Clean the data
  username = username.trim().toLowerCase();
  room = room.trim().toLowerCase();

  // Validate the data
  if (!username || !room)
    return {
      error: "USERNAME and ROOM are required!",
    };

  //check for existing user
  const existingUser = users.find(
    (user) => user.room === room && user.username === username
  );

  if (existingUser)
    return {
      error: "USERNAME is in use!",
    };

  const user = { id, username, room };
  users.push(user);
  return { user };
};

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) return users.splice(index, 1)[0];
};

const getUser = (id) => users.find((user) => user.id === id);

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

export { addUser, getUser, getUsersInRoom, removeUser };

// addUser({ id: 22, username: "ahmed", room: "code" });
// addUser({ id: 252, username: "ahmed x", room: "code" });
// addUser({ id: 2552, username: "ahmed x", room: "codex" });
// addUser({ id: 25752, username: "ahmed", room: "codex" });

// const removed = removeUser(22);
// console.log(removed);

// const search = getUser(22);
// console.log(search);

// const code = getUsersInRoom("code");
// console.log(code);

// console.log(users);
