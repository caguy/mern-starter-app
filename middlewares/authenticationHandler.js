const jwt = require("jsonwebtoken");
const { JWT_ACCESS_TOKEN_NAME, JWT_KEY } = require("@config");

module.exports = async function authenticationHandler(req, res, next) {
  try {
    const token = req.cookies[JWT_ACCESS_TOKEN_NAME];

    if (!token) {
      return res._reject(401, "You must login to access this endpoint");
    }

    const payload = await jwt.verify(token, JWT_KEY);
    req._auth = { ...payload };

    next();
  } catch (err) {
    switch (err.name) {
      case "TokenExpiredError":
      case "JsonWebTokenError":
      case "NotBeforeError":
        return res._reject(401, err.message);
      default:
        next(err);
    }
  }
};
