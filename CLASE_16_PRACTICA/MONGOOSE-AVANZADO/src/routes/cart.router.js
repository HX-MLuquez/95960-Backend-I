const router = require("express").Router();
const { Cart } = require("../models");

/*
userId
books: [
  {
    bookId
    quantity
  }
]
*/
// GET all Carts
router.get("/", async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching carts", error });
  }
});

// GET a Cart by userId - BTTN IR AL CARRITO
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const cart = await Cart.findOne({ userId }).populate("books.bookId");
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error fetching cart", error });
  }
});

// POST - PUT a new Cart - BTTN AGREGAR o AGREGAR e IR
router.post("/", async (req, res) => {
  try {
    const { userId, books } = req.body;
    if (!userId || !books) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const existingCart = await Cart.findOne({ userId });
    if (existingCart) {
      existingCart.books = [...existingCart.books, ...books];
      await existingCart.save();
      return res.status(200).json(existingCart);
    }
    const newCart = new Cart({ userId, books });
    await newCart.save();
    res.status(201).json(newCart);
  } catch (error) {
    res.status(500).json({ message: "Error creating cart", error });
  }
});

// DELETE book from Cart by userId and bookId - BTTN QUANTITY -1 by book in Cart
router.delete("/:userId/:bookId", async (req, res) => {
  try {
    const { userId, bookId } = req.params;
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    const bookIndex = cart.books.findIndex(
      (book) => book.bookId.toString() === bookId,
    );
    if (bookIndex === -1) {
      return res.status(404).json({ message: "Book not found in cart" });
    }
    cart.books[bookIndex].quantity -= 1;
    if (cart.books[bookIndex].quantity <= 0) {
      cart.books.splice(bookIndex, 1);
    }
    await cart.save();
    // If the cart is empty after deletion, you might want to delete the cart itself
    if (cart.books.length === 0) {
      await Cart.deleteOne({ userId });
      return res
        .status(200)
        .json({ message: "Cart is empty and has been deleted" });
    }
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error deleting book from cart", error });
  }
});

// DELETE entire book from Cart by userId and bookId - BTTN REMOVE Book in Cart
router.delete("/remove/:userId/:bookId", async (req, res) => {
  try {
    const { userId, bookId } = req.params;
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    const bookIndex = cart.books.findIndex(
      (book) => book.bookId.toString() === bookId,
    );
    if (bookIndex === -1) {
      return res.status(404).json({ message: "Book not found in cart" });
    }
    cart.books.splice(bookIndex, 1);
    await cart.save();

    // If the cart is empty after deletion, you might want to delete the cart itself
    if (cart.books.length === 0) {
      await Cart.deleteOne({ userId });
      return res
        .status(200)
        .json({ message: "Cart is empty and has been deleted" });
    }

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error deleting book from cart", error });
  }
});

// DELETE entire Cart by userId - BTTN DELETE CART
router.delete("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    await Cart.deleteOne({ userId });
    res.status(200).json({ message: "Cart deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting cart", error });
  }
});

module.exports = router;
