# Proyecto 101 - Clase 5 Teoría

## Iniciar un proyecto con Node.js

1. Crear un nuevo proyecto con npm:

```bash
npm init -y
```

2. Traer la librería 'jose' para trabajar con JWT: este nos ayudará a generar y verificar tokens JWT de manera sencilla. Y estos se utilizan para mantener la sesión de un usuario después de que se autentica, permitiendo que el servidor reconozca al usuario en futuras solicitudes sin necesidad de que vuelva a ingresar sus credenciales.

```bash
npm install jose
```

3. Requerir y usar a 'jose' en nuestro código:

```javascript
// const { SignJWT, jwtVerify } = require('jose');
const jose = require("jose");

// Ejemplo de generación de un token JWT
async function generarToken() {
  const secretKey = new TextEncoder().encode("mi_clave_secreta");
  const token = await new jose.SignJWT({ userId: 123 })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("2h")
    .sign(secretKey);

  console.log("Token JWT generado:", token);
}
generarToken();

module.exports = {
  generarToken
};
```

4. Ver lista de nuestras dependencias globales y locales:

```bash
npm list -g --depth=0
npm list --depth=0
```
