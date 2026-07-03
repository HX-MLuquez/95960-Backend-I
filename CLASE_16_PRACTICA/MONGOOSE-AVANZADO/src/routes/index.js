const router = require("express").Router();

const cartRouter = require("./cart.router");
const bookRouter = require("./book.router");
const userRouter = require("./user.router");
const mockRouter = require("./mocker.router");

router.use("/mock", mockRouter);
router.use("/books", bookRouter);
router.use("/users", userRouter);
router.use("/carts", cartRouter);


module.exports = router;