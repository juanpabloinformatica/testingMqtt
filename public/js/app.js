const init = () => {
  console.log("hola");
  alert("hola");
  const socket = io.connect("http://localhost:3000");
  const mapContainer = document.querySelector(".mapContainer");
  console.log(socket);
  socket.on("mqtt", (data) => {
    try {
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  });
  socket.on("hello", (args) => {
    console.log(args);
  });
  socket.emit("hello from client")
};
document.addEventListener("DOMContentLoaded", init());
