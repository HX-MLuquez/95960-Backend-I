const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

//* Traer las variables de entorno
const { MONGO_URI, SECRET_KEY } = process.env;
console.log("SECRET_KEY:", SECRET_KEY);

//* MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/*

user name db cluster -> pepe_db_user 
password -> 12345678 

mongodb+srv://pepe_db_user:12345678@cluster01.aolpvws.mongodb.net/pipi?appName=Cluster01
*/

//* Conexión a la DB aquí
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
  });

//* MODELS - User y Product
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});
const User = mongoose.model("User", userSchema);

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
});
const Product = mongoose.model("Product", productSchema);

//* RUTAS */

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// * Rutas para Users
// Crear un nuevo usuario
app.post("/users", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const newUser = new User({ name, email, password });
    await newUser.save();
    if (newUser.password.length < 8) {
      return res.status(400).json({ error: "Password must be at least 8 characters long" });
    }
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Failed to create user" });
  }
});

/*
CODE EJEMPLO MODULARIZADO:
* ROUTE
app.post("/users", userController.createUser);

* DAO (data access object) - Maneja la interacción directa con la DB, consultas, etc.
const User = require("../models/User");

class UserDAO {
  async create(userData) {
    const newUser = new User(userData);
    return await newUser.save();
  }
    async findAll() {
    return await User.find();
  }
}
module.exports = UserDAO;

* SERVICE MODULARIZADO - Maneja la lógica de negocio, validaciones, etc. y llama al DAO para interactuar con la DB
const UserDAO = require("../dao/UserDAO");

const createUserService = async (userData) => {
  if (!userData.name || !userData.email || !userData.password) {
    throw new Error("Missing required fields");
  }
    if (userData.password.length < 8) {
    throw new Error("Password must be at least 8 characters long");
  }
    const userDAO = new UserDAO();
    return await userDAO.create(userData);
};

module.exports = {
  createUserService,
};

* CONTROLLER MODULARIZADO - Recibe data -> ejecuta el service -> y brinda la respuesta al cliente
const { createUserService } = require("../services/userService");

const createUser = async (req, res) => {
  try {
    const newUser = await createUserService(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
    }
};

module.exports = {
  createUser,
};

* ROUTE - Definimos la ruta solo con el path y el controller
const { createUser } = require("../controllers/userController");

app.post("/users", createUser);
*/

// Obtener todos los usuarios
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});
/*
Ejemplo crear usuario:
POST http://localhost:3000/users
Content-Type: application/json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "securepassword1234"
}
*/

// * Rutas para Products
// Crear un nuevo producto
app.post("/products", async (req, res) => {
  try {
    const { name, price, description } = req.body;
    const newProduct = new Product({ name, price, description });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: "Failed to create product" });
  }
});

// Obtener todos los productos
app.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

module.exports = app;
