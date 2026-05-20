# Buenas Prácticas de Programación

1. Declarar con 'const' las:
   - Funciones
   - Objetos {}
   - Arrays []

Ejemplos:

```javascript
// Función declarada con 'const'
const sumar = (a, b) => a + b;
// Objeto declarado con 'const'
const user = {
  name: "John Doe",
  email: "john@gmail.com",
};
// Array declarado con 'const'
const frutas = ["manzana", "banana", "naranja"];
```

2. Declarar con 'const' y todo en mayúscula las constantes constantes:

Son datos que generalmente se usan mucho para la configuración de cosas.

```javascript
const PI = 3.1416;
const API_URL = "https://api.example.com";

const PORT = process.env.PORT || 3000;
```
