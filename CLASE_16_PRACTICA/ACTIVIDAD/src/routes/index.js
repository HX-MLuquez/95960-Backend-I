const express = require('express');
const router = express.Router();

const userRouter = require("./userRoutes")
const productApiRoutes = require("./productApiRoutes");

router.use("/users", userRouter)
router.use("/products", productApiRoutes);

module.exports = router;