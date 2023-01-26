const { Server } = require("socket.io");
const io = new Server(3000);
const { EVENT_NAMES } = require("./utils");
const { questionsReady } = require("./questionsQueue/index");

let responseCount = 0;
let question;

function startEventServer() {
  io.on("connection", (socket) => {
    console.log("We have a new connection:", socket.id);

    socket.on(EVENT_NAMES.playerReady, (player) => {
      console.log(`${player} is ready!`);
      responseCount += 1;
      console.log(responseCount);
      if (responseCount === 2) {
        question = questionsReady.dequeue();
        console.log("Here is the question", question.question);
        io.emit(EVENT_NAMES.questionsReady, question.question);
      }
    });

    socket.on(EVENT_NAMES.answer, (answer) => {
      console.log(answer);
      if (answer.maruQuestion === question.answer) {
        socket.emit(EVENT_NAMES.answer, 'Correct!');
      } else {
        console.log(answer.maruQuestion, question.answer);
        socket.emit(EVENT_NAMES.answer, 'Incorrect!');
      }
    }
    );
  });
}

startEventServer();
