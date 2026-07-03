const express = require("express");
const app = express();
const morgan = require("morgan");
const config = require("./config");

const routes = require("./routes");

// // MODELS
// const { Book, User, Cart } = require("./models");

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

//todo___ ROUTES  - Tenemos 3 models: User, Cart y Book. Vamos a crear rutas para cada uno de ellos.
// console.log("Routes loaded: ", routes);
app.use("/api", routes);

app.get("/", (req, res) => {
  res.send(`<div style="display: flex; justify-content: center; align-items: center; height: 100vh;">
  <h1 style="font-size: 3rem; color: #333;">Bienvenido a la API de Mongoose</h1>
  </div>`);
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
  "price": 15.00,
  "active": true
}

bookB {
  "title": "To Kill a Mockingbird",
  "author": "Harper Lee",
  "year": 1960,
  "genre": "Fiction",
  "publisher": "J.B. Lippincott & Co.",
  "stock": 15,
  "price": 12.99,
  "active": true
}

bookC {
  "title": "1984",
  "author": "George Orwell",
  "year": 1949,
  "genre": "Science Fiction",
  "publisher": "Secker & Warburg",
  "stock": 20,
  "price": 14.99,
  "active": true
}

bookD {
  "title": "La biblioteca de Babel",
  "author": "Jorge Luis Borges",
  "year": 1941,
  "genre": "Fiction",
  "publisher": "Editorial Sur",
  "stock": 5,
  "price": 9.99,
  "active": true
}

bookE {
  "title": "El Aleph",
  "author": "Jorge Luis Borges",
  "year": 1945,
  "genre": "Fiction",
  "publisher": "Editorial Sur",
  "stock": 8,
  "price": 11.99,
  "active": true
}

bookF {
  "title": "Blade Runner",
  "author": "Philip K. Dick",
  "year": 1968,
  "genre": "Science Fiction",
  "publisher": "Doubleday",
  "stock": 12,
  "price": 13.99,
  "active": true
}


*/
