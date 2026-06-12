const express = require("express");
const router = express.Router();


//todo__ ROUTER - Modular Router -> MODULAR get("/api/prendas" function)

router.get("/api/prendas", async (req, res) => {
  try {
    //todo__ MANAGER - DAO (data access object) - pregunta a la DB
    const prendas = await prendasDB;

    //todo__ SERVICE - Lógica de negocio - DB
    if (!prendas) {
      return res
        .status(404)
        .json({ status: false, message: "No se encontraron prendas" });
    }
    //todo__ CONTROLLER - REQ y Respuesta al cliente
    res.json({ status: true, data: prendas });
  } catch (error) {
    res.status(500).json({ status: false, message: "Error del servidor" });
  }
});

module.exports = router;