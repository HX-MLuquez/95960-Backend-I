const ProductManager = require("../managers/product.manager");

class ProductService {
  static async getProductById(id) {
    try {
      if (!id) {
        throw new Error("ID del producto es requerido");
      }
      // Verificar si el id es un string pasar a número
      if (typeof id === "string") {
        id = parseInt(id, 10);
      }

      const product = await ProductManager.getProductById(id);
      if (!product) {
        return null;
      }
      return product;
    } catch (error) {
      throw new Error("Error al obtener el producto por ID");
    }
  }
}

module.exports = ProductService;
