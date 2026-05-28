//* module HTTP es nativo de NODE y no necesitamos instalar

// import http from "http"

const http = require("http");
// http -> { }

const PORT = 3003;

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(`
    <html>
      <head>
        <title>Servidor HTTP con Node.js</title>
      </head>
      <body>
        <h1>Hola mundo desde mi servidor HTTP!</h1>
      </body>
    </html>
  `);
});

server.listen(PORT, () => {
  console.log(
    `Servidor HTTP está escuchando en el puerto http://localhost:${PORT}` // <- pepe.com
  );
});

module.exports ={
  server
}


/*

Vamos a un descanso - VOLVEMOS a las 11:11  !!!!!!!!!!
*/