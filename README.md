# Programación Backend I: Desarrollo Avanzado de Backend - Carreras Intensivas

- Comisión 95960 - Martes y Jueves de 18:30 a 21:00 hs

## Repo

- https://github.com/HX-MLuquez/95960-Backend-I

### Para descargar correr:

```bash
git clone https://github.com/HX-MLuquez/95960-Backend-I.git
```

### Para actualizar el repo correr:

```bash
git pull origin main
```

---

---

## Convivencia

- Respeto
- Canales oficiales

## Metodología de las CLASES

1. Repaso (desde la práctica (con ustedes)) - Teoría
2. Práctica guiada por el profesor 


## Canales

- Plataforma
  - Chat Comisión
  - Chat individuales
  - Mensajes Q&A por zoom -> Ivan -> al Grupal
- Repo

- https://github.com/HX-MLuquez/{numero-de-la-comision}-Backend-I

Ejemplo:

- https://github.com/HX-MLuquez/95960-Backend-I

## En este repositorio iremos trabajando y guardando todo el material del curso

---

# REPASO - ESTRUCTURA de CARPETAS para una API REST con tech Node + Express + Mongo + Mongoose

```bash
api/
│
├── src/
│   │
│   ├── data-access-object/    # or managers/    or dao/
│   │   └── UserManager.js
│   │
│   ├── models/
│   │   └── user.model.js
│   │
│   ├── services/
│   │   └── UserService.js
│   │
│   ├── controllers/
│   │   └── UserController.js
│   │
│   ├── routes/
│   │   └── user.routes.js
│   │
│   ├── database/
│   │    └── connect.js
│   └── app.js
│
│
├── index.js
├── .env
├── .gitignore
├── README.md
└── package.json

```

---

- Ejemplo de flujo de una petición GET a la ruta /api/users para obtener todos los usuarios:

```bash
FLOW

GET http://localhost:3000/api/users

- app.js
app.use("/api", routes);

- routes/index.js
router.use("/users", userRouter)

- routes/userRoutes.js
router.get("/", userController.getAllUsers);

- controllers/userController.js
class UserController {
  async getAllUsers(req, res) {

- services/userService.js
class UserService {
  async getAllUsers() {

- data-access-object/userDao.js

- models/user.model.js

- MongoDB - cloud

```

---

Buenas, cómo están?
ya estamos en clase Programación Backend I: Desarrollo Avanzado de Backend - comisión 95960.
Si no puden acceder a la clase desde la plataforma. Intenten abrir el navegador en modo incógnito, o prueben con otro navegador e ingresen con este link: https://coderhouse.zoom.us/j/91649549789

Nos vemos!
