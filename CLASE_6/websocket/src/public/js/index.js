//* CLIENT - CLIENTE
console.log("IN CLIENT");

const userName = document.querySelector(".userName");
const chatMessage = document.querySelector(".chatMessage");
const usersContainer = document.querySelector(".usersContainer"); // contenedor para usuarios conectados

let uuid = "";
let messages = [];
let users_connections = [];

const socket = io("http://localhost:8080");

//* =========================
//* Renderizar mensajes
//* =========================
const updateMessages = (newMessages) => {
  messages = [...newMessages];

  chatMessage.innerHTML = messages
    .map((message) => {
      return `
        <div class="messageUser">
          <h5>Nombre: ${message.name}</h5>
          <p>SocketID: ${message.socketId}</p>
          <p>${message.message}</p>
          <small>${new Date(message.timestamp).toLocaleTimeString()}</small>
        </div>
      `;
    })
    .join("");
};

//* =========================
//* Renderizar usuarios conectados
//* =========================
const updateConnections = (newConnections) => {
  users_connections = [...newConnections];

  usersContainer.innerHTML = users_connections
    .map((user) => {
      return `
        <div class="connectedUser">
          <p>${user.name}</p>
          <small>ID: ${user.userId}</small>
        </div>
      `;
    })
    .join("");
};

//* =========================
//* SweetAlert login
//* =========================
Swal.fire({
  title: "Ingrese su información",
  html: `
        <input type="text" id="swal-input-name" class="swal2-input" placeholder="Nombre">
        <input type="text" id="swal-input-id" class="swal2-input" placeholder="ID">
      `,
  focusConfirm: false,
  showCancelButton: true,
  confirmButtonText: "Ingresar",
  preConfirm: () => {
    const name = Swal.getPopup().querySelector("#swal-input-name").value;
    const id = Swal.getPopup().querySelector("#swal-input-id").value;

    if (!name || !id) {
      Swal.showValidationMessage(`Por favor ingrese ambos campos`);
    }

    return { name, id };
  },
}).then((result) => {
  if (!result.isConfirmed) return;

  const { name, id } = result.value;

  uuid = id;
  userName.textContent = name;

  socket.emit("userConnect", { user: name, id });
});

//* =========================
//* EVENTOS DE ESCUCHA
//* =========================
socket.on("serverMessages", (data) => {
  updateMessages(data);
});

socket.on("serverConnections", (data) => {
  updateConnections(data);
});

//* =========================
//* Enviar mensaje
//* =========================
const btnMessage = document.getElementById("btnMessage");
const inputMessage = document.getElementById("inputMessage");

btnMessage.addEventListener("click", (e) => {
  e.preventDefault();

  const message = inputMessage.value.trim();
  if (!message) return;

  socket.emit("userMessage", {
    message,
    user: userName.textContent,
  });

  inputMessage.value = "";
});

//* Evento de conexión con el servidor

/*
Los eventos de Socket.IO son asíncronos, lo que significa que no podemos detener el flujo 
de la aplicación esperando una respuesta directa. 
Para manejar esto, podemos:

1. Usar callbacks proporcionados por el cliente o el servidor.
2. Emitir eventos personalizados y escuchar las respuestas por separado.

Esto permite que el flujo de la aplicación continúe mientras se gestionan las respuestas.
*/
