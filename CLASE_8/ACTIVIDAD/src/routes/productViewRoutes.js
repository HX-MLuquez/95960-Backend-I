const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.get("/", productController.listView);
router.get("/created_product", productController.renderCreateView);
router.post("/", productController.createFromView);
router.get("/:id/detail_product", productController.renderDetailView);
router.put("/:id", productController.updateFromView);
router.delete("/:id", productController.softDeleteFromView);

module.exports = router;
