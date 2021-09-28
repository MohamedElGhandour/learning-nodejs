const { model, Schema } = require("mongoose");
const { ObjectId } = Schema.Types;

const schema = new Schema(
  {
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
      type: ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Task = model("Task", schema);

module.exports = Task;
