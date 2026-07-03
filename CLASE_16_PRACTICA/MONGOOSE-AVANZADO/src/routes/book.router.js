const router = require("express").Router();
const { Book } = require("../models");

// POST a new Book
router.post("/", async (req, res) => {
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
router.get("/", async (req, res) => {
  try {
    const books = await Book.find({ active: true });
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: "Error fetching books", error });
  }
});

// GET a Book by ID
router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findOne({ _id: req.params.id, active: true });
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: "Error fetching book", error });
  }
});

// PUT (update) a Book by ID
router.put("/:id", async (req, res) => {
  try {
    const newData = req.body;
    const { id } = req.params;
    const updatedBook = await Book.findOneAndUpdate(
      { _id: id, active: true },
      newData,
      { new: true },
    );
    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(500).json({ message: "Error updating book", error });
  }
});

// DELETE (soft delete) a Book by ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBook = await Book.findOneAndUpdate(
      { _id: id, active: true },
      { active: false },
      { new: true },
    );
    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json(deletedBook);
  } catch (error) {
    res.status(500).json({ message: "Error deleting book", error });
  }
});

module.exports = router;
