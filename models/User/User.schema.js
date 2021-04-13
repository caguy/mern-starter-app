const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let User = new Schema(
  {
    username: {
      type: String,
      required: [true, "Le nom d'utilisateur est obligatoire"],
      minlength: [
        4,
        "Le nom d'utilisateur doit contenir au moins 4 caractères",
      ],
      maxlength: [30, "Le nom d'utilisateur ne peut pas excéder 30 caractères"],
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Le mot de passe est obligatoire"],
      minlength: [6, "Le mot de passe doit contenir au moins 6 caractères"],
      maxlength: [30, "Le mot de passe ne peut pas excéder 30 caractères"],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    subscriptionDate: {
      type: Date,
      default: Date.now,
    },
  },
  { strict: "throw", timestamps: true }
);

User.pre("save", async function () {
  this.password = Validator.escape(this.password);
  this.username = Validator.escape(this.username);
  this.password = await bcrypt.hash(this.password, 10);
});

module.exports = User;
