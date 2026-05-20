const express = require("express");
const app = express();
//* 1. Instalar express y socket.io
//* 2. Importar socket.io
const { Server } = require("socket.io");
const handlebars = require("express-handlebars");

const path = require("path");
console.log("IN SERVER", path.join(__dirname, "views"));
app.use("/public", express.static(path.join(__dirname, "../public")));

//* SETEO handlebars
app.engine(
  "hbs",
  handlebars.engine({
    extname: ".hbs",
    defaultLayout: "main",
    partialsDir: path.join(__dirname, "views"),
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

//! Prolema - estaba devolviendo un texto plano, no un html renderizado, y al
//! No renderizar la vista, no inyectaba ni el script de socket.io (<script src="/socket.io/socket.io.js"></script>) 
//! ni el script del .js (public/js/socket-client.js) 

//! app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

//* Renderizamos la vista home.hbs
app.get("/", (req, res) => {
  res.render("pages/home"); 
});

//* 3. Crear el server
const http = require("http");
const server_init = http.createServer(app);

//* 4. Iniciar el IO
const io = new Server(server_init);

io.on("connection", (socket) => {
  console.log(`Usuario ID: ${socket.id} Conectado!!!`);
  socket.on("userNew", (data) => {
    console.log(data);
    io.emit("userMessage", { message: `Hola Mundo!!!` });
  });

  socket.on("disconnect", () => {
    console.log(`Usuario ID: ${socket.id} Desconectado!!!`);
  });
});

module.exports = { app, server_init };
