# Api de Ejemplo con Express y una Arquitectura escalable

## Entrega N.º 1 – API con FileSystem

### Objetivo General

Desarrollar un servidor que gestione películas utilizando archivos (`movies.json`) como sistema de persistencia.

- Lista de atributos de una película:
  - `id` (número, autogenerado)
  - `title` (cadena)
  - `director` (cadena)
  - `releaseYear` (número)
  - `genre` (cadena)

```json
{
    "id": 1,
    "title": "The Shawshank Redemption",
    "director": "Frank Darabont",
    "releaseYear": 1994,
    "genre": "Drama"
}
```

---

### Estructura General

- Servidor en **Node.js** con **Express**
- Escucha en puerto `3000` u `8080`
- Un grupo de rutas:
  - `/api/movies`

- Rutas implementadas con **Express Routers**

---

### 🛒 Endpoints de Películas (`/api/movies`)

| Método | Ruta    | Función                                      |
| ------ | ------- | -------------------------------------------- |
| GET    | `/`     | Obtener todas las películas                  |
| GET    | `/:pid` | Obtener película por ID                      |
| POST   | `/`     | Crear nueva película (ID se autogenera)      |
| PUT    | `/:pid` | Actualizar campos de la película excepto el ID |
| DELETE | `/:pid` | Eliminar película por ID                     |

---

### 💾 Persistencia de Datos

- Se utiliza el módulo **FileSystem (`fs`)**
- Archivos: `movies.json`
- Se implementa un `movies.manager.js` dentro de la carpeta /managers o /dao