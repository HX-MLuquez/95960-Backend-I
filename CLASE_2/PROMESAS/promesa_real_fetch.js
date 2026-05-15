// Promesa real usando fetch + then y catch
import fetch from "node-fetch";

// usamos la api `https://akabab.github.io/starwars-api/api/all.json`

fetch(`https://akabab.github.io/starwars-api/api/all.json`).then((response) => {
    if (response.ok) {
        return response.json();
    } else {
        throw new Error("Error en la respuesta de la API");
    }
}).then((data) => {
    console.log("Data recibida de la API: ", data);
}).catch((error) => {
    console.error("Error al consumir la API: ", error);
});
