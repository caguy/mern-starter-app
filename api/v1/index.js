const express = require("express");
const apiV1 = express.Router();
const users = require("./users");
const token = require("./token");

apiV1.use("/token", token);
apiV1.use("/users", users);

apiV1.all("*", (req, res, next) => {
  res._reject(404, `${req.method} /api${req.path} is not a valid route`);
});

module.exports = apiV1;
