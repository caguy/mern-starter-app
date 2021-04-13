module.exports = function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  console.error(`Erreur à l'exécution de ${req.method} ${req.path} :`);
  console.error(err.stack);
  res.status(500).json({ error: "Internal error" });
};
