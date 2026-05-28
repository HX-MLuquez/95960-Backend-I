//* MODULE NATIVO de NODE 'crypto' <- CORE NODE

/*

user: Mauro 
pass: pepe!1234


Encriptar 
pepe!1234 -> método de encriptación de nivel 1 
1. Invierte la cadena -> 4321!epep
2. Agrega 3 valores falsos luego de cada valor real -> 4Kx9v3QaY2LpZ1nU7!HgXePpRtYuIoPeEfAa

Se guarda en la Base de Datos como:

|-------------------|--------------------------------------|
| Usuario           | Contraseña                           |
|-------------------|--------------------------------------|
| Mauro             | 4Kx9v3QaY2LpZ1nU7!HgXePpRtYuIoPeEfAa |
|-------------------|--------------------------------------|

Desencriptar -> método de desencriptación de nivel 1
1. Elimina los valores falsos -> 4321!epep
2. Invierte la cadena -> pepe!1234

---

Hashear

La CONTRASEÑA se HASHEA 

user: Mauro 
pass: pepe!1234

Hashear -> método de hash de nivel 1
1. Se aplica una función de hash a la contraseña -> 5f4dcc3b5aa765d61d8327deb882cf99

|-------------------|--------------------------------------|
| Usuario           | Contraseña                           |   
|-------------------|--------------------------------------|
| Mauro             | 4Kx9v3QaY2LpZ1nU7!HgXePpRtYuIoPeEfAa |   length: 9 caracteres pass original
|-------------------|--------------------------------------|


Validar 
pepe!1234
Hashear -> método de hash de nivel 1
 5f4dcc3b5aa765d61d8327deb882cf99

Cambiar contraseña
pepe!1234  -> 5f4dcc3b5aa765d61d8327deb882cf99
nuevaPass: pepe!5678 -> ---------------------------------

*/

const crypto = require("crypto");

const password = "pepe!1234";

const hash = crypto.createHash("sha256");

console.log(hash);
/*
Hash {
  _options: undefined,
  Symbol(kHandle): Hash {},
  Symbol(kState): { Symbol(kFinalized): false }
}
*/

hash.update(password);

console.log(hash);
/*
Hash {
  _options: undefined,
  Symbol(kHandle): Hash {},
  Symbol(kState): { Symbol(kFinalized): false }
}
*/

const hashedPassword = hash.digest("hex");
console.log(`Contraseña hasheada: ${hashedPassword}`);

/*
f1f40319beeb482578dec6856b0fdfcd8bb658e752c3d956e916208c41b11caa
*/

var db_password =
  "f1f40319beeb482578dec6856b0fdfcd8bb658e752c3d956e916208c41b11caa";

// Para verificar si una contraseña es válida

const input_password = "pepe!1234";

const hash_validate = crypto.createHash("sha256");

hash_validate.update(input_password);

const hashed_input_password = hash_validate.digest("hex");

if (hashed_input_password === db_password) {
  console.log("Contraseña válida");
} else {
  console.log("Contraseña inválida");
}

// Function Validate Password

function validatePassword(input_password, hash_db_password) {
  if (typeof input_password !== "string" || typeof hash_db_password !== "string") {
    throw new Error("Ambos parámetros deben ser cadenas de texto.");
  }
  const hash_validate = crypto.createHash("sha256");
  hash_validate.update(input_password);
  const hashed_input_password = hash_validate.digest("hex");
  return hashed_input_password === hash_db_password;
}


// Función para cambio de contraseña
function changePassword(input_password, hash_db_password, new_password) {
  if (typeof input_password !== "string" || typeof hash_db_password !== "string" || typeof new_password !== "string") {
    throw new Error("Todos los parámetros deben ser cadenas de texto.");
  }
  if (!validatePassword(input_password, hash_db_password)) {
    throw new Error("La contraseña actual es incorrecta.");
  }
  const hash_new = crypto.createHash("sha256");
  hash_new.update(new_password);
  db_password = hash_new.digest("hex");
  return db_password;
}

try {
  const new_hashed_password = changePassword("pepe!1234", db_password, "pepe!5678");
  console.log(`Nueva contraseña hasheada: ${new_hashed_password}`);
} catch (error) {
  console.error(error.message);
}

console.log(`Contraseña en DB después del cambio: ${db_password}`);
