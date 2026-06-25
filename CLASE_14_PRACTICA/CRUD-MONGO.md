# 🧩 CRUD en MongoDB

---

## ➕ CREATE

use escuelita
db.createCollection("alumnos")

### 📘 Descripción general:

Las operaciones de **inserción** permiten **agregar documentos nuevos** a una colección.
MongoDB ofrece métodos para insertar **un solo documento** o **varios documentos** al mismo tiempo.

### 📌 Sintaxis:

```javascript
db.collection.insertOne(documento, opciones);
db.collection.insertMany([documentos], opciones);
```

- `documento`: el objeto JSON que deseas guardar.
- `opciones`: parámetros opcionales como `ordered` (si `false`, continúa insertando aunque alguno falle).

---

### ✅ Ejemplos prácticos

nombre apellido, edad, dirección, telefono, emai

```javascript
//* Insertar un documento
db.usuarios.insertOne({
  nombre: "Sara",
  apellido: "Gómez",
  edad: 24,
  direccion: "Calle Falsa 123",
  telefono: "123456789",
  email: "sara@mail.com",
});

db.usuarios.find();
```

```javascript
//* Insertar múltiples documentos
db.usuarios.insertMany([
  {
    nombre: "Juan",
    apellido: "Pérez",
    edad: 20,
    direccion: "Calle Real 456",
    telefono: "987654321",
    email: "juan@mail.com",
  },
  {
    nombre: "Ana",
    apellido: "López",
    edad: 22,
    email: "ana@mail.com",
  },
  {
    nombre: "Pedro",
    apellido: "Martínez",
    edad: 21,
    direccion: "Calle Secundaria 321",
    telefono: "321654987",
    dni: "12345678",
  },
]);

db.usuarios.insertMany([
  { nombre: "Juan", edad: 20, curso: "Historia" },
  { nombre: "Ana", edad: 22, curso: "Inglés" },
  { nombre: "Pedro", edad: 21, curso: "Arte" },
]);

db.alumnos.insertMany([
  { nombre: "Jimy", edad: 27, curso: "Historia" },
  { nombre: "Anina", edad: 22, curso: "Inglés" },
]);
```

db.alumnos.find().count()

```javascript
//* Insertar documento con _id personalizado
db.usuarios.insertOne({
  _id: "A100",
  nombre: "Luis",
  edad: 23,
  curso: "Biología",
});
```

---

### 🧠 Buenas prácticas en CREATE

- ✅ Deja que MongoDB genere automáticamente el `_id` salvo que tengas un motivo claro para definirlo.
- 🚫 Evita usar `insert()`, está obsoleto.
- ⚡ Usa `insertMany()` para grandes volúmenes de datos, es más eficiente.

---

## 🔍 READ (GET)

### 📘 Descripción general:

Las operaciones de **lectura** permiten **consultar documentos** en una colección.
MongoDB provee diferentes métodos para recuperar documentos completos o filtrados.

### 📌 Sintaxis:

```javascript
db.collection.find(filtro, proyección);
db.collection.findOne(filtro, proyección);
```

- `filtro`: condiciones para buscar (igual que en `update` o `delete`).
- `proyección`: especifica qué campos mostrar (1 = mostrar, 0 = ocultar).

---

### ✅ Ejemplos prácticos

```javascript
//* Encontrar todos los documentos
db.usuarios.find();
```

```javascript
//* Encontrar un solo documento
db.usuarios.findOne({ nombre: "Sara" });
```

```javascript
//* Filtrar por condiciones
db.usuarios.find({ edad: { $gt: 20 } });
// Retorna los usuarios con edad mayor a 20
```

```javascript
//* Mostrar solo ciertos campos (proyección)
db.usuarios.find({ curso: "Biología" }, { nombre: 1, edad: 1, _id: 0 });
// Muestra solo nombre y edad, oculta _id
```

```javascript
//* Ordenar resultados
db.usuarios.find().sort({ edad: -1 });
// Ordena por edad descendente
```

```javascript
//* Limitar y saltar resultados
db.usuarios.find().limit(2).skip(1);
// Devuelve 2 resultados, omitiendo el primero
```
db.productos.find().limit(10).skip(0);
db.productos.find().limit(10).skip(10);
db.productos.find().limit(10).skip(20);
db.productos.find().limit(10).skip(30);

db.productos.find({ precio: { $gt: 2000 } }).sort({ precio: 1 }).limit(5);

```javascript
//* Contar documentos
db.usuarios.countDocuments({ curso: "Arte" });
```

