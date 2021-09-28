const express = require("express");
const Task = require("../models/task");
const router = new express.Router();
const authMiddleware = require("../middleware/auth");

router.post("/", authMiddleware, async (request, response) => {
  const task = new Task({ ...request.body, owner: request.user._id });
  try {
    await task.save();
    response.json(task);
  } catch (error) {
    response.status(400).json(error);
  }
});
//  GET /tasks?competed=true
//  GET /tasks?limit=10&skip=10
router.get("/", authMiddleware, async (request, response) => {
  try {
    const match = {};
    const sort = {};

    if (request.query.completed)
      match.completed = request.query.completed.toLowerCase() === "true";

    if (request.query.sortBy) {
      const parts = request.query.sortBy.split(":");
      sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
    }

    // const task = await Task.find({ owner: request.user._id });
    await request.user.populate({
      path: "tasks",
      match,
      options: {
        limit: parseInt(request.query.limit),
        skip: parseInt(request.query.skip),
        sort,
      },
    });
    if (request.user.tasks.length === 0)
      return response.status(404).send("Not Found");
    response.json(request.user.tasks);
  } catch (error) {
    response.status(400).send(error.message);
  }
});

router.get("/:id", authMiddleware, async (request, response) => {
  try {
    const task = await Task.findOne({
      _id: request.params.id,
      owner: request.user._id,
    });
    if (!task) return response.status(404).send("Not Found");
    response.json(task);
  } catch (error) {
    response.status(400).json(error);
  }
});

router.patch("/:id", authMiddleware, async (request, response) => {
  const updates = Object.keys(request.body);
  const allowedUpdates = ["description", "completed"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation || updates.length === 0)
    return response.status(400).send("Invalid updates!");
  try {
    // const task = await Task.findById(request.params.id);
    const task = await Task.findOne({
      _id: request.params.id,
      owner: request.user._id,
    });
    if (!task) return response.status(404).send("Not Found");
    updates.forEach((update) => (task[update] = request.body[update]));
    await task.save();
    // const task = await Task.findByIdAndUpdate(request.params.id, request.body, {
    //   new: true,
    //   runValidators: true,
    // });
    response.json(task);
  } catch (error) {
    response.status(400).json(error);
  }
});

router.delete("/:id", authMiddleware, async (request, response) => {
  try {
    // const task = await Task.findByIdAndDelete(request.params.id);
    const task = await Task.findOneAndDelete({
      _id: request.params.id,
      owner: request.user._id,
    });
    if (!task) return response.status(404).send("Not Found");
    response.json(task);
  } catch (error) {
    response.status(400).json(error);
  }
});

module.exports = router;
