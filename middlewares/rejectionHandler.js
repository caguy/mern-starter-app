const errorMessages = {
  400: "Bad request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not found",
};

module.exports = function (req, res, next) {
  res._reject = (code, details) => {
    if (!Object.keys(errorMessages).includes(code + "")) {
      return next(
        new Error(
          `Tried to reject the request with a ${code} status, but it is not supported`
        )
      );
    }
    let responseObj = { code, error: errorMessages[code] };
    if (details) responseObj.message = details;
    return res.status(code).json(responseObj);
  };
  next();
};
