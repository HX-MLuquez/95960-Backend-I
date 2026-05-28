// setTimeout: Ejecuta una función después de un retraso específico. Solo se ejecuta una vez.

// Ejemplo de setTimeout - saludo después de 2 segundos

function saludar() {
  console.log("¡Hola! Este mensaje se muestra después de 2 segundos.");
}

console.log("Este mensaje se muestra inmediatamente.");

setTimeout(saludar, 2000); // Llama a la función saludar después de 2000 milisegundos (2 segundos)

console.log("Este mensaje también se muestra inmediatamente, antes del saludo.");