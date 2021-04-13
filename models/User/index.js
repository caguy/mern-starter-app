const mongoose = require("mongoose");

let User = require("./User.schema");
User.statics = { ...User.statics, ...require("./User.services").statics };
User.methods = { ...User.methods, ...require("./User.services").methods };

module.exports = mongoose.model("users", User);
