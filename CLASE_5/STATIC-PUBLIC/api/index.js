const app = require('./src/app.js');
const PORT = 3000;

const {paths} = require('./src/config/config.js');
console.log("import config.paths ->", paths.public);
// C:\Users\mauuu\OneDrive\Escritorio\CODERHOUSE\...\STATIC-PUBLIC\api\public

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
