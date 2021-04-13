const express = require("express");
const router = express.Router();
const User = require("@models/User");
const { authenticationHandler } = require("@middlewares");

router.get("/", async (req, res, next) => {
  try {
    let allUsers = await User.getAllUsers();
    return res.json(allUsers);
  } catch (err) {
    next(err);
  }
});

router.get("/:name", authenticationHandler, async (req, res, next) => {
  try {
    let { name } = req.params;
    let user = await User.getUserByName(name, { hidePassword: true });

    if (!user) {
      return res._reject(404, `User ${name} does not exist`);
    }

    if (user._id != req._auth.id) {
      return res._reject(403);
    }

    return res.json(user);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
