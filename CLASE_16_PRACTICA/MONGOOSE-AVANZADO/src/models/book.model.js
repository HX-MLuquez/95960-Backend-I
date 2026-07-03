// Book model
/*
title
author
year
genre
publisher (editorial)
stock
price
active (boolean)
*/

const { mongoose } = require("../config");

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
  active: { type: Boolean, default: true },
});

// Book -> books <- así se llama la colección en MongoDB, por defecto Mongoose pluraliza el nombre del modelo y lo pone en minúsculas
const Book = mongoose.model("Book", BookSchema);

module.exports = Book;
