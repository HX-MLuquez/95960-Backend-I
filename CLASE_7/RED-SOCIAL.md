# Base de datos No SQL - MongoDB RedSocial

MongoDB es una base de datos NoSQL orientada a documentos que almacena datos en formato BSON (Binary JSON). Es altamente escalable, flexible y fácil de usar, lo que la convierte en una opción popular para aplicaciones modernas. En esta sección, se describen los pasos para instalar MongoDB, realizar operaciones CRUD y desplegar una aplicación Node.js utilizando MongoDB.

### Estructura de la base de datos

```
red-social
├── usuarios
├── publicaciones
├── comentarios
└── fotos
```

### Graficar el Modelo de los Datos (MongoDB)

### Entidades - Colecciones y sus atributos - Documentos

- usuarios
  - id
  - nombre_completo
  - email
  - contraseña
  - fecha_de_nacimiento
  - amigos (array de ids de usuarios)

- publicaciones
  - id
  - descripcion
  - fecha_de_publicacion
  - id_usuario

- comentarios
  - id
  - mensaje
  - id_usuario
  - id_publicacion

- fotos
  - id
  - url
  - id_publicacion
  - fecha_de_subida

**Una publicación puede tener varias fotos, pero cada foto pertenece a una sola publicación. Una publicación pertenece a un usuario y un usuario puede tener varias publicaciones. Una publicación puede tener varios comentarios, pero cada comentario pertenece a una sola publicación y a un solo usuario. Y un usuario puede tener varios amigos.**

1. Crear una base de datos `red-social`:

```bash
use red-social;
```

2. Crear las colecciones `usuarios`, `publicaciones`, `comentarios` y `fotos`:

```bash
db.createCollection("usuarios");
db.createCollection("publicaciones");
db.createCollection("comentarios");
db.createCollection("fotos");
```

---

## CRUD - Create, Read, Update, Delete

### CREATE - Insertar documentos en las colecciones

3. Crear 1 usuario:

```bash
db.usuarios.insertOne({
  nombre_completo: "Juan Pérez",
  email: "juan.perez@example.com",
  contraseña: "password123",
  fecha_de_nacimiento: new Date("1990-01-01"),
  amigos: [],
});
```

- Consultar el usuario creado:

```bash
db.usuarios.find();
```

4. Crear 3 usuarios:

```bash
db.usuarios.insertMany([
  {
    nombre_completo: "Ana García",
    email: "ana.garcia@example.com",
    contraseña: "password123",
    fecha_de_nacimiento: new Date("1992-05-15"),
    amigos: [],
  },
  {
    nombre_completo: "Luis Martínez",
    email: "luis.martinez@example.com",
    contraseña: "password123",
    fecha_de_nacimiento: new Date("1988-09-20"),
    amigos: [],
  },
  {
    nombre_completo: "María López",
    email: "maria.lopez@example.com",
    contraseña: "password123",
    fecha_de_nacimiento: new Date("1995-12-10"),
    amigos: [],
  },
]);
```

- Crear 2 publicaciones para el usuario Juan Pérez:

```bash
db.publicaciones.insertMany([
  {
    descripcion: "¡Hola a todos! Esta es mi primera publicación.",
    fecha_de_publicacion: new Date(),
    id_usuario: ObjectId("69a82ab31cfbb3b78e228fb5"),
  },
  {
    descripcion: "¡Disfrutando del día! #diversión",
    fecha_de_publicacion: new Date(),
    id_usuario: ObjectId("69a82ab31cfbb3b78e228fb5"),
  },
]);
```

- Crear la foto de una publicación:

```bash
db.fotos.insertOne({
  url: "https://example.com/foto1.jpg",
  id_publicacion: ObjectId("69aeb5852c79a66c33228fb5"),
  fecha_de_subida: new Date(),
});
```

- Crear 2 comentarios de diferentes usuarios para una publicación:

