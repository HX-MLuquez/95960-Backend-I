const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World! hey hey ehy OSO OSO MAR mAR");
});

// DAR JSON - API REST
app.get("/api/productos", (req, res) => {
  const productos = [
    { id: 1, name: "Producto 1", price: 10 },
    { id: 2, name: "Producto 2", price: 20 },
    { id: 3, name: "Producto 3", price: 30 },
  ];
  res.json(productos);
});

// DAR UNA VISTA - RENDERIZAR HTML
const estilo = `
  body {
    font-family: Arial, sans-serif;
    background-color: #f0f0f0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    margin: 0;
    }`;

const html = `
    <html>
    <head>
      <title>Vista Renderizada</title>
      <style>${estilo}</style>
    </head>
    <body>
      <h1>Hola, esta es una vista renderizada</h1>
      <p>¡Bienvenido a mi sitio web!</p>
    </body>
    </html>
  `;

app.get("/vista/:edad", (req, res) => {
  console.log("Viendo el REQ...", req.body, req.params, req.query);

  const { edad } = req.params;
  const { nombre, apellido } = req.query;
  try {
    if (!nombre || !apellido) {
      return res
        .status(400)
        .send("Faltan parámetros: nombre y apellido son requeridos");
    }
    if (isNaN(edad)) {
      return res.status(400).send("El parámetro edad debe ser un número");
    }
    res.status(200).send(`
    <html>
    <head>
      <title>Vista Renderizada</title>
      <style>${estilo}</style>
    </head>
    <body>
      <h1>Hola, esta es una vista renderizada</h1>
      <p>¡Bienvenido a mi sitio web!</p>
        <p>Tu edad es: ${edad}</p>
        <p>Tu nombre es: ${nombre}</p>
        <p>Tu apellido es: ${apellido}</p>
    </body>
    </html>
  `);
  } catch (error) {
    console.error("Error al procesar la solicitud:", error);
    res.status(500).send("Error interno del servidor");
  }
});


// 404 - Not Found
app.use((req, res) => {
  res.status(404).send("<h1>404 - Página no encontrada</h1><p>La página que buscas no existe.</p>");
});

app.listen(port, () => {
  console.log(
    `Example app listening on port http://localhost:${port}/vista/25?nombre=Juan&apellido=Perez`,
  );
});
