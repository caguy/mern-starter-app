const helmet = require("helmet");

module.exports = (req, res, next) => {
  //FIXME Handle nonces or custom CSP instead of disabling it
  return helmet({ contentSecurityPolicy: false })(req, res, next);
};
