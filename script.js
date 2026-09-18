
const dictionary = [
    { ee: "server", ru: "сервер" },
    { ee: "klient", ru: "клиент" },
    { ee: "andmebaas", ru: "база данных" },
    { ee: "sõlm", ru: "узел" },
    { ee: "klaster", ru: "кластер" },
    { ee: "koormus", ru: "нагрузка" },
    { ee: "skaleeritavus", ru: "масштабируемость" },
    { ee: "vearesistentsus", ru: "отказоустойчивость" },
    { ee: "latentsus", ru: "задержка" },
    { ee: "puhver", ru: "кэш" },
    { ee: "sõnum", ru: "сообщение" },
    { ee: "järjekord", ru: "очередь" },
    { ee: "autentimine", ru: "аутентификация" },
    { ee: "turvalisus", ru: "безопасность" },
    { ee: "pilv", ru: "облако" },
    { ee: "konteiner", ru: "контейнер" },
    { ee: "mikroteenus", ru: "микросервис" },
    { ee: "protokoll", ru: "протокол" },
    { ee: "sünkroniseerimine", ru: "синхронизация" },
    { ee: "koopia", ru: "реплика" },
    { ee: "päring", ru: "запрос" },
    { ee: "vastus", ru: "ответ" },
    { ee: "haru", ru: "ветка" },
    { ee: "muudatus", ru: "коммит" }
];

let currentEE = null;
let currentRU = null;
let correctCount = 0;
let wrongCount = 0;

function randomEntry() {
    return dictionary[Math.floor(Math.random() * dictionary.length)];
}

function normalize(text) {
    return text.trim().toLowerCase();
}

function setFeedback(id, text, type = "") {
    const element = document.getElementById(id);

    element.textContent = text;
    element.className = "feedback";

    if (type) {
        element.classList.add(type);
    }
}

function updateScore() {
    document.getElementById("scoreCorrect").textContent = correctCount;
    document.getElementById("scoreWrong").textContent = wrongCount;
}

function refreshEE() {
    currentEE = randomEntry();

    document.getElementById("wordEE").textContent = currentEE.ee;
    document.getElementById("inputRU").value = "";

    setFeedback("feedbackEE");
}

function refreshRU() {
    currentRU = randomEntry();

    document.getElementById("wordRU").textContent = currentRU.ru;
    document.getElementById("inputEE").value = "";

    setFeedback("feedbackRU");
}

function checkEE() {
    const answer = normalize(document.getElementById("inputRU").value);
    const correct = normalize(currentEE.ru);

    if (answer === correct) {
        correctCount++;
        setFeedback(
            "feedbackEE",
            "Õige! ✓ " + currentEE.ru,
            "ok"
        );
    } else {
        wrongCount++;
        setFeedback(
            "feedbackEE",
            "Vale! Õige vastus: " + currentEE.ru,
            "err"
        );
    }

    updateScore();
}

function checkRU() {
    const answer = normalize(document.getElementById("inputEE").value);
    const correct = normalize(currentRU.ee);

    if (answer === correct) {
        correctCount++;
        setFeedback(
            "feedbackRU",
            "Правильно! ✓ " + currentRU.ee,
            "ok"
        );
    } else {
        wrongCount++;
        setFeedback(
            "feedbackRU",
            "Неверно! Правильный ответ: " + currentRU.ee,
            "err"
        );
    }

    updateScore();
}

function resetScore() {
    correctCount = 0;
    wrongCount = 0;
    updateScore();
}

document.getElementById("checkEE").addEventListener("click", checkEE);
document.getElementById("checkRU").addEventListener("click", checkRU);

document.getElementById("refreshEE").addEventListener("click", refreshEE);
document.getElementById("refreshRU").addEventListener("click", refreshRU);

document.getElementById("resetScore").addEventListener("click", resetScore);

document.getElementById("inputRU").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        checkEE();
    }
});

document.getElementById("inputEE").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        checkRU();
    }
});

document.getElementById("dictSize").textContent = dictionary.length;

refreshEE();
refreshRU();

