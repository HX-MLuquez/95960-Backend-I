const router = require("express").Router();
const { User } = require("../models");

/*
name
surname
email
password
active (boolean)
*/

// GET all Users
router.get("/", async (req, res) => {
  try {
    const users = await User.find({ active: true });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
});

// POST a new User
router.post("/", async (req, res) => {
  try {
    const { name, surname, email, password, role } = req.body;
    if (!name || !surname || !email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const newUser = new User({
      name,
      surname,
      email,
      password,
      role: role || "user", // Default role is "user" if not provided
    });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
});

// GET a User by ID
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id, active: true });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error });
  }
});

// PUT (update) a User by ID
router.put("/:id", async (req, res) => {
  try {
    const newData = req.body;
    const { id } = req.params;
    const updatedUser = await User.findOneAndUpdate(
      { _id: id, active: true },
      newData,
      { new: true },
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error });
  }
});

// DELETE (soft delete) a User by ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findOneAndUpdate(
      { _id: id, active: true },
      { active: false },
      { new: true },
    );
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully", deletedUser });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
});

module.exports = router;
