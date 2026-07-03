// User model
/*
name
surname
email
password
role (enum: ["user", "admin"], default: "user")
active (boolean)
*/

const { mongoose } = require("../config");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  active: { type: Boolean, default: true },
});

const User = mongoose.model("User", UserSchema);
// User -> users <- así se llama la colección en MongoDB, por defecto Mongoose pluraliza el nombre del modelo y lo pone en minúsculas

module.exports = User;
