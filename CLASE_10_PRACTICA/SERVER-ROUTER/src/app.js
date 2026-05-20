const express = require("express");
const app = express();
const routes = require("./routes/index"); // index.js <- {{/users}{/products}}
// const routesProducts = require("./routes/product.router"); // index.js

// const prendasDB = [
//   { id: 1, name: "Remera", price: 1000 },
//   { id: 2, name: "Pantalon", price: 2000 },
//   { id: 3, name: "Camisa", price: 3000 },
// ];

function middlewareVerHorario(req, res, next) {
  const horaActual = new Date().getHours();
  if (horaActual >= 9 && horaActual <= 18) {
    next();
  } else {
    res.status(403).json({ status: false, message: "Fuera de horario" });
  }
}

//* MIDDLEWARE GLOBAL
// app.use(middlewareVerHorario); // se ejecuta en todas las rutas
app.use(express.json()); // {} por body es de lectura
app.use(express.urlencoded({ extended: true })); // form -> urlencoded

app.get("/", (req, res) => {
  res.json({ API: "BACKEND - ROUTER", break: "a las 21:15 volvemos" });
});

// app.get("/api/prendas", (req, res) => {
//   try {
//     const prendas = prendasDB;
//     if (!prendas) {
//       return res
//         .status(404)
//         .json({ status: false, message: "No se encontraron prendas" });
//     }
//     res.json({ status: true, data: prendas });
//   } catch (error) {
//     res.status(500).json({ status: false, message: "Error del servidor" });
//   }
// });

/*
routes/index.js
router.use("/products", productsRouter); //  /api/products/  y /api/products/:id
router.use("/users", usersRouter);
router.use("/cart", cartRouter);
module.exports = router;

/api/products/  
/api/users/
/api/cart/
*/
app.use("/api", routes);
// const productsRouter = require("./routes/product.router");
// const usersRouter = require("./routes/user.router");
// const cartRouter = require("./routes/cart.router");

// app.use("/api/products", productsRouter);
// app.use("/api/users", usersRouter);
// app.use("/api/cart", cartRouter);

/*
http://localhost:8080/

http://localhost:8080/api/
                    http://localhost:8080/api/users
                                                  /
                                                  /gender
                    http://localhost:8080/api/products
                                                   /
                                                   /324234
                    http://localhost:8080/api/cart
*/

/*
Sin el index router

const productsRouter = require("./routes/product.router")
const usersRouter = require("./routes/product.router")
app.use("/api", productsRouter)
app.use("/api", usersRouter)
*/

module.exports = app;
