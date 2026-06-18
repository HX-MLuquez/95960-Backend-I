const express = require("express");
const app = express();
const http = require("http");
const dev = require("morgan")("dev");
const config = require("./config");
const { Server } = require("socket.io");
const handlebars = require("express-handlebars");

// HANDLEBARS
app.engine(
  "hbs",
  handlebars.engine({
    extname: "hbs",
    defaultLayout: "main.hbs",
    partialsDir: config.path_views + "/partials",
  }),
);
app.set("view engine", "hbs");
app.set("views", config.path_views);

// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(dev);

app.use("/public", express.static("public"));

app.get("/", (req, res) => {
  res.render("index", { title: "Chat Online" });
});

const server = http.createServer(app);

const io = new Server(server);

const fs = require("fs/promises");

async function getMessages() {
  const data = await fs.readFile(config.path_files, "utf-8");
  return JSON.parse(data);
}

async function saveMessages(messages) {
  await fs.writeFile(config.path_files, JSON.stringify(messages, null, 2));
}

io.on("connection", (socket) => {
  console.log("Nuevo cliente conectado", socket.id);

  // Escuhamos cuando alguien se logea y lo guardamos en el archivo
  socket.on("userConnect", async ({ user, id }) => {
    const messages = await getMessages();
    messages.push({
      info: "connection",
      message: `${user} (ID:${id}) se conectó`,
    });
    await saveMessages(messages);
    // Emitimos mensaje de quien se ha conectado (logeado)
    io.emit("serverUserMessage", messages);
  });

  // Escuchamos los mensajes que nos envía el cliente y lo guardamos en el archivo
  socket.on("userMessage", async ({ user, message }) => {
    const messages = await getMessages();

    messages.push({
      info: "message",
      user,
      id: socket.id,
      message,
    });

    await saveMessages(messages);
    io.emit("serverUserMessage", messages);
  });

  socket.on("disconnect", () => {
    console.log("Cliente desconectado", socket.id);
  });
});

module.exports = server;
