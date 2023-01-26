const { EVENT_NAMES } = require('../utils');
const { io } = require('socket.io-client');
const socket = io('ws://localhost:3000');
const inquirer = require("inquirer");

function startPlayerB(){
  socket.emit(EVENT_NAMES.playerReady, 'playerB');
  socket.on(EVENT_NAMES.questionsReady, (question) => {
    inquirer
    .prompt([
      {
        name: "maruQuestion",
        message: question,
      }
    ])
    .then(answer => {
      console.log('PlayerB answer:', answer);
      socket.emit(EVENT_NAMES.answer, answer);
    })
  });

  socket.on(EVENT_NAMES.answer, (payload) => {
    console.log(payload);
  });
}

// function answerQuestion(question){
//   let answer = prompt()
// }

startPlayerB();