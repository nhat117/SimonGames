//Need to initialize a random nun
const buttonColor = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let level = 0;
let userClickedPattern = []
let isStarted = false;

function start() {
    // Need a click handler
    $(".btn").on("click", (e) => {
        let userChoosenColor = e.currentTarget.id;
        userClickedPattern.push(userChoosenColor);
        console.log(userClickedPattern);
        playSound(userChoosenColor);
        animatePress(userChoosenColor);
        checkAnswer(userClickedPattern.length -1);
    });

    $("body").on('keypress', (e) => {
        if (e.key.toUpperCase() === 'A') {
            if (!isStarted) {
                nextSequence();
            }
            isStarted = true;
        }
    })
}

function playSound(name) {
    let audio = new Audio(`./sounds/${name}.mp3`);
    // audio.play();
}

function animatePress(currentColor) {
    let currentColorEle = $(`#${currentColor}`);
    currentColorEle.addClass("pressed");

    setTimeout(() => {
        currentColorEle.removeClass("pressed");
    }, 100);
}

// Need to generate game sequence
function nextSequence() {
    userClickedPattern = []
    let randNum = Math.floor(Math.random() * 4);
    let randomChoosenColor = buttonColor[randNum];
    let btn = $(`#${randomChoosenColor}`).fadeIn(100).fadeOut(100).fadeIn(100);

    gamePattern.push(randomChoosenColor)

    $("body").click(() => {
        playSound(btn.attr('id'));
    });
    $("#level-title").text("Level " + level);
    level++;
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log(true)
        //If user got the most recent answer right, they have to fin
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    } else {
        console.log(false);
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(()=>{$("body").removeClass("game-over");},200);
        $("#level-title").text("Game Over, Press Any Key To Restart");
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = []
    isStarted = false;
    userClickedPattern = []
}

start();