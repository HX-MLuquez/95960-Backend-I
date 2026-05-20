const express = require("express");
const { paths } = require("./config/config");
const petsRouter = require("./routes/pets");

const app = express();


function middlewareLogMonitor(req, res, next) {
  const timestamp = new Date().toISOString();
  console.log(`::::::::::[${timestamp}] ${req.method} ${req.url}`);
  //* log timestamp + method + url 
  next();
}


//* MIDLEWARE -> funciones que se ejecutan en el medio del request y response, antes de llegar a la ruta
// Configurar Express para manejar datos de formularios
app.use(express.urlencoded({ extended: true })); // -> FORM - DATA
app.use(express.json()); // -> navegador data por body -> Server {data} <- req.body

console.log("---------->", paths.public);
// Servir archivos estáticos desde la carpeta "public"
//*   Donde los exponemos -> /public  -  y los trae de:
//*                                 ----------> C:\Users\...\CLASE_25-11-03\STATIC-PUBLIC\api\public
//* Se sirve en el cliente en /public -> http://localhost:3000/public/
app.use("/public", express.static(paths.public)) //* OK 'STATIC CONFIG'
app.use(middlewareLogMonitor); //* Middleware de monitoreo de logs

// Usar el router de pets
app.use("/api/pets", petsRouter);

// Si comentamos el Middleware de express.static, podemos acceder a esta route "/", de lo contrario,
// si configuramos el middleware static y dentro de la carpeta public tenemos un index.html, siempre
// se va a cargar el index.html y no la ruta "/"
app.get("/", (req, res) => {
  res.status(200).send("Hola desde el servidor Express!");
});

module.exports = app;
