const express = require("express");
const User = require("../models/user");
const router = new express.Router();

router.post("/", async (request, response) => {
  const user = new User(request.body);
  try {
    await user.save();
    response.json(user);
  } catch (error) {
    response.status(400).json(error);
  }
});

router.get("/", async (request, response) => {
  try {
    const user = await User.find({});
    response.status(200).send(user);
  } catch (error) {
    response.status(500).send(error);
  }
});

router.get("/:id", async (request, response) => {
  try {
    const user = await User.findById(request.params.id);
    if (!user) return response.status(404).send("Not Found");
    response.json(user);
  } catch (error) {
    response.status(400).json(error);
  }
});

router.patch("/:id", async (request, response) => {
  const updates = Object.keys(request.body);
  const allowedUpdates = ["name", "email", "password", "age"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation || updates.length === 0)
    return response.status(400).send("Invalid updates!");
  try {
    const user = await User.findByIdAndUpdate(request.params.id, request.body, {
      new: true,
      runValidators: true,
    });
    if (!user) return response.status(404).send("Not Found");
    response.json(user);
  } catch (error) {
    response.status(400).json(error);
  }
});

router.delete("/:id", async (request, response) => {
  try {
    const user = await User.findByIdAndDelete(request.params.id);
    if (!user) return response.status(404).send("Not Found");
    response.json(user);
  } catch (error) {
    response.status(400).json(error);
  }
});

module.exports = router;
