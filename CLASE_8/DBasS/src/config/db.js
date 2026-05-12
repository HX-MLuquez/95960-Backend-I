// Configurar nuestro acceso a las .env con dotenv y nuestra configuración de la DB

const dotenv = require("dotenv");
dotenv.config();

const config = {
  database: {
    uri: process.env.MONGO_URI,
    secret_key: process.env.SECRET_KEY,
  },
};

class ConnectDB {
  constructor() {
    this.uri = config.database.uri;
  }
  async connect() {
    try {
      await mongoose.connect(this.uri);
      console.log("Database connected successfully");
    } catch (error) {
      console.error("Database connection failed:", error);
    }
  }
}

module.exports = {
  ConnectDB,
  config,
};