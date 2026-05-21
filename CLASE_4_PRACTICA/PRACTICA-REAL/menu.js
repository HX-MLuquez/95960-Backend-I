import sistemaArchivos from "fs/promises"; // Sistema de archivos
import axios from "axios"; // Para realizar peticiones HTTP a APIs externas
import { v4 as generarUUID } from "uuid"; // Para generar IDs únicos

const URL_BASE_API = "https://openlibrary.org";

// Traer los primeros 10 libros de la API de Open Library
// -> /subjects/fiction.json?limit=10

// Traer libro por ID
// -> /works/OL66554W.json

// Traer libros por categoría
// -> /subjects/romance.json?limit=10


// -----------------------------------------------------------------------------
// GESTOR DE ARCHIVOS -> Clase para manejar lectura y escritura de archivos JSON
// -----------------------------------------------------------------------------

class GestorArchivos {
  constructor(rutaArchivo) {
    this.rutaArchivo = rutaArchivo;
  }

  async leerArchivo() {
    try {
      const datos = await sistemaArchivos.readFile(this.rutaArchivo, "utf-8");
      return JSON.parse(datos);

    } catch (error) {
      console.error("Error al leer el archivo:", error);
      return null;
    }
  }

  async escribirArchivo(datos) {
    try {
      await sistemaArchivos.writeFile(
        this.rutaArchivo,
        JSON.stringify(datos, null, 2),
        "utf-8"
      );

      console.log(`Archivo escrito correctamente en ${this.rutaArchivo}`);

    } catch (error) {
      console.error("Error al escribir el archivo:", error);
    }
  }
}

const gestorArchivosLibros = new GestorArchivos("libros.json");
// const gestorArchivosUsuarios = new GestorArchivos("usuarios.json");


// -----------------------------------------------------------------------------
// GESTOR API -> Clase para manejar peticiones a la API de Open Library
// -----------------------------------------------------------------------------

class GestorAPI {
  constructor(urlBase) {
    this.urlBase = urlBase;
  }

  async obtenerLibrosPorCategoria(categoria, limite = 10) {
    try {
      const respuesta = await axios.get(
        `${this.urlBase}/subjects/${categoria}.json?limit=${limite}`
      );

      return respuesta.data.works;

    } catch (error) {
      console.error("Error al obtener libros por categoría:", error);
      return null;
    }
  }

  async obtenerLibroPorID(id) {
    try {
      const respuesta = await axios.get(
        `${this.urlBase}/works/${id}.json`
      );

      return respuesta.data;

    } catch (error) {
      console.error("Error al obtener libro por ID:", error);
      return null;
    }
  }

  async obtenerLibrosPorTitulo(titulo) {
    try {
      const respuesta = await axios.get(
        `${this.urlBase}/search.json?title=${encodeURIComponent(titulo)}`
      );

      return respuesta.data.docs;

    } catch (error) {
      console.error("Error al obtener libros por título:", error);
      return null;
    }
  }
}

const gestorAPI = new GestorAPI(URL_BASE_API);


// -----------------------------------------------------------------------------
// LIBRO -> Clase para representar un libro
// -----------------------------------------------------------------------------


// -----------------------------------------------------------------------------
// LIBROS -> Clase para manejar una colección de libros
// -----------------------------------------------------------------------------


// -----------------------------------------------------------------------------
// SOLO CON STATIC -> Propiedades y métodos estáticos (de clase)
// -----------------------------------------------------------------------------


// -----------------------------------------------------------------------------
// USUARIO -> Clase para representar un usuario
// -----------------------------------------------------------------------------


// -----------------------------------------------------------------------------
// USUARIOS -> Clase para manejar una colección de usuarios
// -----------------------------------------------------------------------------


async function principal() {

  // Ejemplo de uso del Gestor API

  // const librosPorTitulo =
  //   await gestorAPI.obtenerLibrosPorTitulo("Rings");

  // console.log("Libros encontrados:", librosPorTitulo);

  // await gestorArchivosLibros.escribirArchivo(librosPorTitulo);


  // ---------------------------------------------------------------------------


  // Ejemplo de uso del Gestor de Archivos

  // const resultado = await gestorArchivosLibros.leerArchivo();

  // console.log("Libros en el archivo:", resultado);

  // await gestorArchivosLibros.escribirArchivo([
  //   {
  //     id: generarUUID(),
  //     titulo: "El Gran Gatsby",
  //     autor: "F. Scott Fitzgerald",
  //     anio: 1925,
  //   },
  // ]);
}

principal();