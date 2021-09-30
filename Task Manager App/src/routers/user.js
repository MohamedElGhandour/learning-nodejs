const express = require("express");
const User = require("../models/user");
const router = new express.Router();
const authMiddleware = require("../middleware/auth");
// const Task = require("../models/task");
const { sendWelcomeEmail, sendCancelEmail } = require("../emails/account");
const multer = require("multer");
const sharp = require("sharp");

router.post("/", async (request, response) => {
  const user = new User(request.body);
  try {
    await user.save();
    sendWelcomeEmail(user.email, user.name);
    const token = await user.generateAuthToken();
    response.send({ user, token });
  } catch (error) {
    response.status(400).json(error);
  }
});

router.post("/login", async (request, response) => {
  try {
    const user = await User.findByCredentials(
      request.body.email,
      request.body.password
    );
    const token = await user.generateAuthToken();
    response.send({ user, token });
  } catch (error) {
    response.status(400).json(error);
  }
});

router.post("/logout", authMiddleware, async (request, response) => {
  try {
    request.user.tokens = request.user.tokens.filter(
      (token) => token.token !== request.token
    );
    await request.user.save();
    response.send();
  } catch (error) {
    response.status(400).json(error);
  }
});

router.post("/logoutAll", authMiddleware, async (request, response) => {
  try {
    request.user.tokens = [];
    await request.user.save();
    response.send();
  } catch (error) {
    response.status(400).json(error);
  }
});

router.get("/profile", authMiddleware, async (request, response) => {
  response.status(200).send(request.user);
});

// router.get("/:id", async (request, response) => {
//   try {
//     const user = await User.findById(request.params.id);
//     if (!user) return response.status(404).send("Not Found");
//     response.json(user);
//   } catch (error) {
//     response.status(400).json(error);
//   }
// });

router.patch("/profile", authMiddleware, async (request, response) => {
  const updates = Object.keys(request.body);
  const allowedUpdates = ["name", "email", "password", "age"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation || updates.length === 0)
    return response.status(400).send("Invalid updates!");
  try {
    // const user = await User.findByIdAndUpdate(request.params.id, request.body, {
    //   new: true,
    //   runValidators: true,
    // });
    // const user = await User.findById(request.params.id);
    // if (!user) return response.status(404).send("Not Found");
    updates.forEach((update) => (request.user[update] = request.body[update]));
    await request.user.save();
    response.json(request.user);
  } catch (error) {
    response.status(400).json(error);
  }
});

router.delete("/profile", authMiddleware, async (request, response) => {
  try {
    // const user = await User.findByIdAndDelete(request.user._id);
    // if (!user) return response.status(404).send("Not Found");
    await request.user.remove();
    // await Task.deleteMany({ owner: request.user._id });
    sendCancelEmail(request.user.email, request.user.name);
    response.json(request.user);
  } catch (error) {
    response.status(400).json(error);
  }
});

const upload = multer({
  // dest: "avatar",
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, callback) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      callback(new Error("File must be jpg, jpeg, png"));
    }
    callback(undefined, true);
  },
});

router.post(
  "/avatar",
  authMiddleware,
  upload.single("avatar"),
  async (request, response) => {
    const buffer = await sharp(request.file.buffer)
      .resize(250, 250)
      .png()
      .toBuffer();
    request.user.avatar = buffer;
    await request.user.save();
    response.send(request.user);
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);
router.delete("/avatar", authMiddleware, async (request, response) => {
  try {
    request.user.avatar = undefined;
    await request.user.save();
    response.send(request.user);
  } catch (error) {
    response.status(400).json(error);
  }
});

router.get("/:id/avatar", async (request, response) => {
  try {
    const user = await User.findById(request.params.id);
    if (!user || !user.avatar) throw new Error("May be no user or avatar");
    response.set("Content-Type", "image/png");
    response.send(user.avatar);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
});

module.exports = router;
