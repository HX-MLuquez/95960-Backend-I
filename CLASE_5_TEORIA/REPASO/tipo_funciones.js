


// Desarrollar una serie de funciones para Producto y para Usuario 

// Producto:
const productos = [];

// 1. Crear un producto
const crearProducto = function (nombre, precio) {
    const producto = {
        id: productos.length + 1,
        nombre,
        precio
    };
    productos.push(producto);
    return producto;    
}
// 2. Listar productos
// 3. Eliminar un producto
// 4. Modificar un producto

// Usuario:
const usuarios = [];
// 1. Crear un usuario
const crearUsuario = function (nombre, email) {}
// 2. Listar usuarios
// 3. Eliminar un usuario
// 4. Modificar un usuario