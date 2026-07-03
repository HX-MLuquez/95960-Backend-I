// Con Faker JS vamos a crear unos 30 user y un admin, y unos 300 books, para poder probar la API

/*
USER MODEL:
name
surname
email
password
role (enum: ["user", "admin"], default: "user")
active (boolean)


BOOK MODEL:
title
author
year
genre
publisher (editorial)
stock
price
active (boolean)
*/

// npm install @faker-js/faker

const { faker } = require("@faker-js/faker");

function generateUsers(numUsers = 30) {
  const users = [];
  for (let i = 0; i < numUsers; i++) {
    const user = {
      name: faker.person.firstName(),
      surname: faker.person.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      role: i === 0 ? "admin" : "user", // el primer usuario será admin, el resto user
      active: true,
    };
    users.push(user);
  }
  return users;
}

function generateBooks(numBooks = 300) {
  const books = [];
  for (let i = 0; i < numBooks; i++) {
    const book = {
      title: faker.lorem.words(3),
      author: faker.person.fullName(),
      year: faker.date.past(50).getFullYear(),
      genre: faker.helpers.arrayElement([
        "Fiction",
        "Non-Fiction",
        "Science Fiction",
        "Fantasy",
        "Mystery",
        "Romance",
        "Horror",
      ]),
      publisher: faker.company.name(),
      stock: faker.number.int({ min: 1, max: 22 }),
      price: faker.commerce.price(5, 100, 2),
      active: true,
    };
    books.push(book);
  }
  return books;
}

module.exports = {
  generateUsers,
  generateBooks,
};
