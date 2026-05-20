/*
window - NAVEGADOR

global {} - NODE
process {} - NODE -> nace y muere con el programa 

axios {} - Librería para hacer peticiones HTTP (fetch es nativo de JS, pero axios es más fácil de usar) 

fs -> File System {} -> módulo nativo de Node para trabajar con archivos (leer, escribir, eliminar, etc)

*/

const fs = require("fs").promises;
/*

readFile
writeFile
appendFile
unlink


*/

async function escribirArchivo() {
  try {
    await fs.writeFile("archivo.txt", "Hola mundo");
    console.log("Archivo escrito correctamente");
  } catch (error) {
    console.error("Error al escribir el archivo: ", error);
  }
}

async function leerArchivo() {
  try {
    const data = await fs.readFile("archivo.txt", "utf-8"); // ñ Ó áéíóú
    console.log("Contenido del archivo: ", data);
  } catch (error) {
    console.error("Error al leer el archivo: ", error);
  }
}

async function eliminarArchivo() {
  try {
    await fs.unlink("archivo.txt");
    console.log("Archivo eliminado correctamente");
  } catch (error) {
    console.error("Error al eliminar el archivo: ", error);
  }
}

async function modificarArchivo() {
  try {
    await fs.appendFile("archivo.txt", "\nAgregando una nueva línea");
    console.log("Archivo modificado correctamente");
  } catch (error) {
    console.error("Error al modificar el archivo: ", error);
  }
}

async function fetchData() {
  try {
    await escribirArchivo();
    await leerArchivo();
    await modificarArchivo();
    await leerArchivo();
    await eliminarArchivo();
  } catch (error) {
    console.error("Error en fetchData: ", error);
  }
}

fetchData();

// JSON - read y write
const persona_juan = {
  nombre: "Juan",
  edad: 308888,
  ciudad: "Buenos Aires",
};

async function escribirJSON(data) {
  try {
    await fs.writeFile("data.json", JSON.stringify(data, null, 2));
    console.log("Archivo JSON escrito correctamente");
  } catch (error) {
    console.error("Error al escribir el archivo JSON: ", error);
  }
}

async function leerJSON() {
  try {
    const data = await fs.readFile("data.json", "utf-8");
    const jsonData = JSON.parse(data);
    console.log("Contenido del archivo JSON: ", jsonData);
    return jsonData;
  } catch (error) {
    console.error("Error al leer el archivo JSON: ", error);
  }
}

// reutilizar las funciones de escribir y leer JSON para actualizar el archivo con nueva información
async function actualizarJSON() {
  try {
    const leer = await leerJSON();
    console.log("Data leída del archivo JSON: ", leer);
    const nuevoData = { ...leer, ciudad: "Córdoba" };
    console.log("Nuevo data: ", nuevoData);
    await escribirJSON(nuevoData);
    console.log("Archivo JSON actualizado correctamente");
  } catch (error) {
    console.error("Error al actualizar el archivo JSON: ", error);
  }
}

async function main() {
  await actualizarJSON();
  await escribirJSON(persona_juan);
}

main();