db.productos.insertMany([
  { nombre: "Producto 1", categoria: "Categoria 1", precio: 1000, stock: 10, activo: true },
  { nombre: "Producto 2", categoria: "Categoria 2", precio: 1100, stock: 12, activo: true },
  { nombre: "Producto 3", categoria: "Categoria 3", precio: 1200, stock: 15, activo: true },
  { nombre: "Producto 4", categoria: "Categoria 4", precio: 1300, stock: 18, activo: true },
  { nombre: "Producto 5", categoria: "Categoria 5", precio: 1400, stock: 20, activo: true },
  { nombre: "Producto 6", categoria: "Categoria 1", precio: 1500, stock: 25, activo: true },
  { nombre: "Producto 7", categoria: "Categoria 2", precio: 1600, stock: 30, activo: true },
  { nombre: "Producto 8", categoria: "Categoria 3", precio: 1700, stock: 22, activo: true },
  { nombre: "Producto 9", categoria: "Categoria 4", precio: 1800, stock: 14, activo: true },
  { nombre: "Producto 10", categoria: "Categoria 5", precio: 1900, stock: 28, activo: true },

  { nombre: "Producto 11", categoria: "Categoria 1", precio: 2000, stock: 16, activo: true },
  { nombre: "Producto 12", categoria: "Categoria 2", precio: 2100, stock: 19, activo: true },
  { nombre: "Producto 13", categoria: "Categoria 3", precio: 2200, stock: 24, activo: true },
  { nombre: "Producto 14", categoria: "Categoria 4", precio: 2300, stock: 17, activo: true },
  { nombre: "Producto 15", categoria: "Categoria 5", precio: 2400, stock: 11, activo: true },
  { nombre: "Producto 16", categoria: "Categoria 1", precio: 2500, stock: 32, activo: true },
  { nombre: "Producto 17", categoria: "Categoria 2", precio: 2600, stock: 27, activo: true },
  { nombre: "Producto 18", categoria: "Categoria 3", precio: 2700, stock: 35, activo: true },
  { nombre: "Producto 19", categoria: "Categoria 4", precio: 2800, stock: 29, activo: true },
  { nombre: "Producto 20", categoria: "Categoria 5", precio: 2900, stock: 21, activo: true },

  { nombre: "Producto 21", categoria: "Categoria 1", precio: 3000, stock: 18, activo: true },
  { nombre: "Producto 22", categoria: "Categoria 2", precio: 3100, stock: 13, activo: true },
  { nombre: "Producto 23", categoria: "Categoria 3", precio: 3200, stock: 26, activo: true },
  { nombre: "Producto 24", categoria: "Categoria 4", precio: 3300, stock: 31, activo: true },
  { nombre: "Producto 25", categoria: "Categoria 5", precio: 3400, stock: 15, activo: true },
  { nombre: "Producto 26", categoria: "Categoria 1", precio: 3500, stock: 23, activo: true },
  { nombre: "Producto 27", categoria: "Categoria 2", precio: 3600, stock: 34, activo: true },
  { nombre: "Producto 28", categoria: "Categoria 3", precio: 3700, stock: 20, activo: true },
  { nombre: "Producto 29", categoria: "Categoria 4", precio: 3800, stock: 12, activo: true },
  { nombre: "Producto 30", categoria: "Categoria 5", precio: 3900, stock: 36, activo: true },

  { nombre: "Producto 31", categoria: "Categoria 1", precio: 4000, stock: 25, activo: true },
  { nombre: "Producto 32", categoria: "Categoria 2", precio: 4100, stock: 17, activo: true },
  { nombre: "Producto 33", categoria: "Categoria 3", precio: 4200, stock: 19, activo: true },
  { nombre: "Producto 34", categoria: "Categoria 4", precio: 4300, stock: 27, activo: true },
  { nombre: "Producto 35", categoria: "Categoria 5", precio: 4400, stock: 30, activo: true },
  { nombre: "Producto 36", categoria: "Categoria 1", precio: 4500, stock: 14, activo: true },
  { nombre: "Producto 37", categoria: "Categoria 2", precio: 4600, stock: 22, activo: true },
  { nombre: "Producto 38", categoria: "Categoria 3", precio: 4700, stock: 33, activo: true },
  { nombre: "Producto 39", categoria: "Categoria 4", precio: 4800, stock: 28, activo: true },
  { nombre: "Producto 40", categoria: "Categoria 5", precio: 4900, stock: 24, activo: true }
]);
---
Juan Perez ID: 6a3da74205576bf460228fb6

Producto 2 ID: 6a3dac0805576bf460228fba - stock inicial: 12

