const { io } = require('socket.io-client');
const socket = io('ws://localhost:3000');
const { EVENT_NAMES } = require('../utils');



function startPlayerA(){
  socket.emit(EVENT_NAMES.playerReady, 'playerA');
}

startPlayerA();