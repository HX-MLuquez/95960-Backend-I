// let const
var name = "Pepe";
let nameBloque = "por bloque";
const inmutable = 3339;

const mutableLoDeAdentro = []; // {}

// parametros por default

function sumar(a = 1, b = 0) {
  if (true) {
    let nameBloque = "Soy otro nombre por bloque";
    console.log(nameBloque); // Soy otro nombre por bloque
  }
  return a + b;
}

// ...  <- SPREAD

// ``

const lindaData = `${name} es ${nameBloque}`;

// class
class Persona {}

// Promises
// new Promise();

// map es muy usado para Actualizar una lista

const lista = [2, 65, 42];

const result = lista.map((e) => {
  if (e !== 65) {
    return `<div>${e}</div>`;
  } else {
    return `<></>`;
  }
});

// map -> retorna una nueva lista -> ["<div>2</div>", "<></>", "<div>42</div>"]

console.log(result);
