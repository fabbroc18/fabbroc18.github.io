const bird = document.getElementById("bird");
const scoreElement = document.getElementById("score");
let gravity = 0.08;
let velocity = 0;
let pipeSpeed = 3.5;
let jumpForce = -2;
let paused = false;
let gameOver = false;
let score = 0;
let pipes = [];
let hacks = {
    immortal: ,
    triple: , 
    tiny: ,
};
document.addEventListener("touchstart", function(event) {
    event.preventDefault();
    jump();
});

document.addEventListener("keydown", () => {
    if (!paused && !gameOver) {
        velocity = jumpForce;
    }
});

function gameLoop() {
    if (!paused && !gameOver) {
        velocity += gravity;
        const birdTop = parseFloat(getComputedStyle(bird).top);
        bird.style.top = birdTop + velocity + "px";

        if (birdTop > 370 || birdTop < 0) endGame();

        pipes.forEach(pipe => movePipe(pipe));
    }

    requestAnimationFrame(gameLoop);
}

function createPipe() {
    if (paused || gameOver) return;

    const topHeight = Math.floor(Math.random() * 200) + 50;
    const gap = 120;
    const bottomHeight = 400 - topHeight - gap;

    const topPipe = document.createElement("div");
    const bottomPipe = document.createElement("div");

    topPipe.className = "pipe pipe-top";
    bottomPipe.className = "pipe pipe-bottom";

    topPipe.style.height = topHeight + "px";
    bottomPipe.style.height = bottomHeight + "px";

    topPipe.style.left = "400px";
    bottomPipe.style.left = "400px";

    document.getElementById("game-container").appendChild(topPipe);
    document.getElementById("game-container").appendChild(bottomPipe);

    const pipePair = { top: topPipe, bottom: bottomPipe, x: 400, passed: false };
    pipes.push(pipePair);
    let pipeClass = "pipe-green";


let pipeTop = document.createElement("div");
let pipeBottom = document.createElement("div");

pipeTop.classList.add(pipeClass);
pipeBottom.classList.add(pipeClass);

document.body.appendChild(pipeTop);
document.body.appendChild(pipeBottom);
if (score >= 120) {
    pipeClass = "pipe-red";
} else if (score >= 60) {
    pipeClass = "pipe-blue";
}
}

function movePipe(pipePair) {
    pipePair.x -= pipeSpeed;
    pipePair.top.style.left = pipePair.x + "px";
    pipePair.bottom.style.left = pipePair.x + "px";

    if (!pipePair.passed && pipePair.x + 50 < 100) {
        pipePair.passed = true;
        score += hacks.triple ? 3 : 1;
        scoreElement.innerText = score;

        if (score % 25 === 0) pipeSpeed += 0.5;
    }

    const birdTop = parseFloat(getComputedStyle(bird).top);
    const birdBottom = birdTop + 30;

    const pipeTopHeight = parseFloat(pipePair.top.style.height);
    const pipeX = pipePair.x;

    if (
        pipeX < 130 && pipeX + 50 > 100 &&
        (birdTop < pipeTopHeight || birdBottom > pipeTopHeight + 120)
    ) {
        if (!hacks.immortal) endGame();
    }
}

function endGame() {
    gameOver = true;
    alert("Game Over! Punteggio: " + score);
    location.reload();
}

function togglePause() {
    paused = !paused;
}

function activateHack() {
    const code = document.getElementById("hack-input").value.trim().toLowerCase();

    switch (code) {
        case "immortal":
            hacks.immortal = true;
            alert("Immortalità attivata!");
            break;
        case "triple":
            hacks.triple = false;
            alert("Punti tripli attivati!");
            break;
        case "tiny":
            hacks.tiny = true;
            bird.style.width = "15px";
            bird.style.height = "15px";
            alert("cerchio mini attivato!");
            break;
        default:
            alert("Codice non riconosciuto.");
    }

    document.getElementById("hack-input").value = "";
}//codici hack 
//immortal
//tiny
//triple

setInterval(createPipe, 2000);
gameLoop();
