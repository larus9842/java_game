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
let questionCounter = 0;

startBtn.addEventListener("click", showInstructions);

function typeWriter(element, text) {
  let index = 0;
  const audio = new Audio('lon_keyboard.mp3'); // sostituisci con il percorso del tuo file audio
  const soundDuration = 5000; // durata in millisecondi del suono di digitazione
  let isSoundPlaying = false; // variabile per tenere traccia dello stato della riproduzione audio

  function playSoundLoop() {
    isSoundPlaying = true; // impostiamo la variabile a true per indicare che l'audio è in riproduzione
    audio.play();
    setTimeout(function() {
      isSoundPlaying = false; // impostiamo la variabile a false per indicare che l'audio non è più in riproduzione
    }, soundDuration);
  }

  function type() {
    if (index < text.length) {
      element.textContent = text.substr(0, index + 1);
      index++;
      if (!isSoundPlaying) { // riproduci il suono solo se non è già in riproduzione
        playSoundLoop();
      }
      requestAnimationFrame(type);
    }
  }

  type();
}

function playMusicLoop() {
    const music = new Audio('music.mp3'); // sostituisci con il percorso del tuo file mp3
    music.loop = true;
    music.play();
}

function showInstructions() {
    container.textContent = "";
    const instructionsMsg = document.createElement("p");
    instructionsMsg.textContent = "";
    container.appendChild(instructionsMsg);
    typeWriter(instructionsMsg, "Benvenuto al gioco delle domande. Il gioco consiste in 3 domande a cui dovrai rispondere correttamente. Se sbagli, la stessa domanda ti verrà riproposta. Se indovini, passi alla domanda successiva. Buona fortuna!");
    const startGameBtn = document.createElement("button");
    startGameBtn.textContent = "Avvia gioco";
    startGameBtn.addEventListener("click", function () {
        startGame();
        playMusicLoop();
    });

    container.appendChild(startGameBtn);
}

function startGame() {
    questionCounter = 0;
    container.textContent = "";
    showQuestion();
}

function showQuestion() {
    const questionDiv = document.createElement("div");
    const questionText = document.createElement("p");
    const answerInput = document.createElement("input");
    const submitBtn = document.createElement("button");

    questionText.textContent = "";
    questionDiv.appendChild(questionText);
    questionDiv.appendChild(answerInput);
    questionDiv.appendChild(submitBtn);
    container.textContent = "";
    container.appendChild(questionDiv);

    typeWriter(questionText, questions[questionCounter].question);
    submitBtn.textContent = "Invia";
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
    const correctAnswer = questions[questionCounter].answer.toLowerCase();
    if (userAnswer === correctAnswer) {
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
        setTimeout(() => {
            showQuestion();
        }, 1500);
    }
}


