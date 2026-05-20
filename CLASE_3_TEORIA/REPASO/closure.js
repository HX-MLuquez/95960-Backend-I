
// CLOSURE 
/*
Receta:
1. Crear una función que retorne otra función.
2. La función interna debe hacer referencia a una variable declarada en la función externa.
3. La función externa debe ser invocada para retornar la función interna.
*/

const crearInventarioPC = function () {
    let computadora = {
        marca: "HP",
        memoriaRAM: "16GB",
        procesador: "i7",
        componentes: ["teclado", "mouse", "monitor"]
    };

    return function agregarComponente(nuevoComponente) {
        if (nuevoComponente) {
            computadora.componentes.push(nuevoComponente);
        }

        return computadora;
    };
};

const administrarPC_1 = crearInventarioPC();

console.log(administrarPC_1("cable usb"));

console.log(administrarPC_1("monitor 2"));

const administrarPC_2 = crearInventarioPC();

console.log(administrarPC_2("parlantes"));