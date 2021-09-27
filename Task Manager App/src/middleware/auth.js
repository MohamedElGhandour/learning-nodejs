const { verifyToken } = require("../utility/jsonwebtoken");
const User = require("../models/user");

const auth = async (request, response, next) => {
  try {
    const token = request.header("Authorization").split(" ");
    if (token[0] !== "Bearer") throw new Error();
    const decoded = verifyToken(token[1]);
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token[1],
    });
    if (!user) throw new Error();
    request.token = token[1];
    request.user = user;
    next();
  } catch (error) {
    response.status(401).send({ error: "plz auth" });
  }
};

module.exports = auth;