db.carritos.insertOne({
  userId: ObjectId("6a3da74205576bf460228fb6"),
  productos: [
    { productoId: ObjectId("6a3dac0805576bf460228fba"), cantidad: 1 },
  ],
  fecha: new Date(),
  total: 1100,
});

db.productos.updateOne(
  { _id: ObjectId("6a3dac0805576bf460228fba") },
  { $inc: { stock: -1 } }
);




Eliminar el producto 40:
db.productos.deleteOne({ _id: ObjectId("6a3dac0805576bf460228fba") });
db.productos.deleteMany(); # MUY PELIGROSO, ELIMINA TODOS LOS PRODUCTOS
db.productos.deleteMany({ stock: { $lt: 20 } }); # Elimina productos con stock menor a 20
 NOOOOOOOOOOOOOOOOOOO


Soft delete: marcar como inactivo en lugar de eliminar físicamente. Con el Producto 39 

DELETE tipo actualización
db.productos.updateOne(
  { _id: ObjectId("6a3dac0805576bf460228fba") },
  { $set: { activo: false } }
);


db.productos.find();


### Nuevo carrito - 
Producto 11 - ID: 6a3dac0805576bf460228fc3 , precio 2.000, stock 16

db.productos.find({ activo: true, stock: { $gt: 0 } }).sort({ precio: 1 });

db.carritos.insertOne({
  userId: ObjectId("6a3da74205576bf460228fb6"),
  productos: [
    { productoId: ObjectId("6a3dac0805576bf460228fc3"), cantidad: 1 },
  ],
  fecha: new Date(),
  total: 2000,
});

db.productos.updateOne(
  { _id: ObjectId("6a3dac0805576bf460228fc3") },
  { $inc: { stock: -1 } }
);

Agregar otro producto al carrito
Producto 12 - ID: 6a3dac0805576bf460228fc4 , precio 2.100, stock 19

db.carritos.updateOne(
  { userId: ObjectId("6a3da74205576bf460228fb6") },
  {
    $push: {
      productos: { productoId: ObjectId("6a3dac0805576bf460228fc4"), cantidad: 1 },
    },
    $inc: { total: 2100 },
  }
);

db.productos.updateOne(
  { _id: ObjectId("6a3dac0805576bf460228fc4") },
  { $inc: { stock: -1 } }
);

db.carritos.find({ userId: ObjectId("6a3da74205576bf460228fb6") });


Simulamos abrir el carrito y ver todos sus datos, incluyendo los productos y sus detalles. Para esto, podemos usar una agregación con `$lookup` para unir la colección de carritos con la colección de productos.



```javascript
db.carritos.aggregate([
  { $match: { userId: ObjectId("6a3da74205576bf460228fb6") } },
  {
    $lookup: {
      from: "productos",
      localField: "productos.productoId",
      foreignField: "_id",
      as: "detallesProductos"
    }
  }
]);
```

y sumamos la cantidad seleccionada

### DB -> Datos RELACIONALES -> MONGODB '$lookup' -> ODM MONGOOSE 'populate'

Buscar el carrito por su ID
Obtener la lista de productos [{id},{id}]

recorrer la lista y buscar los datos de cada producto en la colección productos
FOR lista de productos [{id},{id}]
y por cada elemento aplicar findOne({ _id: ObjectId(id) }) en la colección productos para obtener los detalles de cada producto.

Lo hacemos en pasos:

var carrito = db.carritos.findOne({ _id: ObjectId("ID_DEL_CARRITO") });

carrito.productos.forEach(function(item) {
  var producto = db.productos.findOne({ _id: item.productoId });
  printjson(producto);
});


Eliminar un producto del carrito y actualizar el total y el stock del producto eliminado:

db.carritos.updateOne(
  { userId: ObjectId("6a3da74205576bf460228fb6") },
  {
    $pull: { productos: { productoId: ObjectId("6a3dac0805576bf460228fc4") } },
    $inc: { total: -2100 },
  }
);



### Buenas prácticas en READ

- ✅ Usa **filtros específicos** para mejorar el rendimiento.
- 🔍 Crea **índices** en campos de búsqueda frecuente (`createIndex`).
- ⚡ Evita traer demasiados datos, combina `limit()` y `projection`.

---

## 🔄 UPDATE

### 📘 Descripción general:

Las operaciones de actualización permiten **modificar documentos existentes** en una colección. Se puede actualizar **un solo documento** o **varios documentos**.

### 📌 Sintaxis:

```javascript
db.collection.updateOne(filtro, actualización, opciones);
db.collection.updateMany(filtro, actualización, opciones);
```

- `filtro`: determina qué documentos serán actualizados (igual que en `find()`).
- `actualización`: define los cambios a aplicar usando **operadores de actualización**.
- `opciones`: como `upsert`, que inserta un documento si no existe.

