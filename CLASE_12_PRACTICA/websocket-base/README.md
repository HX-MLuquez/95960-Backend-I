# App con websockets - SSR -> HTTP + WebSockets

## CLIENT - FRONTEND

- Código JS (script) que se ejecuta en el navegador (conectado al servidor a través de WebSockets):
  - public/js/app.js
  - public/js/socket-client.js
  - public/js/index.js
  - public/js/\*.js

- Vistas a renderizar (donde pueden o no tener código JS - los <script>):
  - src/views/layouts/main.hbs - {{{body}}}
  - src/views/\*

## SERVER - BACKEND

El resto de los archivos, que se ejecutan en el servidor.

---

## Q & A

1. ¿Qué es WebSockets?

- Es una comunicación bidireccional entre el cliente y el servidor a través de una conexión persistente.
- Protocolo TCP que permite enviar y recibir datos en tiempo real sin necesidad de realizar múltiples solicitudes HTTP.
- En Node js usamos la librería Socket.io para facilitar la implementación de WebSockets.

2. ¿Qué es desplegar una aplicación? (DEPLOY)

- Es el proceso de subir una aplicación a un servidor para que pueda ser accedida por los usuarios a través de Internet.
- Implica configurar el entorno de producción, asegurarse de que la aplicación funcione correctamente y hacerla accesible a través de una URL pública.
- Los servvicios más grandes para desplegar aplicaciones son AWS, Google Cloud, Azure, entre otros.
- Y los servicios más sencillos para desplegar aplicaciones son Render, Heroku, Vercel, entre otros.
