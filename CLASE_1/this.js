// {
//* THIS
var nombre = "El Chavo"

console.log(nombre)

//* THIS
const plantillaRegistro = {
    nombre: "",
    apellido: "",
    edad: 0,
    mostrarNombreCompleto: function() {
        console.log("Mi nombre es: ", this.nombre) 
    },
    modificarEdad: function(nuevaEdad) {
        this.edad = nuevaEdad
    },
    cargarDatos: function(nombre, apellido, edad) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
    }
}

const persona_1 = {...plantillaRegistro}

persona_1.cargarDatos("Manuel", "García", 28)

const persona_2 = {...plantillaRegistro}


plantillaRegistro.mostrarNombreCompleto()

console.log(plantillaRegistro)

plantillaRegistro.modificarEdad(30)

console.log(plantillaRegistro)
//* Objeto y una function dentro del objeto a fin de los datos del objeto en sí
//*              METODO

var code = "101"
console.log(plantillaRegistro)

function mostrarNombre() {
    const code = "1234"
    console.log(nombre)
    function mostrarCodigo() {
        console.log(code)
    }
    mostrarCodigo()
}
mostrarNombre()
// console.log(code) //! ReferenceError: code is not defined

//----------------------------

// }