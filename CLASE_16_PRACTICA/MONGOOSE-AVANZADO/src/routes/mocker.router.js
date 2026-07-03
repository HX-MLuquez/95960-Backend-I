const router = require("express").Router();
const { generateUsers, generateBooks } = require("../mock");
const { User, Book, Cart } = require("../models");

router.post("/", async (req, res) => {
  try {
    const { numUsers, numBooks } = req.body;
    const users = generateUsers(numUsers);
    const books = generateBooks(numBooks);

    console.log("Generated Users:", users);
    console.log("Generated Books:", books);
    console.log(numUsers, numBooks);
    await User.insertMany(users);
    await Book.insertMany(books);

    res.status(201).json({ message: "Mock data created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error creating mock data", error });
  }
});

// RESET DATABASE - DELETE ALL USERS, BOOKS, AND CARTS
router.delete("/reset", async (req, res) => {
  try {
    await User.deleteMany({});
    await Book.deleteMany({});
    await Cart.deleteMany({});
    res.status(200).json({ message: "Database reset successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error resetting database", error });
  }
});

module.exports = router;