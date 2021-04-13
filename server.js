require("dotenv").config();
require("module-alias/register");
require("console-stamp")(console, { pattern: "dd/mm/yyyy HH:MM:ss.l" });

const path = require("path");
const express = require("express");
const cookieParser = require("cookie-parser");

const { PORT, ENVIRONMENT, DB_URI } = require("@config");
const dbLoader = require("@loaders/dbLoader");
const {
  errorHandler,
  headerHandler,
  logHandler,
  rejectionHandler,
} = require("@middlewares");
const apiRouter = require("@api");

const app = express();

(async () => {
  try {
    if (!process.env.JWT_KEY && ENVIRONMENT === "production")
      console.warn("No encryption key provided");

    await dbLoader(DB_URI);

    app.use(logHandler(ENVIRONMENT));
    app.use(headerHandler);
    app.use(rejectionHandler);
    app.use(cookieParser());
    app.use(express.json(), (err, req, res, next) => {
      res._reject(400, "Body is not a valid JSON");
    });

    app.use("/api", apiRouter);

    if (ENVIRONMENT === "production") {
      app.use(express.static(path.resolve(__dirname, "client", "dist")));
    }

    app.use("*", (req, res, next) => {
      res.status(404).json({ error: "Not found" });
    });

    app.use(errorHandler);

    app.listen(PORT, () => {
      console.log(`${ENVIRONMENT} server started on port ${PORT}`);
    });
  } catch (err) {
    console.error(`Unable to run server (${err.message})`);
    console.error(err.stack);
    process.exit(1);
  }
})();

module.exports = app;
