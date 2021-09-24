const express = require("express");
const Task = require("../models/task");
const router = new express.Router();

router.post("/", async (request, response) => {
  const task = new Task(request.body);
  try {
    await task.save();
    response.json(task);
  } catch (error) {
    response.status(400).json(error);
  }
});

router.get("/", async (request, response) => {
  try {
    const task = await Task.find({});
    response.json(task);
  } catch (error) {
    response.status(400).json(error);
  }
});

router.get("/:id", async (request, response) => {
  try {
    const task = await Task.findById(request.params.id);
    if (!task) return response.status(404).send("Not Found");
    response.json(task);
  } catch (error) {
    response.status(400).json(error);
  }
});

router.patch("/:id", async (request, response) => {
  const updates = Object.keys(request.body);
  const allowedUpdates = ["description", "completed"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation || updates.length === 0)
    return response.status(400).send("Invalid updates!");
  try {
    const task = await Task.findByIdAndUpdate(request.params.id, request.body, {
      new: true,
      runValidators: true,
    });
    if (!task) return response.status(404).send("Not Found");
    response.json(task);
  } catch (error) {
    response.status(400).json(error);
  }
});

router.delete("/:id", async (request, response) => {
  try {
    const task = await Task.findByIdAndDelete(request.params.id);
    if (!task) return response.status(404).send("Not Found");
    response.json(task);
  } catch (error) {
    response.status(400).json(error);
  }
});

module.exports = router;