---

### 🎯 Principales operadores de actualización:

| Operador  | Descripción                                              |
| --------- | -------------------------------------------------------- |
| `$set`    | Establece el valor de un campo.                          |
| `$unset`  | Elimina un campo del documento.                          |
| `$inc`    | Incrementa (o decrementa) el valor numérico de un campo. |
| `$rename` | Cambia el nombre de un campo.                            |
| `$min`    | Establece un valor mínimo si el actual es mayor.         |
| `$max`    | Establece un valor máximo si el actual es menor.         |
| `$mul`    | Multiplica el valor numérico de un campo.                |

---

### ✅ Ejemplos prácticos

```javascript
//* Establecer múltiples campos
db.usuarios.updateOne(
  { nombre: "Sara" },
  {
    $set: {
      apellido: "Gómez",
      curso: "Biología",
      edad: 25,
      correo: "ne@gmail.com",
      sexo: "M",
    },
  },
);
```

```javascript
//* Incrementar un campo
db.usuarios.updateOne({ nombre: "Sara" }, { $inc: { edad: 1 } });
// Aumenta la edad de Sara en 1 año
```

```javascript
//* Eliminar un campo del documento
db.usuarios.updateOne({ nombre: "Sara" }, { $unset: { correo: "" } });
// Elimina el campo "correo"
```

```javascript
//* Renombrar un campo
db.usuarios.updateOne({ nombre: "Sara" }, { $rename: { curso: "materia" } });
// Renombra el campo "curso" a "materia"
```

```javascript
//* Usar $min: actualiza solo si el nuevo valor es menor
db.usuarios.updateOne({ nombre: "Sara" }, { $min: { edad: 18 } });
// Si la edad actual es mayor que 18, no la cambia
```

```javascript
//* Usar $max: actualiza solo si el nuevo valor es mayor
db.usuarios.updateOne({ nombre: "Sara" }, { $max: { edad: 30 } });
```

```javascript
//* Usar $mul: multiplicar el valor de un campo
db.usuarios.updateOne({ nombre: "Sara" }, { $mul: { edad: 2 } });
// Duplicará la edad actual
```

```javascript
//* Actualizar varios documentos
db.usuarios.updateMany({ edad: 20 }, { $set: { edad: 101 } });
```

```javascript
//* Insertar si no existe (upsert)
db.usuarios.updateOne(
  { nombre: "Pedro" },
  {
    $set: { edad: 21, curso: "Arte" },
  },
  { upsert: true },
);
// Si Pedro no existe, lo crea con esos datos
```

---

### Buenas prácticas en UPDATE

- ⚠️ **No uses `update()`**, está obsoleto. Usa `updateOne()` o `updateMany()`.
- ✅ Usa `$set` para evitar sobrescribir campos no mencionados.
- 🛠 Usa `upsert` para insertar si no existe, pero asegúrate de no duplicar por error.
- 🔍 Antes de actualizar, puedes verificar con `find()` qué documentos serán afectados.

---

## 🗑️ DELETE

### 📌 Métodos principales:

| Método               | Descripción                                                 |
| -------------------- | ----------------------------------------------------------- |
| `deleteOne(filtro)`  | Elimina el **primer documento** que coincida con el filtro. |
| `deleteMany(filtro)` | Elimina **todos los documentos** que coincidan.             |
| `drop()`             | Elimina toda la colección. ⚠️ Irreversible                  |

---

### ✅ Ejemplos prácticos

```javascript
//* Eliminar un documento por ID
db.usuarios.deleteOne({ _id: ObjectId("60f8a3d9fc13ae2d3c000001") });
```

```javascript
//* Eliminar el primer documento con nombre "Sara"
db.usuarios.deleteOne({ nombre: "Sara" });
```

```javascript
//* Eliminar múltiples documentos por campo
db.usuarios.deleteMany({ sexo: "M" });
```

```javascript
//* Eliminar todos los documentos
db.usuarios.deleteMany({});
```

```javascript
//* Eliminar una colección completa
db.usuarios.drop();
```

---

## 📚 Resumen final

| Operación         | Método exacto                    | Método estimado               | Obsoleto      |
| ----------------- | -------------------------------- | ----------------------------- | ------------- |
| Contar documentos | `countDocuments()` ✅            | `estimatedDocumentCount()` ✅ | `count()` ❌  |
| Actualizar        | `updateOne()`, `updateMany()` ✅ | -                             | `update()` ❌ |
| Eliminar          | `deleteOne()`, `deleteMany()` ✅ | -                             | -             |

---
