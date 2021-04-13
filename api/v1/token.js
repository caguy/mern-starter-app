const express = require("express");
const jwt = require("jsonwebtoken");

const { JWT_ACCESS_TOKEN_NAME, JWT_KEY, JWT_VALIDITY } = require("@config");
const User = require("@models/User");

const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res._reject(400, "Invalid request body");
    }

    let user = await User.getUserByName(username);

    if (user) {
      let passwordMatch = await user.passwordMatch(password);

      if (passwordMatch) {
        const payload = {
          id: user._id,
          username: user.username,
          isAdmin: user.isAdmin,
        };

        const accessToken = await jwt.sign(payload, JWT_KEY, {
          expiresIn: JWT_VALIDITY,
        });

        res.cookie(JWT_ACCESS_TOKEN_NAME, accessToken, { httpOnly: true });

        return res.status(201).json({
          success: true,
          token: accessToken,
        });
      }
    }

    return res._reject(
      401,
      "Identification failed for the given username and password"
    );
  } catch (err) {
    return next(err);
  }
});

router.delete("/", (req, res, next) => {
  res.status(205).clearCookie(JWT_ACCESS_TOKEN_NAME).json({ success: true });
});

module.exports = router;
