const { model, Schema } = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utility/jsonwebtoken");
const Task = require("./task");

const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is invalid");
        }
      },
    },
    password: {
      type: String,
      trim: true,
      minLength: 7,
      required: true,
      validate(value) {
        if (value.toLowerCase().includes("password"))
          throw new Error("Dont use 'Password' as ur password idiot");
      },
    },
    age: {
      type: Number,
      default: 0,
      validate(value) {
        if (value < 0) throw new Error("Age must be a positive");
      },
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

schema.virtual("tasks", {
  ref: "Task",
  localField: "_id",
  foreignField: "owner",
});

schema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.tokens;
  delete userObject.__v;
  return userObject;
};

schema.methods.generateAuthToken = async function () {
  const user = this;
  const token = generateToken({ _id: user._id.toString() });
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

schema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Unable to login");
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Unable to login");
  return user;
};

//  Hash the plain text password before saving
schema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

// Deleting User and their Task
schema.pre("remove", async function (next) {
  const user = this;
  await Task.deleteMany({ owner: user._id });

  next();
});

const User = model("User", schema);

module.exports = User;
