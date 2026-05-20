const express = require("express");
const app = express();
const handlebars = require("express-handlebars");
const path = require("path");

//* Importar socket.io
//! ---> *** VER *** <---
const { Server } = require("socket.io");

//* SETEO handlebars
app.engine(
  "hbs",
  handlebars.engine({
    extname: ".hbs",
    defaultLayout: "main",
    partialsDir: path.join(__dirname, "views", "partials"),
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

//* Configuración de archivos estáticos
app.use(express.static(path.join(__dirname, "public")));

//* Middleware
app.use(express.json());

//* Rutas
app.get("/", (req, res) => {
  res.render("index");
});

//*-------------------------------
// app -> {a,b,c,d} -> server {a,b,c,d,w,y,c}
const http = require("http");
const server = http.createServer(app);

//* Levantar el servidor
// const server = app.listen(PORT, () => {
//   console.log(`Servidor escuchando en http://localhost:${PORT}`);
// });

//* Lista de mensajes que se guardan en el servidor (simulando una base de datos)
const messages = [];
const users_connections = [];

//* const messages = [{userConect}{message1}, {message2}, {message3}];

//TODO___ SERVER ____
//* Configuracion de socket.io.

//! ||======================================================||
//  ||======================================================||
//* ||  ||===========   ÁREA DE CÓDIGO   ===============||  ||
//* ||  ||        💻  Escribe tu código aquí  💻       ||  ||
//* ||  ||==================================================||
//! ||======================================================||
const io = new Server(server);

//* Evento de conexión - Cada que se conecta un client se ejecuta su function CB
//! ||======================================================||
//  ||======================================================||
//* ||  ||===========   ÁREA DE CÓDIGO   ===============||  ||
//* ||  ||        💻  Escribe tu código aquí  💻       ||  ||
//* ||  ||==================================================||
//! ||======================================================||

io.on("connection", (socket) => {
  console.log(`Usuario ID: ${socket.id} Conectado!!!`);

  //* Evento cuando un usuario se conecta
  socket.on("userConnect", (data) => {
    console.log("----> ", data); // {user: pepe, id: 12345}
    const connection = {
      socketId: socket.id,
      userId: data.id,
      name: data.user,
    };

    users_connections.push(connection);

    io.emit("serverConnections", users_connections);
  });

  //* Evento cuando un usuario envía un mensaje
  socket.on("userMessage", (data) => {
    console.log("::::data:::::", data);

    const message = {
      socketId: socket.id,
      name: data.user,
      message: data.message,
      timestamp: new Date(),
    };

    messages.push(message);

    io.emit("serverMessages", messages);
  });

  //* Evento cuando un usuario se desconecta
  socket.on("disconnect", () => {
    console.log("Cliente desconectado:", socket.id);

    // Eliminar de la lista de conexiones
    const index = users_connections.findIndex(
      (conn) => conn.socketId === socket.id
    );

    if (index !== -1) {
      users_connections.splice(index, 1);
    }

    io.emit("serverConnections", users_connections);
  });
});


//* Evento de desconexion

module.exports = server;
