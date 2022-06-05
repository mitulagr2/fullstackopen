const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const loginRouter = require("express").Router();
const User = require("../models/user");

loginRouter.post("/", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) {
    return res.status(401).json({
      error: "invalid username",
    });
  }

  if (3 > password?.length) {
    return res.status(401).json({
      error: "password is required",
    });
  }

  const passwordCorrect = await bcrypt.compare(password, user.passwordHash);
  if (!passwordCorrect) {
    return res.status(401).json({
      error: "password is incorrect",
    });
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  };
  // const token = jwt.sign(userForToken, process.env.SECRET, {
  //   expiresIn: 60 * 60,
  // });
  const token = jwt.sign(userForToken, process.env.SECRET);

  res.status(200).send({ token, username: user.username, name: user.name });
});

module.exports = loginRouter;
