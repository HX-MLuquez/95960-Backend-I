import fs from "fs/promises"; // File System -> Sistema de archivos
import axios from "axios"; // Para realizar peticiones HTTP a APIs externas
import { v4 as uuidv4 } from "uuid"; // Para generar IDs únicos

const API_BASE_URL = "https://openlibrary.org";
// Traer los primeros 10 libros de la API de Open Library -> /subjects/fiction.json?limit=10
// Traer por ID -> /works/OL66554W.json
// Traer por categoría -> /subjects/romance.json?limit=10
// https://openlibrary.org/authors/OL21594A.json

// FILE MANAGER -> Clase para manejar la lectura y escritura de archivos JSON
class FileManager {
  constructor(filePath) {
    this.filePath = filePath;
  }
  async readFile() {
    try {
      const data = await fs.readFile(this.filePath, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      console.error("Error reading file:", error);
      return null;
    }
  }
  async writeFile(data) {
    try {
      await fs.writeFile(this.filePath, JSON.stringify(data, null, 2), "utf-8");
      console.log(`File written successfully to ${this.filePath}`);
    } catch (error) {
      console.error("Error writing file:", error);
    }
  }
}

// const fileManagerBooks = new FileManager("books.json");
// const fileManagerUsers = new FileManager("users.json");

// ----------------------------------------------------------

// API MANAGER -> Clase para manejar las peticiones a la API de Open Library
class APIManager {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }
  async fetchBooksByCategory(category, limit = 10) {
    try {
      const { data } = await axios.get(
        `${this.baseURL}/subjects/${category}.json?limit=${limit}`,
      );
      return data.works;
    } catch (error) {
      console.error("Error fetching books by category:", error);
      return null;
    }
  }
  async fetchBookByID(id) {
    try {
      const response = await axios.get(`${this.baseURL}/works/${id}.json`);
      return response.data;
    } catch (error) {
      console.error("Error fetching book by ID:", error);
      return null;
    }
  }
  async fetchBooksByTitle(title) {
    try {
      const response = await axios.get(
        `${this.baseURL}/search.json?title=${encodeURIComponent(title)}`,
      );
      return response.data.docs;
    } catch (error) {
      console.error("Error fetching books by title:", error);
      return null;
    }
  }
}

// const apiManager = new APIManager(API_BASE_URL);

//--------------------------------------------------------------------------------------

// BOOK -> Clase para representar un libro
/*
id -> key || uuidv4() (si queremos generar un ID propio)
title -> title || "Unknown Title"
year -> first_publish_year || "Unknown Year"

author -> author_name || authors[0]?.name || "Unknown Author"
category -> subjects (array) || [] 

*/

class Book {
  constructor(book_data) {
    this.id = book_data.key?.replace("/works/", "") || uuidv4();
    this.title = book_data.title || "Unknown Title";
    this.author =
      book_data.authors?.[0]?.name ||
      book_data.author_name?.[0] ||
      "Unknown Author";
    this.year = book_data.first_publish_year || "Unknown Year";
    this.category = book_data.subjects || [];
  }
}

// BOOKS-> Clase para manejar una colección de libros

class Books {
  constructor() {
    // this.books = []; <- es nuestro books.json
    this.fileManagerBooks = new FileManager("books.json");
    this.fileManagerSearchBooks = new FileManager("search_books.json");
    this.apiManager = new APIManager(API_BASE_URL);
  }
  // Métodos de búsqueda
  async searchByCategory(category, limit = 10) {
    try {
      const booksData = await this.apiManager.fetchBooksByCategory(
        category,
        limit,
      );
      const result = booksData.map((book) => {
        const new_book = new Book(book);
        if (new_book.category.length === 0) {
          new_book.category.push(category);
        }
        return new_book;
      });
      await this.fileManagerSearchBooks.writeFile(result);
      return result;
    } catch (error) {
      console.error("Error searching books by category:", error);
      return null;
    }
  }
  async searchByID(id) {
    try {
      if (!id) {
        throw new Error("ID is required for searching by ID");
      }
      const bookData = await this.apiManager.fetchBookByID(id);
      const book = new Book(bookData);
      await this.fileManagerSearchBooks.writeFile([book]);
      return book;
    } catch (error) {
      console.error("Error searching book by ID:", error);
      return null;
    }
  }
  async searchByTitle(title) {
    try {
      if (!title) {
        throw new Error("Title is required for searching by title");
      }
      const booksData = await this.apiManager.fetchBooksByTitle(title);
      const result = booksData.map((book) => new Book(book));
      await this.fileManagerSearchBooks.writeFile(result);
      return result;
    } catch (error) {
      console.error("Error searching books by title:", error);
      return null;
    }
  }

  // Método para agregar un libro a la colección (books.json)
  async addBook(book) {
    try {
      if (!(book instanceof Book)) {
        throw new Error("Invalid book object");
      }
      const existingBooks = (await this.fileManagerBooks.readFile()) || [];

      // Validar si existe ese libro con igual título
      const duplicate = existingBooks.find(
        (b) => b.title.toLowerCase() === book.title.toLowerCase(),
      );
      if (duplicate) {
        throw new Error("A book with the same title already exists");
      }
      existingBooks.push(book);
      await this.fileManagerBooks.writeFile(existingBooks);
      return book;
    } catch (error) {
      console.error("Error adding book:", error);
      return null;
    }
  }
}

