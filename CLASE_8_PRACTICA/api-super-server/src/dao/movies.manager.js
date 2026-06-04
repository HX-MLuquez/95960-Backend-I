// Vamos a crear nuestro MoviesManager, el cual se encargará de gestionar la lectura y escritura de nuestro archivo `movies.json` utilizando el módulo `fs` de Node.js. Este manager tendrá métodos para obtener todas las películas, obtener una película por su ID, agregar una nueva película, actualizar una película existente y eliminar una película.

const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const dataFilePath = path.join(__dirname, "../", "data");

// console.log(moviesFilePath);

class MoviesManager {
  constructor() {
    this.moviesFile = path.join(dataFilePath, "movies.json");
  }
  // Método para obtener todas las películas
  async getAllMovies() {
    try {
      const data = await fs.readFile(this.moviesFile, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      console.error("Error al leer el archivo de películas:", error);
      throw error;
    }
  }
  // Método para obtener una película por su ID
  async getMovieById(id) {
    try {
      const movies = await this.getAllMovies();
      const movie = movies.find((m) => m.id === id);
      if (!movie) {
        throw new Error(`Película con ID ${id} no encontrada`);
      }
      return movie;
    } catch (error) {
      console.error("Error al obtener la película por ID:", error);
      throw error;
    }
  }

  // Crear una nueva película
  async createMovie(movieData) {
    try {
      const { title, director, releaseYear, genre } = movieData;
      if (!title || !director || !releaseYear || !genre) {
        throw new Error(
          "Faltan campos obligatorios: title, director, releaseYear, genre",
        );
      }
      const movies = await this.getAllMovies();
      const newMovie = {
        id: uuidv4(), // Generar un ID único utilizando uuid
        ...movieData,
      };
      movies.push(newMovie);
      await fs.writeFile(this.moviesFile, JSON.stringify(movies, null, 2));
      return newMovie;
    } catch (error) {
      console.error("Error al crear la película:", error);
      throw error;
    }
  }

  // Actualizar una película existente
  async updateMovie(id, updatedData) {
    try {
      const movies = await this.getAllMovies();
      const movieIndex = movies.findIndex((m) => m.id === id);
      if (movieIndex === -1) {
        throw new Error(`Película con ID ${id} no encontrada`);
      }
      const updatedMovie = { ...movies[movieIndex], ...updatedData };
      movies[movieIndex] = updatedMovie;
      await fs.writeFile(this.moviesFile, JSON.stringify(movies, null, 2));
      return updatedMovie;
    } catch (error) {
      console.error("Error al actualizar la película:", error);
      throw error;
    }
  }
  // Eliminar una película
  async deleteMovie(id) {
    try {
      const movies = await this.getAllMovies();
      const movieIndex = movies.findIndex((m) => m.id === id);
      if (movieIndex === -1) {
        throw new Error(`Película con ID ${id} no encontrada`);
      }
      movies.splice(movieIndex, 1);
      await fs.writeFile(this.moviesFile, JSON.stringify(movies, null, 2));
      return { message: `Película con ID ${id} eliminada` };
    } catch (error) {
      console.error("Error al eliminar la película:", error);
      throw error;
    }
  }
}

module.exports = MoviesManager;

// Usamos aqui como ejemplo

// const moviesManager = new MoviesManager();

// async function testMoviesManager() {
//   //   const result = await moviesManager.getAllMovies();
//   //   console.log("Todas las películas:", result);
//   const movie = await moviesManager.getMovieById("uuid-9012-abcd-efgh");
//   console.log("Película por ID:", movie);
// }

// testMoviesManager();
