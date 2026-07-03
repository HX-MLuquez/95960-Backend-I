# MONGOOSE Ejemplo de uso de Mongoose con MongoDB

Es una app de Libros, que permite crear, leer, actualizar y eliminar libros de una base de datos MongoDB.

Y un usuario puede seleccionar un libro y ver sus detalles, como el título, el autor, la descripción y la fecha de publicación. Y puede agregar un libro a su carrito de compras.

### Informe de error

**Error:** `POST /api/mock 500 Internal Server Error`

**Descripción:**
Al hacer una petición `POST` a `/api/mock` para generar datos ficticios con Faker.js, el servidor respondía con un error 500.

**Causa:**
El proyecto utiliza `@faker-js/faker` en su versión `^10.5.0`. A partir de la versión 9, Faker.js eliminó varios métodos que habían sido marcados como deprecados en versiones anteriores. El archivo `src/mock/index.js` seguía usando la API antigua, lo que provocaba que las funciones lanzaran un error en tiempo de ejecución.

| Método deprecado (v8 y anteriores) | Método correcto (v9+)      |
| ---------------------------------- | -------------------------- |
| `faker.name.firstName()`           | `faker.person.firstName()` |
| `faker.name.lastName()`            | `faker.person.lastName()`  |
| `faker.name.findName()`            | `faker.person.fullName()`  |
| `faker.company.companyName()`      | `faker.company.name()`     |
| `faker.datatype.number()`          | `faker.number.int()`       |

**Solución:**
Se actualizaron todos los métodos en `src/mock/index.js` para usar la API vigente de `@faker-js/faker` v10, reemplazando los namespaces `name` y `company` por `person` y `company.name()`, y `datatype.number()` por `number.int()`.
