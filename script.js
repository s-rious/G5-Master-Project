let timelimit = 60;
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
    "carrot",
    "dog",
    "elephant",
    "frog",
    "giraffe",
    "hamburger",
    "ice cream",
    "jellyfish",
    "kangaroo",
    "lemon",
    "mango",
    "noodle",
    "orange",
    "penguin",
    "quokka",
    "rabbit",
    "strawberry",
    "tiger",
    "umbrella",
    "violin",
    "watermelon",
    "xylophone",
    "yogurt",
    "zebra",
    "ant",
    "bear",
    "cactus",
    "dolphin",
    "elephant",
    "flamingo",
    "giraffe",
    "hedgehog",
    "iguana",
    "jaguar",
    "kiwi",
    "lion",
    "mushroom",
    "narwhal",
    "ostrich",
    "panda",
    "quail",
    "raccoon",
    "seahorse",
    "toucan",
    "umbrella",
    "vampire",
    "walrus",
    "x-ray",
    "yak",
    "zucchini",
    "antelope",
    "bat",
    "camel",
    "duck",
    "elephant",
    "fox",
    "gorilla",
    "hippopotamus",
    "iguana",
    "jellyfish",
    "kangaroo",
    "llama",
    "monkey",
    "nightingale",
    "owl",
    "penguin",
    "quokka",
    "rhinoceros",
    "sloth",
    "tiger",
    "umbrella",
    "vulture",
    "walrus",
    "x-ray",
    "yak",
    "zebra",
    "aardvark",
    "bee",
    "cheetah",
    "dolphin",
    "elephant",
    "falcon",
    "gazelle",
    "horse",
    "iguana",
    "jaguar",
    "kangaroo",
    "lion",
    "meerkat",
    "narwhal",
    "ostrich",
    "panda",
    "quokka",
    "raccoon",
    "seahorse",
    "toucan",
    "umbrella",
    "vampire",
    "walrus",
    "x-ray",
    "yak",
    "zucchini",
    "albatross",
    "buffalo",
    "capybara",
    "dalmatian",
    "elephant",
    "fennec fox",
    "gorilla",
    "hedgehog",
    "ibis",
    "jellyfish",
    "koala",
    "lemur",
    "mongoose",
    "nightingale",
    "ocelot",
    "panda",
    "quail",
    "rabbit",
    "squirrel",
    "toucan",
    "umbrella",
    "vulture",
    "weasel",
    "xylophone",
    "yak",
    "zebra",
    "alligator",
    "bison",
    "cheetah",
    "dolphin",
    "elephant",
    "frog",
    "giraffe",
    "hippopotamus",
    "iguana",
    "jaguar",
    "kangaroo",
    "lion",
    "moose",
    "narwhal",
    "octopus",
    "penguin",
    "quokka",
    "rhinoceros",
    "sloth",
    "tiger",
    "umbrella",
    "vampire",
    "walrus",
    "x-ray",
    "yak",
    "zucchini",
    "antelope",
    "bear",
    "cheetah",
    "dolphin",
    "elephant",
    "flamingo",
    "giraffe",
    "hedgehog",
    "iguana",
    "jaguar",
    "kangaroo",
    "llama",
    "monkey",
    "nightingale",
    "owl",
    "penguin",
    "quokka",
    "raccoon",
    "seahorse",
    "toucan",
    "umbrella",
    "vulture",
    "walrus",
    "x-ray",
    "yak",
    "zebra",
    "aardvark",
    "bat",
    "camel",
    "duck",
    "elephant",
    "fox",
    "gorilla",
    "hippopotamus",
    "iguana",
    "jellyfish",
    "kangaroo",
    "llama",
    "monkey",
    "nightingale",
    "owl",
    "penguin",
    "quokka",
    "rhinoceros"
];
document.querySelector("#finalscore").style.display = "none";
let error_group = document.querySelector(".errors");
let score_text = document.querySelector(".curr_score");

let timeLeft = timelimit;
let timeElapsed = 0;
let total_errors = 0;
let errors = 0;
let currQuote = "";
let quoteNum = 0;
let timer = null;
let score = -1;

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
        score += 1;
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
    score = 0;
    
    document.querySelector(".input_area").disabled = false;

    document.querySelector(".input_area").value = "";
    document.querySelector(".quote").textContent = 'Click on the area below to start the game.';
    document.querySelector(".curr_time").textContent = timeLeft + 's';
    document.querySelector(".curr_errors").textContent = 0;
    score_text.textContent = 0;
    document.getElementById("difficulty_btns").style.display = "block";
    document.querySelector("#finalscore").style.display = "none";
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
    document.querySelector("#finalscore").style.display = "flex";
    document.querySelector("#final_score").textContent = (score - total_errors);
}
