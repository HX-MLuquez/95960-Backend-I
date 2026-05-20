const path = require("path");

const paths = {
  public: path.join(__dirname, "../../public"),
};
console.log("__dirname ->", __dirname);
// C:\Users\mauuu\OneDrive\Escritorio\CODERHOUSE\95960 BACK-I Martes Y MIERC 7.30\95960-CLASE\CLASE_5\STATIC-PUBLIC\api\src\config
console.log("config.paths ->", paths.public);
// C:\Users\mauuu\OneDrive\Escritorio\CODERHOUSE\95960 BACK-I Martes Y MIERC 7.30\95960-CLASE\CLASE_5\STATIC-PUBLIC\api\public

module.exports = {
  PORT: 8080,
  paths: {
    public: path.join(__dirname, "../../public"),
    // public: "C:\\Users\\mauuu\\OneDrive\\Escritorio\\CODERHOUSE\\95960 BACK-I Martes Y MIERC 7.30\\95960-CLASE\\CLASE_5\\STATIC-PUBLIC\\api\\public"
  },
};

// import config.paths -> C:\Users\mauuu\OneDrive\Escritorio\CODERHOUSE\...\STATIC-PUBLIC\api\public
