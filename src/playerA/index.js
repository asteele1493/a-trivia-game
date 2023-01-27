const { EVENT_NAMES } = require("../utils");
const { io } = require("socket.io-client");
const socket = io("ws://localhost:3000");
const inquirer = require("inquirer");

function startPlayerA() {
  socket.emit(EVENT_NAMES.playerReady, "playerA");
  socket.on(EVENT_NAMES.questionsReady, (question) => {
    // insert inquirer prompt here
    inquirer
    .prompt([
      {
        name: "maruQuestion",
        message: question,
      }
    ])
    // send answer to hub
    .then(answer => {
      console.log('PlayerA answer:', answer);
      socket.emit(EVENT_NAMES.answer, answer);
    })
  });

  socket.on(EVENT_NAMES.answer, (payload) => {
    console.log(payload);
  });
}

startPlayerA();
