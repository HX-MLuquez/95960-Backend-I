const express = require("express");
const router = express.Router();

const users = [
  {
    id: "1",
    nombre: "Juan",
    email: "juan@example.com",
    edad: 25,
  },
  {
    id: "2",
    nombre: "Maria",
    email: "maria@example.com",
    edad: 30,
  },
  {
    id: "3",
    nombre: "Pedro",
    email: "pedro@example.com",
    edad: 28,
  },
];

router.get("/", (req, res) => {
  res.json(users);
});

function middlewareVerHorario(req, res, next) {
  const horaActual = new Date().getHours();
  if (horaActual >= 9 && horaActual <= 18) {
    next();
  } else {
    res.status(403).json({ status: false, message: "Fuera de horario" });
  }
}

function middlewareVerificarTokenParamsId(req, res, next) {
  const { id } = req.params;
  if (id === "1") {
    next();
  } else {
    req.validateToken = false;
    res.status(403).json({ status: false, message: "Token inválido" });
  }
}

router.get("/:id", middlewareVerHorario, middlewareVerificarTokenParamsId, (req, res) => {
  try {
    const { id } = req.params;
    if (req.validateToken === false) {
      return res.status(403).json({ status: false, message: "Token inválido" });
    }
    if (!id) {
      return res.status(404).json({ staus: false, message: "id undefined" });
    }
    const user = users.find((u) => u.id === id);
    if (!user) {
      return res.status(404).json({ status: false, message: "user not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.log("Error: ", error);
  }
});

module.exports = router;
