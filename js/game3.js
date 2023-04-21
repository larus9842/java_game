const questions = [
    {
        question: "Qual è la capitale dell'Italia?",
        answer: "Roma"
    },
    {
        question: "Qual è la città in cui scorreggiasti in faccia a Gianni?",
        answer: "Budapest"
    },
    {
        question: "Traduci in francese: Mi chiamo Davide , ho 25 anni, lavoro da ARM e vivo a Mougins",
        answer: "Je m'appelle Davide, j'ai 25 ans, je travaille chez ARM et j'habite à Mougins"
    },
    {
        question: "Nicoletta?",
        answer: "Federico basta"
    },
    {
        question: "Enunciare acronimo nato il 21 dicembre 2016",
        answer: "Pompino Tattico da Dado"
    },
    {
        question: "Hai rotto i coglioni a ripetizione con questo audio per anni",
        answer: "Papapapapa"
    },
    {
        question: "Come hai dormito la notte del 7 maggio 2022",
        answer: "Senza mutande"
    },
    {
        question: "Cosa ti sei dimenticato di fare ad Halloween 2021?",
        answer: "Frenare"
    },
    {
        question: "Lo usi ogni cazzo di sera nella tua villa borghese",
        answer: "Barbecue"
    },
    {
        question: "Quando è stata fatta la cagata più grossa della storia dell'Etruria?",
        answer: "2016"
    },
    {
        question: "Parola chiave: Azzolina",
        answer: "Corbellerie"
    },
    {
        question: "Location del cuscino unico?",
        answer: "Siviglia"
    },
    {
        question: "Ma che bella Alghero! Guarde che belle case sul mare",
        answer: "Abusivismo edilizio"
    },
    {
        question: "Ti ha mangiato il diario e i cavi della connessione internet",
        answer: "Ezio"
    },
    {
        question: "Best quality carton wine",
        answer: "Furria"
    },
    {
        question: "Marzamemi 2015. La cosa che ti ha terrorizzato di più?",
        answer: "Gli scogli"
    },
    {
        question: "Comune reazione alle tue spiegazioni logico-matematiche?",
        answer: "Valli di lacrime"
    },
    {
        question: "Versione moderna di Pachelbel Canon",
        answer: "Memories"
    },
    {
        question: "Giannandrea, ciao. Avverti Davide Perticone e Cocuzza che domani...",
        answer: "Si devono fare inrerrogare in greco"
    },
    {
        question: "Quale animale si siede, sta in piedi e cammina?",
        answer: "Procione"
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
    typeWriter(instructionsMsg, "Ciao Davide, benvenuto al nostro gioco! Devi rispondere correttamente alle domande, altrimenti te le riproponiamo all'infinito. Divertente, no? Prova a non sbagliare!");
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
            container.innerHTML = "";
            const successAudio = new Audio('success_sound.mp3');
            successAudio.play();
            const congratsMsg = document.createElement("p");
            congratsMsg.innerText = "Adesso riceverai il tuo premio xd!";
            container.appendChild(congratsMsg);
            setTimeout(showCongrats, 1500);
        } else {
            container.innerHTML = "";
            const successAudio = new Audio('success_sound.mp3');
            successAudio.play();
            const congratsMsg = document.createElement("p");
            congratsMsg.innerText = "Bravo, puoi proseguire!";
            container.appendChild(congratsMsg);
            setTimeout(showQuestion, 1500);
        }
    } else {
        container.innerHTML = "";
        const errorAudio = new Audio('error_sound.mp3');
        errorAudio.play();
        const errorMsg = document.createElement("p");
        errorMsg.innerText = "Vergognati bro. Adesso devi bere e poi puoi riprovare!";
        container.appendChild(errorMsg);
        setTimeout(function () {
            showQuestion();
        }, 2000);
    }
}
