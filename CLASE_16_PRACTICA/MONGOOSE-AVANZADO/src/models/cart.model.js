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
const { mongoose } = require("../config");

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

module.exports = Cart;