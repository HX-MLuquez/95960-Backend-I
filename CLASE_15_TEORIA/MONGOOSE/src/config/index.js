const path = require('path');
const dotenv = require('dotenv');

const pathBase = path.join(__dirname, '../'); // /src <---
console.log('pathBase', pathBase);
dotenv.config({ path: path.join(pathBase, '../.env') });


const config = {
  port: process.env.PORT || 3000,
  mongoURI: process.env.MONGO_URI || 'mongodb://localhost:27017/mydatabase',
};

module.exports = config;