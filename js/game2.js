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
    const audio = new Audio('keyboard_sound2.mp3'); // sostituisci con il percorso del tuo file audio

    function type() {
        if (index < text.length) {
            element.innerHTML = text.substr(0, index + 1);
            index++;
            audio.currentTime = 0;
            audio.play(); // riproduci il suono
            setTimeout(type, Math.floor(Math.random() * 80) + 40);
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
    const userAnswer = document.querySelector("input").value.trim().toLowerCase();
    const correctAnswer = questions[questionCounter].answer.toLowerCase();

    if (userAnswer === correctAnswer) {
        questionCounter++;

        if (questionCounter === questions.length) {
            showCongrats();
            return;
        }

        const successAudio = new Audio('success_sound.mp3');
        successAudio.play();

        container.innerHTML = `
            <p>Risposta corretta!</p>
            <div>
                <button id="next-question-btn">Prossima domanda</button>
            </div>
        `;

        const nextQuestionBtn = document.getElementById('next-question-btn');
        nextQuestionBtn.addEventListener('click', showQuestion);
    } else {
        const errorAudio = new Audio('error_sound.mp3');
        errorAudio.play();

        container.innerHTML = `
            <p>Risposta sbagliata. Riprova.</p>
            <div>
                <button id="retry-btn">Riprova</button>
            </div>
        `;

        const retryBtn = document.getElementById('retry-btn');
        retryBtn.addEventListener('click', showQuestion);
    }
}
