const ProductManager = require("../data-access-object/productDao");

const productDao = new ProductManager();

class ProductService {
  validateProductData(data) {
    const { title, price, stock } = data;

    if (!title || String(title).trim().length < 3) {
      throw new Error("El titulo es requerido y debe tener al menos 3 caracteres");
    }

    if (Number.isNaN(Number(price)) || Number(price) < 0) {
      throw new Error("El precio debe ser un numero mayor o igual a 0");
    }

    if (Number.isNaN(Number(stock)) || Number(stock) < 0) {
      throw new Error("El stock debe ser un numero mayor o igual a 0");
    }
  }

  normalizeProductData(data) {
    return {
      title: String(data.title).trim(),
      description: data.description ? String(data.description).trim() : "",
      price: Number(data.price),
      stock: Number(data.stock),
      category: data.category ? String(data.category).trim() : "General",
    };
  }

  async createProduct(data) {
    this.validateProductData(data);
    return productDao.createProduct(this.normalizeProductData(data));
  }

  async getAllProducts(options = {}) {
    const results = await productDao.getAllProducts(options);
    if (results.length === 0) {
      throw new Error("No se encontraron productos");
    }
    return results;
  }

  async getProductById(id) {
    const product = await productDao.getProductById(id);
    if (!product) {
      throw new Error("Producto no encontrado");
    }
    return product;
  }

  async updateProductById(id, data) {
    this.validateProductData(data);

    const updated = await productDao.updateProductById(
      id,
      this.normalizeProductData(data)
    );

    if (!updated) {
      throw new Error("No se pudo actualizar el producto");
    }

    return updated;
  }

  async softDeleteProductById(id) {
    const deleted = await productDao.softDeleteProductById(id);
    if (!deleted) {
      throw new Error("No se pudo eliminar el producto");
    }
    return deleted;
  }
}

module.exports = new ProductService();
