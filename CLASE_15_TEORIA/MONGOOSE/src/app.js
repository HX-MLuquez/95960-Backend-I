const express = require("express");
const app = express();
const morgan = require("morgan");
const config = require("./config");
const mongoose = require("mongoose");

// MIDDLEWARES
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method",
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

// console.log("config.mongoURI", config.mongoURI);
// Config Mongoose
mongoose
  .connect(config.mongoURI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });

// MODELS
// User model
/*
name
surname
email
password
*/

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", UserSchema);
// User -> users <- así se llama la colección en MongoDB, por defecto Mongoose pluraliza el nombre del modelo y lo pone en minúsculas

// Cart model
/*
userId
books: [
  {
    bookId
    quantity
  }
]
*/
const CartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  books: [
    {
      bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
        required: true,
      },
      quantity: { type: Number, required: true },
    },
  ],
});

const Cart = mongoose.model("Cart", CartSchema);
// Cart -> carts <- así se llama la colección en MongoDB, por defecto Mongoose pluraliza el nombre del modelo y lo pone en minúsculas

// Book model
/*
title
author
year
genre
publisher (editorial)
stock
price
*/

const BookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  year: { type: Number, required: true },
  genre: {
    type: String,
    required: true,
    enum: [
      "Fiction",
      "Non-Fiction",
      "Science Fiction",
      "Fantasy",
      "Mystery",
      "Romance",
      "Horror",
    ],
  },
  publisher: { type: String, required: false },
  stock: { type: Number, required: true },
  price: { type: Number, required: false },
});

// Book -> books <- así se llama la colección en MongoDB, por defecto Mongoose pluraliza el nombre del modelo y lo pone en minúsculas
const Book = mongoose.model("Book", BookSchema);

//todo___ ROUTES  - Tenemos 3 models: User, Cart y Book. Vamos a crear rutas para cada uno de ellos.

app.get("/", (req, res) => {
  res.send(`<div style="display: flex; justify-content: center; align-items: center; height: 100vh;">
  <h1 style="font-size: 3rem; color: #333;">Bienvenido a la API de Mongoose</h1>
  </div>`);
});

// POST Book
app.post("/api/books", async (req, res) => {
  try {
    const { title, author, year, genre, publisher, stock, price } = req.body;
    if (!title || !author || !year || !genre || !stock) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const newBook = new Book({
      title,
      author,
      year,
      genre,
      publisher,
      stock,
      price,
    });
    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ message: "Error creating book", error });
  }
});

// GET all Books
app.get("/api/books", async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: "Error fetching books", error });
    }
});



// ROUTE 404
app.use((req, res, next) => {
  res.status(404).json({
    message: "Route not found",
  });
});

module.exports = app;

/*

mocks de books para probar la API:

bookA {
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "year": 1925,
  "genre": "Fiction",
  "publisher": "Scribner",
  "stock": 10,
  "price": 15.99
}

bookB {
  "title": "To Kill a Mockingbird",
  "author": "Harper Lee",
  "year": 1960,
  "genre": "Fiction",
  "publisher": "J.B. Lippincott & Co.",
  "stock": 15,
  "price": 12.99
}

bookC {
  "title": "1984",
  "author": "George Orwell",
  "year": 1949,
  "genre": "Science Fiction",
  "publisher": "Secker & Warburg",
  "stock": 20,
  "price": 14.99
}

bookD {
  "title": "La biblioteca de Babel",
  "author": "Jorge Luis Borges",
  "year": 1941,
  "genre": "Fiction",
  "publisher": "Editorial Sur",
  "stock": 5,
  "price": 9.99
}

bookE {
  "title": "El Aleph",
  "author": "Jorge Luis Borges",
  "year": 1945,
  "genre": "Fiction",
  "publisher": "Editorial Sur",
  "stock": 8,
  "price": 11.99
}

bookF {
  "title": "Blade Runner",
  "author": "Philip K. Dick",
  "year": 1968,
  "genre": "Science Fiction",
  "publisher": "Doubleday",
  "stock": 12,
  "price": 13.99
}


*/
