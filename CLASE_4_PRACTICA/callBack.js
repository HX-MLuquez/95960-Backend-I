//* Function Callback

function sumar(a, b) {
  return a + b;
}
function restar(a, b) {
  return a - b;
}
function multiplicar(a, b) {
  return a * b;
}
function dividir(a, b) {
  return a / b;
}

function calculadora(
  valA,
  valB,
  tipo,
  cb_sumar,
  cb_restar,
  cb_multiplicar,
  cb_dividir,
) {
  if (tipo === "sumar") {
    return cb_sumar(valA, valB);
  } else if (tipo === "restar") {
    return cb_restar(valA, valB);
  } else if (tipo === "multiplicar") {
    return cb_multiplicar(valA, valB);
  } else if (tipo === "dividir") {
    return cb_dividir(valA, valB);
  }
}
calculadora(2, 4, "sumar", sumar, restar, multiplicar, dividir);

sumar.saludar = () => {
  return "hi";
};
sumar.contador = 101;
console.log(sumar);
console.log(sumar.saludar());

function mult(a, b) {
  return a * b;
}

function calculo(a, b, c, cbSumar, cbMult) {
  const resultA = cbMult(a, b);
  const resultFinal = cbSumar(resultA, c);
  return resultFinal;
}

console.log(calculo(2, 4, 7, sumar, mult));
