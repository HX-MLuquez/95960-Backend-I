const path = require("path");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const pathBase = path.join(__dirname, "../"); // /src <---
console.log("pathBase", pathBase);
dotenv.config({ path: path.join(pathBase, "../.env") });

const mongoURI =
  process.env.MONGO_URI_DBaaS || "mongodb://localhost:27017/mydatabase";

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });

const config = {
  mongoURI,
  port: process.env.PORT || 3000,
  mongoose,
};

module.exports = config;
