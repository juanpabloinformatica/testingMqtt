const socket = io.connect("http://localhost:3000");
const mapContainer = document.querySelector(".mapContainer");

socket.on("mqtt", (data) => {
  try {
    console.log(data)   
  } catch (error) {
    console.log(error);
  }
});
// alert("hola")
// console.log('hola')