//----------------------------------------------------------------------------------------
// USER -> Clase para representar un usuario

class User {
  constructor(firstName, lastName, email) {
    this.id = uuidv4();
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.active = true;
    this.selectedBooks = []; // ID de los libros seleccionados por el usuario
  }

  deactivate() {
    this.active = false;
  }
  activate() {
    this.active = true;
  }
}

// USERS -> Clase para manejar una colección de usuarios
class Users {
  constructor() {
    this.fileManagerUsers = new FileManager("users.json");
  }
  async addUser(user) {
    try {
      const existingUsers = (await this.fileManagerUsers.readFile()) || [];
      // Validar si existe ese usuario con igual email
      const duplicate = existingUsers.find(
        (u) => u.email.toLowerCase() === user.email.toLowerCase(),
      );
      if (duplicate) {
        throw new Error("A user with the same email already exists");
      }
      const new_user = new User(user.firstName, user.lastName, user.email);
      existingUsers.push(new_user);
      await this.fileManagerUsers.writeFile(existingUsers);
      return new_user;
    } catch (error) {
      console.error("Error adding user:", error);
      return null;
    }
  }
  async getAllUsers() {
    try {
      const users = await this.fileManagerUsers.readFile();
      return users || [];
    } catch (error) {
      console.error("Error getting all users:", error);
      return [];
    }
  }
  async getUserByEmail(email) {
    try {
      if (!email) {
        throw new Error("Email is required to search for a user");
      }
      const users = await this.fileManagerUsers.readFile();
      const user = users.find(
        (u) => u.email.toLowerCase() === email.toLowerCase(),
      );
      if (!user) {
        throw new Error("User not found with the provided email");
      }
      return user;
    } catch (error) {
      console.error("Error getting user by email:", error);
      return null;
    }
  }
  async deactivateUser(email) {
    try {
      const users = await this.fileManagerUsers.readFile();
      const userIndex = users.findIndex(
        (u) => u.email.toLowerCase() === email.toLowerCase(),
      );
      if (userIndex === -1) {
        throw new Error("User not found with the provided email");
      }
      users[userIndex].active = false;
      await this.fileManagerUsers.writeFile(users);
      return users[userIndex];
    } catch (error) {
      console.error("Error deactivating user:", error);
      return null;
    }
  }
  // Método para agregar libros a la selección de un usuario
  async selectBookForUser(email, book) {
    try {
      const users = await this.fileManagerUsers.readFile();
      const userIndex = users.findIndex(
        (u) => u.email.toLowerCase() === email.toLowerCase(),
      );
      if (userIndex === -1) {
        throw new Error("User not found with the provided email");
      }
      if (!users[userIndex].active) {
        throw new Error("Cannot select books for an inactive user");
      }
      // [{},{},{}]
      const my_user = users[userIndex];
      if (my_user.selectedBooks.includes(book.id)) {
        throw new Error("Book already selected by the user");
      }
      my_user.selectedBooks.push(book.id);
      await this.fileManagerUsers.writeFile(users);
      return my_user;
    } catch (error) {
      console.error("Error selecting book for user:", error);
      return null;
    }
  }
}

async function main() {
  //   // Ejemplo de uso del API Manager
  //   const booksByTitle = await apiManager.fetchBooksByTitle("Rings");
  //   // console.log("Books found by title:", booksByTitle);
  //   await fileManagerBooks.writeFile(booksByTitle);
  // Ejemplo de uso del File Manager
  //   const result = await fileManagerBooks.readFile();
  //   console.log("Books in file:", result);
  //   await fileManagerBooks.writeFile([
  //     {
  //       id: uuidv4(),
  //       title: "The Great Gatsby",
  //       author: "F. Scott Fitzgerald",
  //       year: 1925,
  //     },
  //   ]);
  // Ejemplo de uso de la clase Books
  //   const booksManager = new Books();
  //   const booksByCategory = await booksManager.searchByCategory("romance", 5);
  //   console.log("Books found by category:", booksByCategory);
  // SUper Ejemplo de uso de la clase Books y Users
  const booksManager = new Books();
  const usersManager = new Users();

  // Buscar libros por categoría ficción
  const booksByCategory = await booksManager.searchByCategory("fiction", 12);
  console.log("Books found by category:", booksByCategory);

  const new_user = await usersManager.addUser({
    firstName: "John",
    lastName: "Doe",
    email: "john@gmail.com",
  });
  console.log("New user added:", new_user);
  // Seleccionar un libro para el usuario
  if (booksByCategory && booksByCategory.length > 0) {
    const selectedBook = booksByCategory[0]; // Seleccionamos el primer libro encontrado
    const updatedUser = await usersManager.selectBookForUser(
      new_user.email,
      selectedBook,
    );
    console.log("User after selecting a book:", updatedUser);
  } else {
    console.log("No books found to select for the user.");
  }
}

main();

/*
Además, Open Library separa bastante sus rutas:

/authors/ → autores
/works/ → obras/libros conceptuales
/books/ → ediciones específicas
/subjects/ → categorías
/search/ → buscador general
*/
