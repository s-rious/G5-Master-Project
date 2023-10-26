let timelimit = 0;
function difficulty(value) {
    if (value == "easy") {
        timelimit = 60;
    } else if (value == "intermediate") {
        timelimit = 30;
    } else if (value == "hard") {
        timelimit = 15;
    }
}
let quotes_array = [
        "apple",
        "banana",
        "chocolate",
        "dog",
        "elephant",
        "fire",
        "guitar",
        "happiness",
        "ice cream",
        "jazz",
        "kangaroo",
        "lemon",
        "mountain",
        "notebook",
        "ocean",
        "penguin",
        "quiet",
        "rainbow",
        "sunshine",
        "tree",
        "umbrella",
        "violin",
        "waterfall",
        "xylophone",
        "zebra",
        "beach",
        "carrot",
        "dolphin",
        "elephant",
        "flower",
        "giraffe",
        "helicopter",
        "island",
        "jungle",
        "koala",
        "lighthouse",
        "moon",
        "ninja",
        "orange",
        "palm",
        "quokka",
        "rocket",
        "star",
        "tiger",
        "unicorn",
        "volcano",
        "waffle",
        "xylophone",
        "yacht",
        "zeppelin"
];
let error_group = document.querySelector(".errors");
let score_text = document.querySelector(".curr_score");

let timeLeft = timelimit;
let timeElapsed = 0;
let total_errors = 0;
let errors = 0;
let currQuote = "";
let quoteNum = 0;
let timer = null;
let score = -10;

function updateQuote() {
    document.querySelector(".quote").textContent = null;
    currQuote = quotes_array[quoteNum];
    currQuote.split('').forEach(char => {
        const charSpan = document.createElement('span')
        charSpan.innerText = char
        document.querySelector(".quote").appendChild(charSpan)
    })
    if (quoteNum < quotes_array.length - 1) {
        quoteNum++;
        score += 10;
        score_text.textContent = score;
    }
    else {
        quoteNum = 0;
    }
}
function currentText() {
    curr_input = document.querySelector(".input_area").value;
    curr_input_array = curr_input.split('');
    characterTyped++;

    errors = 0;

    quoteSpanArray = document.querySelector(".quote").querySelectorAll('span');
    quoteSpanArray.forEach((char, index) => {
        let typedChar = curr_input_array[index]
        if (typedChar == null) {
            char.classList.remove('correct_char');
            char.classList.remove('incorrect_char');
        } else if (typedChar === char.innerText) {
            char.classList.add('correct_char');
            char.classList.remove('incorrect_char');
        } else {
            char.classList.add('incorrect_char');
            char.classList.remove('correct_char');
            errors++;
        }
    });
    document.querySelector(".curr_errors").textContent = total_errors + errors;
    let correctCharacters = (characterTyped - (total_errors + errors));
    if (curr_input.length == currQuote.length) {
        updateQuote();
        total_errors += errors;
        document.querySelector(".input_area").value = "";
    }
}
function startGame() {
    resetValues();
    updateQuote();
    clearInterval(timer);
    timer = setInterval(updateTimer, 1000);
    document.getElementById("difficulty_btns").style.display = "none";
}

function resetValues() {
    timeLeft =  timelimit;
    timeElapsed = 0;
    errors = 0;
    total_errors = 0;
    characterTyped = 0;
    quoteNo = 0;
    document.querySelector(".input_area").disabled = false;

    document.querySelector(".input_area").value = "";
    document.querySelector(".quote").textContent = 'Click on the area below to start the game.';
    document.querySelector(".curr_time").textContent = timeLeft + 's';
    document.querySelector(".curr_errors").textContent = 0;
    score_text.textContent = 0;
    document.getElementById("difficulty_btns").style.display = "block";
}
function updateTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        timeElapsed++;
        document.querySelector(".curr_time").textContent = timeLeft + "s";
    }
    else {
        finishGame();
    }
}
function finishGame() {
    clearInterval(timer);
    document.querySelector(".input_area").disabled = true;
    document.querySelector(".quote").textContent = "Click on restart to start a new game.";
    document.querySelector(".restart_btn").style.display = "block";
    alert("Final score: " + (score - total_errors));
}
