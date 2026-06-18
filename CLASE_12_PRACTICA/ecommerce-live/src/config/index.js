const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const config = {
  port: process.env.PORT || 3000,
  path_static: path.join(__dirname, "..", "..", "public"),
  path_views: path.join(__dirname, "..", "views"),
  path_files: path.join(__dirname, "..", "data", "messages.json"),
};
console.log(config);

module.exports = config;
