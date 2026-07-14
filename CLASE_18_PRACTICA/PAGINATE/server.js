// npm install express mongoose mongoose-paginate-v2 express-handlebars dotenv
// server.js
const express = require("express");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");
const Student = require("./models/student");
const dotenv = require("dotenv");

dotenv.config();
const MONGO_URI = process.env.MONGO_URI;

const PORT = process.env.PORT || 8080;

const app = express();
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración de Handlebars
app.engine(
  "hbs",
  exphbs.engine({
    extname: "hbs",
    defaultLayout: "main",
    runtimeOptions: {
      //* para acceder a datos obj. anidados
      allowProtoPropertiesByDefault: true,
    },
  })
);
app.set("view engine", "hbs");

//* Function para poblar datos
async function initializeStudents() {
  try {
    const count = await Student.countDocuments();
    if (count === 0) {
      console.log("No students found. Inserting sample data...");
      const students = [];
      for (let i = 1; i <= 100; i++) {
        students.push({
          first_name: `FirstName${i}`,
          last_name: `LastName${i}`,
          email: `student${i}@example.com`,
          gender: i % 2 === 0 ? "Male" : "Female",
          grade: Math.floor(Math.random() * 100) + 1,
          group: `Group${Math.ceil(i / 20)}`,
        });
      }
      await Student.insertMany(students);
      console.log("Sample students inserted");
    } else {
      console.log("Students already exist in the collection");
    }
  } catch (err) {
    console.error("Error initializing students:", err.message);
  }
}
// Conectar a MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    // Llamar a la función para inicializar datos si es necesario
    initializeStudents();
  })
  .catch((err) => console.error("MongoDB connection error:", err));

//* RUTA INICIO
app.get("/", (req, res) => {
  res.render("index");
});

//todo____ Ruta para obtener estudiantes con paginación mongoose-paginate-v2 ____odot
//* Modelo de un PAGINATE usando mongoose-paginate-v2
//* debemos en el schema inyectar el plugin mongoosePaginate
//* y esto nos proporciona el método estático paginate
// /students?page=2&limit=5 -> /students?page=3&limit=5
app.get("/students", async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query; // Página actual y límite de resultados por página
    //! Mostrar el paso a paso de como Implementar el paginate con mongoose-paginate-v2
    //! Ir al Model student.js para ver el plugin mongoosePaginate
    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: { grade: -1 },
    };

    // PAGINATE es un tipo de búsqueda con filtros especiales
    // Reemplazar el findAll por paginate y pasarle los filtros y opciones
    const result = await Student.paginate({}, options);
    console.log("......::::", result);

    // console.log(result.docs);
    res.render("students", {
      students: result.docs,
      currentPage: result.page,
      totalPages: result.totalPages,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevPage: result.prevPage,
      nextPage: result.nextPage,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

//todo____ Ruta para obtener estudiantes con paginación sin librería ____odot
//* Modelo de un PAGINATE sin usar ninguna librería
app.get("/students_paginate_natural", async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query; // Página actual y límite (por defecto) de resultados por página
    let pageInt = Math.max(parseInt(page) || 1, 1); // evita valores menores a 1
    let limitInt = parseInt(limit);
    let skip = (pageInt - 1) * limitInt;
    let gradeSort = { grade: -1 }; // Ordenar por calificación del mejor al peor

    const students = await Student.find({})
      .sort(gradeSort)
      .skip(skip)
      .limit(limitInt);

      /*
      page 1 -> 2 -> 3
      limit    10

      skip    1 - 1 * 10 = 0       0 al 10
      skip    2 - 1 * 10 = 10     10 al 20
      skip    3 - 1 * 10 = 20     20 al 30

      */
    const totalDocs = await Student.countDocuments();
    const totalPages = Math.ceil(totalDocs / limit);
    res.render("students_paginate_natural", {
      students,
      currentPage: pageInt,
      totalPages,
      hasPrevPage: pageInt > 1,
      hasNextPage: pageInt < totalPages,
      prevPage: pageInt - 1,
      nextPage: pageInt + 1,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});


/*
resultado: {
  docs: [
    {
      _id: new ObjectId('68d1d807bc332a98d7dcc18d'),
      first_name: 'FirstName25',
      last_name: 'LastName25',
      email: 'student25@example.com',
      gender: 'Female',
      grade: 76,
      group: 'Group2',
      __v: 0
    },
    {
      _id: new ObjectId('68d1d807bc332a98d7dcc1b0'),
      first_name: 'FirstName60',
      last_name: 'LastName60',
      email: 'student60@example.com',
      gender: 'Male',
      grade: 76,
      group: 'Group3',
      __v: 0
    },
    {
      _id: new ObjectId('68d1d807bc332a98d7dcc177'),
      first_name: 'FirstName3',
      last_name: 'LastName3',
      email: 'student3@example.com',
      gender: 'Female',
      grade: 74,
      group: 'Group1',
      __v: 0
    },
    {
      _id: new ObjectId('68d1d807bc332a98d7dcc194'),
      first_name: 'FirstName32',
      last_name: 'LastName32',
      email: 'student32@example.com',
      gender: 'Male',
      grade: 72,
      group: 'Group2',
      __v: 0
    },
    {
      _id: new ObjectId('68d1d807bc332a98d7dcc1a4'),
      first_name: 'FirstName48',
      last_name: 'LastName48',
      email: 'student48@example.com',
      gender: 'Male',
      grade: 72,
      group: 'Group3',
      __v: 0
    },
    {
      _id: new ObjectId('68d1d807bc332a98d7dcc1a6'),
      first_name: 'FirstName50',
      last_name: 'LastName50',
      email: 'student50@example.com',
      gender: 'Male',
      grade: 71,
      group: 'Group3',
      __v: 0
    },
    {
      _id: new ObjectId('68d1d807bc332a98d7dcc176'),
      first_name: 'FirstName2',
      last_name: 'LastName2',
      email: 'student2@example.com',
      gender: 'Male',
      grade: 69,
      group: 'Group1',
      __v: 0
    },
    {
      _id: new ObjectId('68d1d807bc332a98d7dcc19c'),
      first_name: 'FirstName40',
      last_name: 'LastName40',
      email: 'student40@example.com',
      gender: 'Male',
      grade: 69,
      group: 'Group2',
      __v: 0
    },
    {
      _id: new ObjectId('68d1d807bc332a98d7dcc195'),
      first_name: 'FirstName33',
      last_name: 'LastName33',
      email: 'student33@example.com',
      gender: 'Female',
      grade: 68,
      group: 'Group2',
      __v: 0
    },
    {
      _id: new ObjectId('68d1d807bc332a98d7dcc1c1'),
      first_name: 'FirstName77',
      last_name: 'LastName77',
      email: 'student77@example.com',
      gender: 'Female',
      grade: 67,
      group: 'Group4',
      __v: 0
    }
  ],
  totalDocs: 100,
  limit: 10,
  totalPages: 10,
  page: 4,
  pagingCounter: 31,
  hasPrevPage: true,
  hasNextPage: true,
  prevPage: 3,
  nextPage: 5
}

*/