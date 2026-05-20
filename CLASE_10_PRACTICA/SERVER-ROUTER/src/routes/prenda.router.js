const express = require("express");
const router = express.Router();

const prendasDB = [
  { id: 1, name: "Remera", price: 1000 },
  { id: 2, name: "Pantalon", price: 2000 },
  { id: 3, name: "Camisa", price: 3000 },
];

router.get("/all", (req, res) => {
  try {
    const prendas = prendasDB;
    if (!prendas) {
      return res
        .status(404)
        .json({ status: false, message: "No se encontraron prendas" });
    }
    res.json({ status: true, data: prendas });
  } catch (error) {
    res.status(500).json({ status: false, message: "Error del servidor" });
  }
});

// by id
router.get("/by-id/:id", (req, res) => {
  try {
    const { id } = req.params;
    const prenda = prendasDB.find((p) => p.id === parseInt(id));
    if (!prenda) {
      return res
        .status(404)
        .json({ status: false, message: "No se encontró la prenda" });
    }
    res.json({ status: true, data: prenda });
  } catch (error) {
    res.status(500).json({ status: false, message: "Error del servidor" });
  }
});

// crear
router.post("/create", (req, res) => {
  try {
    const { name, price } = req.body;
    if (!name || !price) {
      return res
        .status(400)
        .json({ status: false, message: "Faltan datos obligatorios" });
    }
    const newPrenda = {
      id: prendasDB.length + 1,
      name,
      price,
    };
    prendasDB.push(newPrenda);
    res.status(201).json({ status: true, data: newPrenda });
  } catch (error) {
    res.status(500).json({ status: false, message: "Error del servidor" });
  }
});

// eliminar
router.delete("/delete/:id", (req, res) => {
  try {
    const { id } = req.params;
    const prendaIndex = prendasDB.findIndex((p) => p.id === parseInt(id));
    if (prendaIndex === -1) {
      return res
        .status(404)
        .json({ status: false, message: "No se encontró la prenda" });
    }
    const deletedPrenda = prendasDB.splice(prendaIndex, 1);
    res.json({ status: true, data: deletedPrenda[0] });
  } catch (error) {
    res.status(500).json({ status: false, message: "Error del servidor" });
  }
});

//* devolver una vista de un producto
router.get("/view/:id", (req, res) => {
  try {
    const { id } = req.params;
    const prenda = prendasDB.find((p) => p.id === parseInt(id));
    if (!prenda) {
      return res
        .status(404)
        .json({ status: false, message: "No se encontró la prenda" });
    }
    // res.render("prenda", { prenda });
    //* Con html interno
    const html = `
      <html>
        <head>
            <title>Detalle de Prenda</title>
        </head>
        <body>
            <h1>${prenda.name}</h1>
            <p>Precio: $${prenda.price}</p>
        </body>
      </html>
    `;
    res.send(html).status(200);
  } catch (error) {
    res.status(500).json({ status: false, message: "Error del servidor" });
  }
});

module.exports = router;

/*
{
delete: "/delete/:id",
get: "/by-id/:id",
get: "/all",
post: "/create"
}

**/
