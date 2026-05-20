const express = require("express");
const app = express();

const handlebars = require("express-handlebars");
const path = require("path");

//* MIDDLEWARE para los archivos estáticos (JS, CSS, etc)
app.use("/public", express.static(path.join(__dirname, "../public")));

//* SOCKET.IO - Pasos
//* 1. Instalar Socket.io -> npm install socket.io

//* 2. Importar el Server de Socket.io
const { Server } = require("socket.io");

console.log("IN SERVER", path.join(__dirname, "views"));
//* SETEO handlebars
app.engine(
  "hbs",
  handlebars.engine({
    extname: ".hbs",
    defaultLayout: "main",
    partialsDir: path.join(__dirname, "views"),
  }),
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  const context = {};
  res.render("pages/home", context);
});

//* 3. Crear el server
const http = require("http");
const server_init = http.createServer(app);

//* 3. Crear el Server de Socket.io
//* a) Iniciar el IO
const io = new Server(server_init);

//* b) Escuchar los eventos de conexión de los clientes
io.on("connection", (socket) => {
  console.log(`Usuario ID: ${socket.id} Conectado!!!`);
  //   socket.on("userNew", (data) => {
  //     console.log(data);
  //     io.emit("userMessage", { message: `Hola Mundo!!!` });
  //   });
  socket.on("disconnect", () => {
    console.log(`Usuario ID: ${socket.id} Desconectado!!!`);
  });
});

//* 4. Configurar el lado del CLIENT
//* a) Inyectar el script de Socket.io en nuestro HTML (main.hbs)
//* b) Crear el script de conexión al Server (index.js) - Implementar 'STATIC' para servir el script al cliente

module.exports = { server_init, app };
