const { io } = require('socket.io-client');
const socket = io('ws://localhost:3000');
const { EVENT_NAMES } = require('../utils');


function startPlayerB(){
  socket.emit(EVENT_NAMES.playerReady, 'playerB');
}

startPlayerB();