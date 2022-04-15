//Need to initialize a random nun
const buttonColor =["red", "blue", "green", "yellow"];
let gamePattern = [];
let level = 0;

function start() {
    let userClickedPattern = []
    let isStarted = false;
    // Need a click handler
    $(".btn").on("click",(e)=>{
        let userChoosenColor = e.currentTarget.id;
        userClickedPattern.push(userChoosenColor);
        console.log(userClickedPattern);
        playSound(userChoosenColor);
        animatePress(userChoosenColor);
    });

    $("body").on('keypress',(e)=>{
        if(e.key.toUpperCase() === 'A') {
            isStarted = true;
            // console.log(e)
        }
        if(isStarted === true) {
            $("#level-title").text("Level " + level);
            nextSequence();
            userClickedPattern = [];
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

    setTimeout(()=>{
        currentColorEle.removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {
    if(userClickedPattern === gamePattern) {
        console.log(true);
        return;
    }
    console.log(false);
}

// Need to generate game sequence
function nextSequence() {
    let randNum = Math.floor(Math.random() * 4);
    let randomChoosenColor = buttonColor[randNum];
    let btn = $(`#${randomChoosenColor}`);

    setInterval(()=>{
        btn.fadeIn();
        btn.fadeOut();
    }, 100);

    gamePattern.push(randomChoosenColor)

    $("body").click(()=>{
        playSound(btn.attr('id'));
    });
    level ++;
}

start();