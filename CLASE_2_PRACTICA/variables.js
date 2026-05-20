// console.log(global) // Object [global] 

var edad = 87;

var nombre = "Pepe";

const altura = 21;

edad = 12

const bandera = true;

nombre = "Juan"

// altura = 23 //! Assignment to constant variable.

function siEsViejo(value) {
  if (value > 85) {
    return "si es viejo saas" + nombre;
  } else {
    return "no es viejo bbbnbvd" + nombre;
  }
}

console.log(siEsViejo(edad))

const persona_1 = {
  nombre: "Manuel",
  edad: 28,
  altura: 1.75,
};

const persona_2 = {
  nombre: "Pepe",
  edad: 32,
  altura: 1.80,
};

console.log(persona_1);
console.log(persona_2);

persona_1.tel = 123456789;

console.log(persona_1);

persona_1.nombre = "Jimy"

var nombre = "Manuel";

console.log(nombre);

nombre = "Pepe";

console.log(nombre);

const nombre_const = "Manuel";

console.log(nombre_const);

// nombre_const = "Pepe"; //! Assignment to constant variable.


let nombre_let = "Manuel";

console.log(nombre_let);

if (true) {
  let nombre_let = "Pepe";
  console.log(nombre_let);
}
console.log(nombre_let);

function mostrarNombre() {
  let nombre_let = "Victor";
  console.log(nombre_let);
}
mostrarNombre();

var objeto_malo = {
  nombre: "Manuel",
  edad: 28,
  altura: 1.75,
};

objeto_malo = {};

// [] {}

const objeto_bueno = {
  nombre: "Manuel",
  edad: 28,
  altura: 1.75,
};
