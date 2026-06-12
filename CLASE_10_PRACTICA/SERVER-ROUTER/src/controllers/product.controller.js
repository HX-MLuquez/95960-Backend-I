const ProductService = require("../services/product.service");

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await ProductService.getProductById(id);
    if (!product) {
      return res
        .status(404)
        .json({ status: false, message: "Producto no encontrado" });
    }
    res.json({ status: true, data: product });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

module.exports = {
  getProductById,
};
