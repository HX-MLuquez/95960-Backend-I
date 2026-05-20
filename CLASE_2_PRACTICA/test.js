console.log("Hola Mundo")

// console.log(global)
// console.log(process)

function sumar(a, b) {
  return a + b;
}

const resultado = sumar(3, 5);
console.log(resultado)

sumar.otro_dato = {
    nombre: "Manuel",
}
console.log(sumar)
console.log(sumar.otro_dato)

const restar = function (a, b) {
    return a - b;
}

restar(10, 5)

// Funciones FLECHA || Arrow Functions 

//   al escribir todo en una línea el return está implícito, sin que lo escriba
const multiplicar = (a, b) => a * b;
