# Clase 18 - BACKEND NODE JS + MONGO DB - FINAL

1. Populations <-> Relaciones. Ejemplo: Un usuario tiene muchos posts, un post tiene muchos comentarios.
2. Indexes <-> Índices. Ejemplo: Un índice en el campo "email" de la colección "usuarios" para mejorar la velocidad de búsqueda.
3. Paginate <-> Paginación. Ejemplo: Mostrar 10 resultados por página en una consulta a la colección "productos".
4. Aggregate <-> Agregaciones. Ejemplo: Calcular el promedio de calificaciones de los productos en la colección "productos" usando el pipeline de agregación.
5. Projections <-> Proyecciones. Ejemplo: Seleccionar solo los campos "nombre" y "precio" de los documentos en la colección "productos" al realizar una consulta.

---

- ¿Qué son las bases de datos?

Es un sistema de almacenamiento de datos que permite organizar, gestionar y acceder a la información de manera eficiente, estructurada y segura.

Las bases de datos pueden ser relacionales (SQL) - TABLAS
o no relacionales (NoSQL) - DOCUMENTOS (JSON)

y se utilizan en aplicaciones para almacenar y recuperar datos de manera rápida y confiable.

- NOSQL:
  - Colecciones: Conjuntos de documentos relacionados, similares a las tablas en bases de datos relacionales.
  - Documentos: Unidades de datos individuales, similares a las filas en bases de datos relacionales, que contienen información estructurada en formato JSON.

1. Populations

Ejemplo app de veterinaria, donde un cliente puede tener varias mascotas y cada mascota puede tener varios registros de visitas al veterinario. En este caso, se pueden establecer relaciones entre las colecciones "clientes", "mascotas" y "visitas" utilizando referencias y el método `populate()` de Mongoose para obtener los datos relacionados en una sola consulta.

```js

userA = {
    _id: ObjectId("64a1f2c3e4b0f1a2b3c4d5e6"),
    nombre: "Juan Pérez",
    email: "juan@gmail.com",
    mascotas: [ObjectId("64a1f2c3e4b0f1a2b3c4d5e7"), ObjectId("64a1f2c3e4b0f1a2b3c4d5e8")],
}

mascota31 = {
    _id: ObjectId("64a1f2c3e4b0f1a2b3c4d5e7"),
    nombre: "Firulais",
    especie: "Perro",
    raza: "Labrador",
    visitas: [],
}

mascota101 = {
    _id: ObjectId("64a1f2c3e4b0f1a2b3c4d5e8"),
    nombre: "Michi",
    especie: "Gato",
    raza: "Siames",
    visitas: [],
}


getDataCompletaUserA = async () => {
    const user = await User.findById("64a1f2c3e4b0f1a2b3c4d5e6").populate({
        Model: "Mascota",
    })

// RETURN:
searchPopulate = {
    _id: ObjectId("64a1f2c3e4b0f1a2b3c4d5e6"),
    nombre: "Juan Pérez",
    email: "juan@gmail.com",
    mascotas: [
        {
            _id: ObjectId("64a1f2c3e4b0f1a2b3c4d5e7"),
            nombre: "Firulais",
            especie: "Perro",
            raza: "Labrador",
            visitas: [],
        },
        {
            _id: ObjectId("64a1f2c3e4b0f1a2b3c4d5e8"),
            nombre: "Michi",
            especie: "Gato",
            raza: "Siames",
            visitas: [],
        },
    ],


```

2. Indexes

Divide y conquista.

    1       2        3      4        5       6       7        8        9        10

[ user12, user17, user23, user51, user52, user60, user180, user182, user184, user188 ]

user188 ir al medio === < >

3 pasos

10 -> 10 -> 5p
20 -> 20 -> 6p
40 -> 40 -> 7p
...

2.000.000 -> 2.000.000 -> 21p

EMAIL -> index

3. Paginate

Librería paginate-v2

4. Aggregate

Es un método de Mongoose que permite realizar operaciones de agregación en la base de datos MongoDB. Las agregaciones son procesos que transforman y combinan datos de una o más colecciones para obtener resultados específicos, como cálculos, filtrado, agrupamiento y ordenamiento.

5. Projections

Nos ayudan a ser más eficientes y más seguros.

Ejemplo:

```js
productComplejoA = {
  _id: ObjectId("64a1f2c3e4b0f1a2b3c4d5e6"),
  nombre: "Producto A",
  descripcion:
    "Este es un producto de ejemplo con muchos detalles y características.",
  precio: 100.0,
  stock: 50,
  categoria: "Electrónica",
  proveedor: {
    nombre: "Proveedor X",
    direccion: "Calle Falsa 123",
    telefono: "555-1234",
  },
  fechaCreacion: ISODate("2024-06-01T10:00:00Z"),
  fechaActualizacion: ISODate("2024-06-10T15:30:00Z"),
};
```

Vamos a buscar para traer solo datos para ver lista de productos, no necesitamos toda la información del producto, solo el nombre, categoría y el precio.

```js
getProducts = async () => {
  const products = await Product.find({}, { nombre: 1, categoria: 1, precio: 1 });
  return products;
};
```
