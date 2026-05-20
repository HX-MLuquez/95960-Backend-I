const productService = require("../services/productService");

class ProductController {
  async listView(req, res) {
    try {
      const products = await productService.getAllProducts({ includeDeleted: true });
      res.render("products", {
        title: "Productos",
        products: products.map((product) => product.toObject()),
        message: req.query.message || null,
      });
    } catch (error) {
      res.status(500).render("products", {
        title: "Productos",
        products: [],
        error: "No se pudo cargar el listado de productos",
      });
    }
  }

  renderCreateView(req, res) {
    res.render("created_product", {
      title: "Crear Producto",
      formAction: "/products",
      product: null,
      submitLabel: "Crear producto",
      error: null,
    });
  }

  async createFromView(req, res) {
    try {
      await productService.createProduct(req.body);
      res.redirect("/products?message=Producto creado correctamente");
    } catch (error) {
      res.status(400).render("created_product", {
        title: "Crear Producto",
        formAction: "/products",
        product: req.body,
        submitLabel: "Crear producto",
        error: error.message,
      });
    }
  }

  async renderDetailView(req, res) {
    try {
      const product = await productService.getProductById(req.params.id);
      res.render("detail_product", {
        title: "Detalle de Producto",
        product: product.toObject(),
        message: req.query.message || null,
        error: null,
      });
    } catch (error) {
      res.status(404).render("detail_product", {
        title: "Detalle de Producto",
        product: null,
        error: error.message,
      });
    }
  }

  async updateFromView(req, res) {
    try {
      await productService.updateProductById(req.params.id, req.body);
      res.redirect(`/products/${req.params.id}/detail_product?message=Producto actualizado`);
    } catch (error) {
      res.status(400).render("detail_product", {
        title: "Detalle de Producto",
        product: {
          _id: req.params.id,
          ...req.body,
          isDeleted: false,
        },
        error: error.message,
      });
    }
  }

  async softDeleteFromView(req, res) {
    try {
      await productService.softDeleteProductById(req.params.id);
      res.redirect("/products?message=Producto eliminado (soft delete)");
    } catch (error) {
      res.redirect(`/products/${req.params.id}/detail_product?message=${encodeURIComponent(error.message)}`);
    }
  }

  async getAllProductsApi(req, res) {
    try {
      const includeDeleted = req.query.includeDeleted === "true";
      const products = await productService.getAllProducts({ includeDeleted });
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener productos" });
    }
  }
}

module.exports = new ProductController();
