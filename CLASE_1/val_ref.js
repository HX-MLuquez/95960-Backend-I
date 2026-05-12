//* Tipos de Datos Primitivos
// str num bool null undf

// console.log(global);

var nombre = "Manuel";

console.log(nombre);

//* THIS
const plantillaRegistro = {
  nombre: "Manuel",
  apellido: "García",
  edad: 28,
  mostrarNombreCompleto: function () {
    console.log(this.nombre + " " + this.apellido);
  },
};

// -> Objeto {}   "{}" JSON -> Navegador
//* Objeto y una function dentro del objeto a fin de los datos del objeto en sí
//*              METODO

console.log(plantillaRegistro);

//----------------------------

// Objetos -> { objeto }  [ array ]  function  <- REFERENCIA

//* En bloques - function if while for --> let
//* Para OBJECT { }  [ ]  function  -->  const
const lista = [1, 3, 67, 5]; // <- AD443-ER
lista_clone = [...lista]; // <- SDRE-09
lista_copia = lista; // <- AD443-ER

lista_copia.push(101);
lista[0] = "bicicleta";

console.log("lista es:", lista);
console.log("lista_copia es:", lista_copia);
console.log("lista_clone es:", lista_clone);

//* Para espacios global o de mucho alcance -->  var

var number = 32;

console.log(number);

number = 45;

console.log(number);
