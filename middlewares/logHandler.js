const morgan = require("morgan");

module.exports = (environment) => (req, res, next) => {
  try {
    if (environment === "production") {
      return morgan("combined")(req, res, next);
    } else {
      return morgan("dev")(req, res, next);
    }
  } catch (err) {
    console.error("Erreur à la génération du fichier de log");
    next();
  }
};
