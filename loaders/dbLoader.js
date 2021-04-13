const mongoose = require("mongoose");

module.exports = async (dbURI) => {
  if (!dbURI) throw new Error("database URL not provided");

  try {
    console.log("Connecting to database");
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("Connected to database");
  } catch (err) {
    console.error(`Failed to connect to database`);
    throw err;
  }
};
