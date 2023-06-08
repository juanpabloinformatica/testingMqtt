const path = require("path");
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const mqtt = require("mqtt");
const cors = require("cors");

require("dotenv").config();
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    // credentials: true,
  },
});
app.use(cors());
app.use("/static", express.static("public"));
app.use(
  "/socket.io",
  express.static(
    path.join(__dirname, "node_modules", "socket.io", "client-dist"),
  ),
);

const options = {
  host: process.env.HOST,
  port: process.env.PORT,
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  protocol: process.env.PROTOCOL,
};

const client = mqtt.connect(options);
console.log(client)

client.on("connect", () => {
  console.log('hola1')
  console.log("connected to the app");
  try {
    client.subscribe("#");
    console.log("client connected");
  } catch (error) {
    console.log(error);
  }
});
client.on("message", (topic, message) => {
  console.log('hola2')
  try {
    console.log(message.toString());
    io.emit("mqtt", { topic, message: message.toString() });
  } catch (error) {
    io.emit("mqtt", { topic, message: error });
  }
});
io.on("connection",(socket)=>{
  console.log("new client connected")
  socket.emit("hello","world");
  socket.on("hello from client",()=>{
    console.log("hola")
  })
})
server.listen(process.env.PORT_LOCAL_SERVER, () => {
  console.log(
    `Listening in port http://localhost:${process.env.PORT_LOCAL_SERVER}`,
  );
});
