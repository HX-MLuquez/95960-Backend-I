# Repaso de:

1. ROUTER
   - Router es una clase de Express
   - Esa clase nos permite Modular nuestras rutas

```js
// esto es mis_productos.js
const router = require("express").Router();
// Es igual a:
// const express = require('express');
// const router = express.Router();

router.get("/ruta", (req, res) => {
  res.send("Hola mundo");
});

module.exports = router;

// desde app.js
const routes = require("./mis_productos");

app.use("/api/productos", routes);
```

2. MIDDLEWARE
   - Un puente entre el cliente -> hace solicitud -> REQ y el servidor | f() f() f() endpoint 1 <- RES

```js
const express = require("express");
const app = express();

app.use(Middleware1);
app.use(Middleware2);

// Otra manera de usar middleware específico para una ruta
app.get("/ruta", Middleware3, Middleware4, (req, res) => {});
```

3. ARQUITECTURA MVC

- Modelo Vista Controlador
- Modelo: Es la parte que se encarga de la lógica de negocio, la interacción con la base de datos, etc. Es la parte que se encarga de manejar los datos de la aplicación.
- Vista: Es la parte que se encarga de la presentación de la aplicación, es decir, lo que el usuario ve. Es la parte que se encarga de mostrar los datos al usuario.
- Controlador: Es la parte que se encarga de manejar las solicitudes del usuario, es decir, es la parte que se encarga de recibir las solicitudes del usuario, procesarlas y devolver una respuesta. Es la parte que se encarga de conectar el modelo con la vista.

Ejemplo:

```bash
src/
    models/
        productosModel.js
    dao/
        productosDao.js
    services/
        productosService.js
    controllers/
        productosController.js
    routes/
        productosRoutes.js
    views/
        productosView.hbs
    app.js
index.js
README.md
.gitignore
.env
```

4. STATIC

- MIDDLEWARE que nos permite servir archivos estáticos, como imágenes, CSS, JavaScript, etc. Es decir, es un middleware que nos permite servir archivos que no cambian, como por ejemplo una imagen de un logo, un archivo CSS para darle estilo a nuestra aplicación, etc.

```js
app.use("/static", express.static("public"));
// Esto nos permite servir archivos estáticos desde la carpeta "public". Por ejemplo, si tenemos una imagen en public/logo.png, podemos acceder a ella desde http://localhost:3000/static/logo.png
```

5. MULTER

- Librería donde seteamos el storage y creamos el upload que es un middleware que nos permite manejar la subida de archivos. Es decir, es una librería que nos permite manejar la subida de archivos desde el cliente al servidor.

```js
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });
app.post("/upload", upload.single("file"), (req, res) => {
  res.send("Archivo subido");
});

app.post("/upload-multiple", upload.array("files", 5), (req, res) => {
  res.send("Archivos subidos");
});
```

6. HANDLEBARS

- Motor de plantillas para generar HTML dinámico -> Vistas - APP
