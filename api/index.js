const express = require("express");
const apiRouter = express.Router();
const apiV1 = require("./v1");

apiRouter.use("/v1", apiV1);

module.exports = apiRouter;
