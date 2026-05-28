// Desarrollar una serie de Clases para Producto y para Usuario

// Producto:

// 1. Crear un producto
// 2. Listar productos
// 3. Eliminar un producto
// 4. Modificar un producto

class Producto {
  constructor(nombre, precio) {
    this.id = Producto.incrementarId();
    this.nombre = nombre;
    this.precio = precio;
  }
  static incrementarId() {
    if (!this.id) {
      this.id = 1;
    } else {
      this.id++;
    }
    return this.id;
  }
}

class Products {
  constructor() {
    this.productos = [];
  }
  crearProducto(nombre, precio) {
    const producto = new Producto(nombre, precio);
    this.productos.push(producto);
    return producto;
  }
  listarProductos() {
    return this.productos;
  }

  eliminarProducto(id) {
    const index = this.productos.findIndex((producto) => producto.id === id);
    if (index !== -1) {
      this.productos.splice(index, 1);
      return true;
    }
    return false;
  }
}

// Ejemplo de uso:
const list_productos = new Products();
list_productos.crearProducto("Laptop", 1000);
list_productos.crearProducto("Smartphone", 500);
console.log(list_productos.listarProductos());
list_productos.eliminarProducto(1);
console.log(list_productos.listarProductos());  


// Usuario:

// 1. Crear un usuario

// 2. Listar usuarios
// 3. Eliminar un usuario
// 4. Modificar un usuario
