const questions = [
  {
    question: "Qual è la capitale dell'Italia?",
    answer: "Roma"
  },
  {
    question: "Quale è il fiume più lungo del mondo?",
    answer: "Nilo"
  },
  {
    question: "In che anno è stata fondata Apple?",
    answer: "1976"
  }
];

const startBtn = document.getElementById("start-btn");
const container = document.getElementById("container");
const soundEffects = {
  success: new Audio('success_sound.mp3'),
  error: new Audio('error_sound.mp3'),
  keyboard: new Audio('keyboard_sound2.mp3'),
  music: new Audio('music.mp3')
};
let questionCounter = 0;

startBtn.addEventListener("click", showInstructions);

function typeWriter(element, text) {
  let index = 0;

  function type() {
    if (index < text.length) {
      element.textContent += text.charAt(index);
      index++;
      soundEffects.keyboard.play(); // riproduci il suono
      setTimeout(type, Math.floor(Math.random() * 40) + 10);
    }
  }

  type();
}


function playMusicLoop() {
  soundEffects.music.loop = true;
  soundEffects.music.play();
}

function showInstructions() {
  container.innerHTML = "";
  const instructionsMsg = document.createElement("p");
  instructionsMsg.innerText = "";
  container.appendChild(instructionsMsg);
  typeWriter(instructionsMsg, "Benvenuto al gioco delle domande. Il gioco consiste in 3 domande a cui dovrai rispondere correttamente. Se sbagli, la stessa domanda ti verrà riproposta. Se indovini, passi alla domanda successiva. Buona fortuna!");
  const startGameBtn = document.createElement("button");
  startGameBtn.innerText = "Avvia gioco";
  startGameBtn.addEventListener("click", function () {
    startGame();
    playMusicLoop();
  });

  container.appendChild(startGameBtn);
}

function startGame() {
  questionCounter = 0;
  container.innerHTML = "";
  showQuestion();
}

function showQuestion() {
  container.innerHTML = "";
  const questionDiv = document.createElement("div");
  const questionText = document.createElement("p");
  const answerInput = document.createElement("input");
  const submitBtn = document.createElement("button");

  questionText.innerText = "";
  questionDiv.appendChild(questionText);
  questionDiv.appendChild(answerInput);
  questionDiv.appendChild(submitBtn);
  container.appendChild(questionDiv);

  typeWriter(questionText, questions[questionCounter].question);
  submitBtn.innerText = "Invia";
  submitBtn.addEventListener("click", checkAnswer);
}

function showCongrats() {
  container.innerHTML = "";
  fetch('testo.txt')
    .then(response => response.text())
    .then(text => {
      const congratsMsg = document.createElement("p");
      container.appendChild(congratsMsg);
      typeWriter(congratsMsg, text);
    });
}

function checkAnswer() {
  const userAnswer = document.querySelector("input").value.toLowerCase();
  if (userAnswer === questions[questionCounter].answer.toLowerCase()) {
    questionCounter++;
    if (questionCounter === questions.length) {
      showCongrats();
    } else {
      container.innerHTML = "";
      const successAudio = new Audio('success_sound.mp3');
      successAudio.play();
      const congratsMsg = document.createElement("p");
      congratsMsg.innerText = "Risposta corretta!";
      container.appendChild(congratsMsg);
      setTimeout(showQuestion, 1500);
    }
  } else {
    container.innerHTML = "";
    const errorAudio = new Audio('error_sound.mp3');
    errorAudio.play();
    const errorMsg = document.createElement("p");
    errorMsg.innerText = "Risposta sbagliata. Riprova.";
    container.appendChild(errorMsg);
    setTimeout(function () {
      showQuestion();
    }, 1500);
  }
}