```bash
db.comentarios.insertOne({
  mensaje: "¡Qué linda mascota!",
  id_usuario: ObjectId("69a82c241cfbb3b78e228fb6"),
  id_publicacion: ObjectId("69aeb5852c79a66c33228fb5"),
});

db.comentarios.insertOne({
  mensaje: "parece un delfín",
  id_usuario: ObjectId("69a82c241cfbb3b78e228fb7"),
  id_publicacion: ObjectId("69aeb5852c79a66c33228fb5"),
});
```

---

### READ - Consultar documentos en las colecciones

- Traer todos los usuarios:

```bash
db.usuarios.find();
```

- Traer un usuario por su email:

```bash
db.usuarios.find({ email: "juan.perez@example.com" });
```

- Buscar por objeto id:

```bash
db.usuarios.find({ _id: ObjectId("69a82c241cfbb3b78e228fb6") });
```

- Traer todas las publicaciones:

```bash
db.publicaciones.find();
```

- Traer todas las publicaciones de un usuario:

```bash
db.publicaciones.find({ id_usuario: ObjectId("69a82ab31cfbb3b78e228fb5") });
```

- Traer la foto de una publicación:

```bash
db.fotos.find({ id_publicacion: ObjectId("69aeb5852c79a66c33228fb5") });
```

- Traer los comentarios de una publicación:

```bash
db.comentarios.find({ id_publicacion: ObjectId("69aeb5852c79a66c33228fb5") });
```

---

### UPDATE - Actualizar documentos en las colecciones

Aquí la complejidad de actualizar documentos en MongoDB aumenta debido a que debemos indicar que documento/s queremos actualizar y qué campos queremos modificar. Para estas búsquedas podemos usar el operador lógico `$set` para indicar qué campos queremos modificar y el operador lógico `$inc` para incrementar o decrementar valores numéricos.

- Actualizar un documento, por ejemplo, el nombre completo de un usuario:

```bash
db.usuarios.updateOne(
  { email: "maria.lopez@example.com" }, # criterio de búsqueda - la condición para encontrar el doc
  { $set: { nombre_completo: "Maria de la Cruz Lopez" } } # campos a modificar
);

db.usuarios.updateOne(
  { email: "maria.lopez@example.com" },
  { $set: { nombre_completo: "Maria de la Cruz Lopez" } }
);
```

- Modificar por \_id:

Este \_ID lo obtenemos de la publicación y el id_usuario.

```bash
db.comentarios.updateOne(
  { _id: ObjectId("69aeb75c2c79a66c33228fb9") },
  { $set: { mensaje: "parece un delfín, ¡qué lindo!!!!!!!!!!" } }
);
```

- Actualizar la contraseña a 1234, de varios usuarios donde los que según la fecha de nacimiento nacieron luego del 1990-01-01:

```bash
db.usuarios.updateMany(
  { fecha_de_nacimiento: { $gt: new Date("1990-01-01") } },
  { $set: { contraseña: "12345678" } }
);
```

### DELETE - Eliminar documentos en las colecciones

Que en la práctica, en la realidad los datos no se eliminan, sino que se marcan como eliminados, para no perder la trazabilidad de los datos. Se banean, se desactivan, se eliminan lógicamente (soft delete), pero no se eliminan físicamente.

- Crear una nueva colección usuarios_pro:

usuarios_pro

- id
- nombre_completo
- email
- contraseña
- fecha_de_nacimiento
- amigos (array de ids de usuarios)
- activo (boolean)

```bash
db.createCollection("usuarios_pro");
```

- Insertar un usuario en la colección usuarios_pro:

```bash
db.usuarios_pro.insertOne({
  nombre_completo: "Juan Carlos Cal",
  email: "juan.carlos.cal@example.com",
  contraseña: "12345678",
  fecha_de_nacimiento: new Date("1990-01-01"),
  amigos: [],
  activo: true
});
```

- Crear 3 usuarios en la colección usuarios_pro:

