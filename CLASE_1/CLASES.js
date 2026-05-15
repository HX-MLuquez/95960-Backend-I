//* CLASES

//* THIS es un PUNTERO que por defecto apunta al GLOBAL y tienen todas las variables
var nombre = "Marta";

const personaObjeto = {
  //* Esta es la data a moldear
  nombre: "Pepe",
  edad: 21,
  peso: 87,
  //* Acá tenemos los métodos que van a interactuar a la data
  getNombre: function () {
    console.log("Soy " + this.nombre); // Soy Pepe
  },
  getEdad: function () {
    console.log("tengo " + this.edad); // Tengo 21
  },
};

personaObjeto.getNombre();
personaObjeto.getEdad();
//* Es una plantilla que tiene datos y funciones (métodos) a fines de esos datos

class Socio {
  #dni; // es una propiedad privada, no se puede acceder a ella desde fuera de la clase, ni modificarla, ni leerla
  static iva = 0.21; // es una propiedad estática, no se puede acceder a ella desde una instancia de la clase, ni modificarla, ni leerla, solo se puede acceder a ella desde la clase
  constructor(nombre, edad = 18, dni = null) {
    this.nombre = nombre;
    this.edad = edad;
    this.#dni = dni;
  }
  getNombre() {
    return this.nombre;
  }
  cambioEdad(edad_nueva) {
    this.edad = edad_nueva;
    return this.nombre + " " + this.edad;
  }
  modificarIva(nuevo_iva) {
    Socio.iva = nuevo_iva;
  }
  getIva() {
    return Socio.iva;
  }
  getDatoPrivadoDni() {
    return this.#dni;
  }
}

// HERENCIA -> CLASE PADRE -> CLASE HIJA -> OBJETO HIJO
class SocioPremium extends Socio {
  constructor(nombre, edad, dni, beneficios) {
    super(nombre, edad, dni);
    this.beneficios = beneficios;
  }
  getBeneficios() {
    return this.beneficios;
  }
  getNombre() {
    return `Esto es un socio POLIMORFICO: ${this.nombre}`;
  }
}
const socioPremium1 = new SocioPremium("Maria", 30, "12345678", [
  "Descuento en productos",
  "Acceso a eventos exclusivos",
]);
console.log(socioPremium1.getNombre());
console.log(socioPremium1.getBeneficios());

const nuevo_socio_pepe = new Socio("Pepe", 21, "12345678");
const nuevo_socio_juan = new Socio("Juan", 32, "87654321");

console.log(nuevo_socio_pepe);
console.log(nuevo_socio_juan);

console.log(Socio.iva);
console.log(nuevo_socio_pepe.getIva());
console.log(nuevo_socio_juan.getIva());

console.log(nuevo_socio_pepe.getDatoPrivadoDni());
console.log(nuevo_socio_juan.getDatoPrivadoDni());

// // INSTANCIAMOS
// const socioA = new Socio("Pepe")

// console.log(socioA)

// const socioB = new Socio("Juan")

// console.log(socioB)

// const socioC = new Socio("Maria", 21)

// console.log(socioC)

// console.log(socioC.getNombre())

// console.log(socioC.cambioEdad(31))

// console.log(socioC)

const mi_objeto = {
  data_a: "Puré", // -> data_a: "Valor A",
  data_b: "Valor B",
};

// mi_objeto.data_a = "Puré"

 