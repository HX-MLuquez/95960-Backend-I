const mongoose = require("mongoose");
const Product = require("../models/product.model");

class ProductManager {
  async createProduct(data) {
    return Product.create(data);
  }

  async getAllProducts({ includeDeleted = false } = {}) {
    const filter = includeDeleted ? {} : { isDeleted: false };
    return Product.find(filter).sort({ createdAt: -1 });
  }

  async getProductById(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null;
    }
    return Product.findById(id);
  }

  async updateProductById(id, data) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null;
    }

    return Product.findOneAndUpdate(
      { _id: id, isDeleted: false },
      data,
      { new: true }
    );
  }

  async softDeleteProductById(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null;
    }

    return Product.findOneAndUpdate(
      { _id: id, isDeleted: false },
      { isDeleted: true },
      { new: true }
    );
  }
}

module.exports = ProductManager;
