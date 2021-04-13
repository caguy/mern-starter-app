module.exports = {
  PORT: process.env.PORT || 5000,
  ENVIRONMENT: process.env.NODE_ENV || "development",
  DB_URI: process.env.MONGO_DB_URI,
  JWT_ACCESS_TOKEN_NAME: "AccessToken",
  JWT_KEY: process.env.JWT_KEY || "s3Cr3T",
  JWT_VALIDITY: "24h",
};
