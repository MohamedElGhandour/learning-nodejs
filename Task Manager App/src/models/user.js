const { model } = require("mongoose");
const validator = require("validator");

const User = model("User", {
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
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
});

module.exports = User;
