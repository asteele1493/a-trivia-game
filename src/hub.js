const { Server } = require("socket.io");
const io = new Server(3000);
const { EVENT_NAMES } = require('./utils');

function startEventServer() {
  io.on("connection", (socket) => {
    console.log("We have a new connection!");

  socket.on(EVENT_NAMES.playerReady, (player) => {
    console.log(`${player} is ready!`);
  });
});
}

startEventServer();