```bash
db.usuarios_pro.insertMany([
  {
    nombre_completo: "Ana García",
    email: "ana.garcia@example.com",
    contraseña: "12345678",
    fecha_de_nacimiento: new Date("1992-05-15"),
    amigos: [],
    activo: true
  },
  {
    nombre_completo: "Luis Fernández",
    email: "luis.fernandez@example.com",
    contraseña: "12345678",
    fecha_de_nacimiento: new Date("1988-09-23"),
    amigos: [],
    activo: true
  },
  {
    nombre_completo: "Carla Martínez",
    email: "carla.martinez@example.com",
    contraseña: "12345678",
    fecha_de_nacimiento: new Date("1995-12-30"),
    amigos: [],
    activo: true
  }
]);
```

- Eliminar tipo SOFT DELETE a un usuario por su email:

```bash
db.usuarios_pro.updateOne(
  { email: "juan.carlos.cal@example.com" },
  { $set: { activo: false } }
);
```

- Buscar los usuarios activos:

```bash
db.usuarios_pro.find({ activo: true });
```

#### Ejemplo usando DELETE

- para eliminar un usuario:

```bash
db.usuarios_pro.deleteOne({ email: "carla.martinez@example.com" });
```

- para eliminar varios usuarios:

```bash
db.usuarios_pro.deleteMany({ fecha_de_nacimiento: { $gt: new Date("1990-01-01") } });
```

### PROYECCIONES - Proyectar campos específicos de los documentos

- Proyectar solo el nombre completo y el email de los usuarios:

```bash
db.usuarios.find({}, { nombre_completo: 1, email: 1, _id: 0 });
```

- Proyectar solo la descripción de las publicaciones de un usuario específico:

```bash
db.publicaciones.find({id_usuario: ObjectId("69aeb75c2c79a66c33228fb9")}, { descripcion: 1, _id: 0 });
```

### SORT - Ordenar los resultados de las consultas

- Ordenar los usuarios por fecha de nacimiento de forma ascendente:

```bash
db.usuarios.find().sort({ fecha_de_nacimiento: 1 });
```

- Ordenar los usuarios por el nombre completo de forma descendente:

```bash
db.usuarios.find().sort({ nombre_completo: -1 });
```

### LIMIT - Limitar el número de resultados de las consultas

- Limitar a 2 el número de usuarios que se muestran:

```bash
db.usuarios.find().limit(2);
```

### SKIP - Omitir un número específico de resultados en las consultas

- Omitir los primeros 2 usuarios y mostrar el resto:

```bash
db.usuarios.find().skip(2);
```

---

### SORT + LIMIT + SKIP - Combinar ordenamiento, limitación y omisión en las consultas

- Ordenar los usuarios por fecha de nacimiento de forma ascendente, omitir los primeros 2 y limitar a 3 el número de usuarios que se muestran:

```bash
db.usuarios.find().sort({ fecha_de_nacimiento: 1 }).skip(2).limit(3);
```

lista-original = [{nombre: "Juan", edad: 30}, {nombre: "Ana", edad: 25}, {nombre: "Luis", edad: 35}, {nombre: "Carla", edad: 28}, {nombre: "María", edad: 22}]

1. Ordena
   lista-ordenada = lista-original.sort((a, b) => a.edad - b.edad) -> [{nombre: "María", edad: 22}, {nombre: "Ana", edad: 25}, {nombre: "Carla", edad: 28}, {nombre: "Juan", edad: 30}, {nombre: "Luis", edad: 35}]

2. Omitir los primeros 2
   lista-omitida = lista-ordenada.slice(2) -> [{nombre: "Carla", edad: 28}, {nombre: "Juan", edad: 30}, {nombre: "Luis", edad: 35}]

3. Limitar a 3 el número de usuarios que se muestran
   lista-limitada = lista-omitida.slice(0, 3) -> [{nombre: "Carla", edad: 28}, {nombre: "Juan", edad: 30}, {nombre: "Luis", edad: 35}]
