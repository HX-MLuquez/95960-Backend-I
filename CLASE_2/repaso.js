// Socio

const socio = {
  nombre: "",
  edad: 0,
  dni: "",
  getData: function () {
    return `El socio ${this.nombre}, de edad ${this.edad} y dni: ${this.dni}`;
  },
  createSocio: function (nombre, edad, dni) {
    this.nombre = nombre;
    this.edad = edad;
    this.dni = dni;
  },
};

// SOcios

const socios = {
  lista: [],
  addSocio: function (nombre, edad, dni) {
    const nuevoSocio = { ...socio };
    nuevoSocio.createSocio(nombre, edad, dni);
    this.lista.push(nuevoSocio);
  },
  getSocios: function () {
    return this.lista.map((socio) => socio.getData());
  },
};

socios.addSocio("Pepe", 21, "12345678");
socios.addSocio("Juan", 32, "87654321");

console.log(socios.getSocios());
