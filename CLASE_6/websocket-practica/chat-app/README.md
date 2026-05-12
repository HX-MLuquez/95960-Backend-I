# CHAT-APP con Node.js + Express + Handlebars + Socket.io

## Descripción
En esta práctica, vamos a crear una aplicación de chat en tiempo real utilizando Node.js, Express, Handlebars y Socket.io. La aplicación permitirá a los usuarios conectarse a un chat común y enviar mensajes que serán vistos por todos los participantes en tiempo real.


---

### FRONTEND 
Se implementa en las carpetas `public` y `src/views`:


### BACKEND
En el resto de los archivos, se configura y desarrolla la lógica del servidor, nuestro backend.

* Ya que estamos desarrollando una app tipo 'SSR' (Server Side Rendering), el servidor se encargará de renderizar las vistas y enviar el HTML al cliente, además de manejar la lógica de WebSockets para la comunicación en tiempo real.