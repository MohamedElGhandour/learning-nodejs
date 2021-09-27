const { model, Schema } = require("mongoose");

const Task = model("Task", {
  description: {
    type: String,
    required: true,
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

module.exports = Task;
