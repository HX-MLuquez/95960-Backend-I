console.log("Hola desde el index.js del cliente");

// CLIENTE - NAVEGADOR
const socket = io();

// Conectar a los diferentes elementos del DOM
const userName = document.querySelector(".userName");
const chatMessage = document.querySelector(".chatMessage");
const btnMessage = document.getElementById("btnMessage");
const inputMessage = document.getElementById("inputMessage");
const listLogin = document.querySelector(".listLogin");
let user = "";

//------Pedir nombre con SweetAlert2 -----
Swal.fire({
  title: "Ingrese su nombre",
  input: "text",
  inputPlaceholder: "Nombre",
  allowOutsideClick: false,
  inputValidator: (value) => {
    if (!value) {
      return "Debe ingresar un nombre";
    }
  },
}).then((result) => {
  user = result.value;

  userName.textContent = user;

  socket.emit("userConnect", {
    user,
    id: Date.now(),
  });
});

// Escuchar mensajes del servidor
socket.on("serverUserMessage", (messages) => {
  listLogin.innerHTML = "";
  chatMessage.innerHTML = "";
  messages.forEach((msg) => {
    if (msg.info === "connection") {
      listLogin.innerHTML += `
        <p>${msg.message}</p>
      `;
    } else {
      chatMessage.innerHTML += `
        <div>
          <h4>${msg.user}</h4>
          <p>${msg.message}</p>
        </div>
      `;
    }
  });
});

// Enviar mensaje al servidor
btnMessage.addEventListener("click", () => {
  const message = inputMessage.value.trim();
  if (!message) return;

  socket.emit("userMessage", {
    user,
    message,
  });

  inputMessage.value = "";
});
