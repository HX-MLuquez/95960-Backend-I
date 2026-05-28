// setInterval: Ejecuta una función repetidamente, con un retraso fijo entre cada llamada.
// Es necesario usar clearInterval para detener la ejecución.

// Ejemplo de setInterval - cronometro que muestra el tiempo transcurrido cada segundo

let segundos = 0;
function mostrarTiempo() {
  segundos++;
  console.log(`Tiempo transcurrido: ${segundos} segundos`);
}

console.log("Iniciando cronómetro...");

const intervalo = setInterval(mostrarTiempo, 1000); // Llama a la función mostrarTiempo cada 1000 milisegundos (1 segundo)

// Detener el cronómetro después de 5 segundos
setTimeout(() => {
  clearInterval(intervalo);
  console.log("Cronómetro detenido.");
}, 5000);
