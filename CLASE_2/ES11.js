// NULLISH

// VAR-PRIVADAS

//todo__ ES11
//* NULLISH


//* VAR PRIVADA - ENCAPSULAMIENTO

// _nombre
class Gato {
    #nombre; //* PRIVADA # <- proteger - integridad
    constructor(nombre){
        this.#nombre= nombre;
    }

    getNombre() {
        return this.#nombre;
    }

    setNombre(nombre) {
        this.#nombre = nombre;
    }
}

