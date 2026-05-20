// clase Persona con variables estáticas

class People {
  static IVA = 0.21; // variable estática, no se puede acceder a ella desde una instancia de la clase, ni modificarla, ni leerla, solo se puede acceder a ella desde la clase
  constructor(name = "", surname = "") {
    this.name = name;
    this.surname = surname;
    this.#dni = null; // variable privada, no se puede acceder a ella desde fuera de la clase, ni modificarla, ni leerla, solo se puede acceder a ella desde dentro de la clase
  }
  updateName(name) {
    this.name = name;
  }
  addDni(dni) {
    this.#dni = dni;
  }
  getDni() {
    return this.#dni;
  }
}
console.log("--a->", People); // [class People]

// CLASE -> INSTANCIA -> OBJETO
// PLANTILLA -> EJECUTAMOS LA PLANTILLA -> OBTENEMOS UN OBJETO

const first_person = new People("Pepe", "Gonzalez");
console.log("--b->", first_person); // People { name: 'Pepe', surname: 'Gonzalez' }

const second_person = new People("Juan", "Perez");
console.log("--c->", second_person); // People { name: 'Juan', surname: 'Perez' }

const third_person = new People("Maria", "Gomez");
console.log("--d->", third_person); // People { name: 'Maria', surname: 'Gomez' }

third_person.updateName("Mariana");
console.log("--e->", third_person); // People { name: 'Mariana', surname: 'Gomez' }

// Ejemplificamos un objeto real de un tv con todas sus posibles propíedades

const tv_samsung_smart = {
  marca: "Samsung",
  modelo: "Smart TV 4K",
  pulgadas: 55,
  resolucion: "4K",
  tipo_pantalla: "LED",
  sistema_operativo: "Tizen",
  puertos: {
    hdmi: 4,
    usb: 2,
    ethernet: 1,
  },
  funciones: [
    "Smart TV",
    "Control por voz",
    "Conexión a internet",
    "Grabación en USB",
  ],
  precio: 999.99,
};
