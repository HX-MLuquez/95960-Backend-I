const express = require("express");
const app = express();
const PORT = 3000;

const MoviesManager = require("./dao/movies.manager");
const moviesDaos = new MoviesManager();

// INICIO CON html + diseño
const style = `
  body {
    font-family: Arial, sans-serif;
    background-color: #f0f0f0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    margin: 0;
    }
    h1 {
    color: #333;
    }
    p {
    color: #666;
    }
  `;
const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Api Ejemplo</title>
    <style>
    ${style}
    </style>
</head>
<body>
  <h1>Api Ejemplo</h1>
  <p>Bienvenido a la API de ejemplo</p>
</body>
</html>
`;

// Funcion middleware para monitoreo de rutas   date + url + method + status code + tiempo de respuesta
function logger(req, res, next) {
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    const respuesta = `${new Date().toISOString()} | ${req.method} ${req.originalUrl} | ${res.statusCode} | ${duration}ms`;
    console.log(respuesta);
    req.infoExtra = respuesta;
  });

  next();
}

app.use(logger);

//! BODY IMPORTANTE MIDDLEWARE - req.body -> DATA ENVIADA DESDE EL CLIENTE (postman, navegador, etc) -> JSON
app.use(express.json()); // sin esto la data por body es undefined
//! FORMULARIO -> URLENCODED
app.use(express.urlencoded({ extended: true })); // para formularios - FORM-DATA


app.get("/", (req, res) => {
  res.status(200).send(html);
});
// http://localhost:3000/ <- GET RAIZ -> RESPUESTA: Hello World!

// ------------------------------
/*
### 🛒 Endpoints de Películas (`/api/movies`)

| Método | Ruta    | Función                                      |
| ------ | ------- | -------------------------------------------- |
| GET    | `/`     | Obtener todas las películas                  |
| GET    | `/:pid` | Obtener película por ID                      |
| POST   | `/`     | Crear nueva película (ID se autogenera)      |
| PUT    | `/:pid` | Actualizar campos de la película excepto el ID |
| DELETE | `/:pid` | Eliminar película por ID                     |
*/
// -----------ROUTES-------------------

// 1. | GET    | `/`     | Obtener todas las películas
app.get("/api/movies", async (req, res) => {
  try {
    const movies = await moviesDaos.getAllMovies();

    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las películas" });
  }
});

// 2. | GET    | `/:pid` | Obtener película por ID
/*
PARAMS
params {}
la KEY la definimos desde la RUTA (/:pid) -> pid
params{pid: undefined}

el valor se define desde la LLAMADA desde el CLIENTE (postman, navegador, etc)
http://localhost:3000/api/movies/1234 
-> params{pid: 1234}
*/
app.get("/api/movies/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await moviesDaos.getMovieById(id);
    if (!movie) {
      return res
        .status(404)
        .json({ error: `Película con ID ${id} no encontrada` });
    }
    res.status(200).json(movie);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// 3. | POST   | `/`     | Crear nueva película (ID se autogenera)
app.post("/api/movies", async (req, res) => {
  console.log("req.body:", req.body); // Verificar el contenido de req.body
  const movieData = req.body; // Obtener los datos de la película desde el cuerpo de la solicitud
  try {
    const newMovie = await moviesDaos.createMovie(movieData);
    res.status(201).json(newMovie); // Responder con la película creada
  } catch (error) {
    res.status(400).json({ error: error.message }); // Responder con un error si la creación falla
  }
});
/*
Ejemplo de uso:

newMovie = {
  "title": "Inception",
  "director": "Christopher Nolan",
  "releaseYear": 2010,
  "genre": "Sci-Fi"
}

*/

// 4. | PUT    | `/:pid` | Actualizar campos de la película excepto el ID
app.put("/api/movies/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const updatedMovie = await moviesDaos.updateMovie(id, updateData);
        res.status(200).json(updatedMovie);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// 5. | DELETE | `/:pid` | Eliminar película por ID
app.delete("/api/movies/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const removeMovie = await moviesDaos.deleteMovie(id);
        console.log("removeMovie:", removeMovie, removeMovie, removeMovie);
        res.status(200).send(removeMovie); 
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// ------------------------------
app.get("/pepito", function (req, res) {
  res.send("Hola Pepito");
});


module.exports = { app };

/*
app {

use: function(){} MIDDLEWARES y MODULARIZAR RUTAS

**CRUD** (RUTAS)
post: function(){} CREAR
put: function(){} ACTUALIZAR
delete: function(){} ELIMINAR
get: function(){}LEER

listen: function(){} ARRANCADOR DEL SERVER

rutaPepito: {
url: "/pepito",
method: "get",
handler: function(){res.send("Hola Pepito")}
}

}

app.get("/pepito", function(){res.send("Hola Pepito")}) -> RUTA

**ESTO es el arranque del SERVER**
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Example app listening on PORT http://localhost:${PORT}`)
})
*/

// const objeto = {
//     use: "saraza",
//     listen: "saraza",

// }

// objeto.get = "saraza"
