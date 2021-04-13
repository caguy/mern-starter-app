const bcrypt = require("bcrypt");

exports.statics = {
  getAllUsers: async function () {
    return await this.find({}, "_id username").exec();
  },
  getUserByName: async function (username, { hidePassword = false } = {}) {
    return await this.findOne(
      { username: username },
      hidePassword ? "-password" : ""
    ).exec();
  },
};

exports.methods = {
  passwordMatch: async function (inputPassword) {
    return await bcrypt.compare(inputPassword, this.password);
  },
};
