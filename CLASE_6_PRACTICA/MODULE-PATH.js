//* module path es nativo de NODE y no necesitamos instalar
const path = require("path");

// console.log(path);

console.log("dirname:", __dirname);
// c:\Users\mauuu\OneDrive\Escritorio\95960 BACK-I MARTES Y JUEVES 18.30 a 21.00\86095-CLASE\CLASE_6_PRACTICA

const ruta_raiz = __dirname;

const rutaExacta = "__dirname" + "/src/images/perfil.png";

// Funcion para todos los archivos dentro de /images

const ruta_para_mis_images = function (nombre_de_mi_imagen) {
  const ruta = path.join(__dirname, "src", "images", nombre_de_mi_imagen);
  return ruta;
};

console.log(ruta_para_mis_images("perfil.png"));
// c:\Users\mauuu\OneDrive\Escritorio\95960 BACK-I MARTES Y JUEVES 18.30 a 21.00\86095-CLASE\CLASE_6_PRACTICA\src\images\perfil.png

/*
Para buscar mis imágenes:
c:\Users\mauuu\OneDrive\Escritorio\95960 BACK-I MARTES Y JUEVES 18.30 a 21.00
\86095-CLASE\CLASE_6_PRACTICA\src\images\perfil.png


c:\Users\mauuu\OneDrive\Escritorio\95960 BACK-I MARTES Y JUEVES 18.30 a 21.00
\86095-CLASE\CLASE_6_PRACTICA

===

RAIZ 

c:\Users\Emi\OneDrive\Escritorio\86095-CLASE\CLASE_6_PRACTICA

*/

// Config de Path para ser exportado y reutilizado en otros archivos

const pathConfig = {
  ruta_para_mis_images: function (nombre_de_mi_imagen) {
    const ruta = path.join(__dirname, "src", "images", nombre_de_mi_imagen);
    return ruta;
  },
  ruta_para_mis_datos: function (nombre_de_mi_dato) {
    const ruta = path.join(__dirname, "src", "data", nombre_de_mi_dato);
    return ruta;
  },
};

module.exports = {
  pathConfig
}
