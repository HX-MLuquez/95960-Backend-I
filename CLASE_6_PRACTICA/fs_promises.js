const fs = require("fs").promises;

const path = require("path");

const pathFile = path.join(__dirname, "data", "users.json");

// Leer un archivo de texto

const readFileUsers = async () => {
  try {
    const data = await fs.readFile(pathFile, "utf-8");
    const users = JSON.parse(data);
    console.log(users);
    return users;
  } catch (error) {
    console.log("Error al leer el archivo:", error);
  }
};

const createFileUsers = async (users) => {
  try {
    const data = JSON.stringify(users, null, 2);
    await fs.writeFile(pathFile, data, "utf-8");
    console.log("Archivo creado exitosamente");
    return true;
  } catch (error) {
    console.log("Error al crear el archivo:", error);
    return false;
  }
};

const deleteFileUsers = async () => {
  try {
    await fs.unlink(pathFile);
    console.log("Archivo eliminado exitosamente");
    return true;
  } catch (error) {
    console.log("Error al eliminar el archivo:", error);
    return false;
  }
};

// readFileUsers();

// Funcion crear un usuario nuevo y guardarlo en el archivo

const createUser = async (user) => {
  try {
    if (!user) {
      throw new Error("No se proporcionó un usuario válido");
    }
    user.active = true;
    const users = await readFileUsers();
    users.push(user);
    await createFileUsers(users);
    console.log("Usuario creado exitosamente");
    return `User ${user.nombre} creado exitosamente`;
  } catch (error) {
    console.log("Error al crear el usuario:", error);
    return `Error al crear el usuario: ${error.message}`;
  }
};

// Funcion de buscar por email
const findUserByEmailActive = async (email) => {
  try {
    const users = await readFileUsers();
    const user = users.find((u) => u.email === email);
    if (!user) {
      throw new Error("Usuario no encontrado");
    }
    if (!user.active) {
      throw new Error("Usuario inactivo");
    }
    return user.nombre;
  } catch (error) {
    console.log("Error al buscar el usuario:", error);
    return null;
  }
};

// Soft delete de un usuario por ID
const softDeleteUserById = async (id) => {
  try {
    const users = await readFileUsers();
    const userIndex = users.findIndex((u) => u.id === id);
    if (userIndex === -1) {
      throw new Error("Usuario no encontrado");
    }
    users[userIndex].active = false;
    await createFileUsers(users);
    console.log("Usuario desactivado exitosamente");
    return `User with ID ${id} desactivado exitosamente`;
  } catch (error) {
    console.log("Error al desactivar el usuario:", error);
    return `Error al desactivar el usuario: ${error.message}`;
  }
};

// MAIN
const userBob = {
  id: "3f617c53-4f1f-4e26-bb24-33243243",
  nombre: "Bob",
  apellido: "Lopez",
  edad: 34,
  curso: "Back MCCVI",
  email: "bob@gmail.com",
};

const userAlice = {
  id: "3f617c53-4f1f-11111-bb24-33243243",
  nombre: "Alice",
  apellido: "Smith",
  edad: 28,
  curso: "Front MCCVI",
  email: "alice@example.com",
};
async function main() {
  // await createUser(userBob);
  // await createUser(userAlice);
  const userFound = await findUserByEmailActive("alice@example.com");
  console.log("Usuario encontrado:", userFound);
  console.log("Proceso finalizado");

  const softDeleteBob = await softDeleteUserById("3f617c53-4f1f-4e26-bb24-33243243");
  console.log(softDeleteBob);
}
main();
module.exports = {
  readFileUsers,
  createFileUsers,
  deleteFileUsers,
  createUser,
  findUserByEmailActive,
  softDeleteUserById,
};
