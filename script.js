let canvas;
let canvasContext;
let ballX = 50;
let ballY = 50;
let ballSpeedX = 10;
let ballSpeedY = 4;

let paddle1Y = 250;
const PADDLE_HEIGHT = 100;

function calculateMousePos(e) {
    let rect = canvas.getBoundingClientRect();
    let root = document.documentElement;
    let mouseX = e.clientX - rect.left - root.scrollLeft;
    let mouseY = e.clientY - rect.top - root.scrollTop;
    return {
        x:mouseX,
        y:mouseY
    };
};


window.onload = function () {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');

    // setinterval e potrebno za da se povikuva funckijata na primer sekoja sekunda
    // taka mozeme da vidime sto se slucuva na ekranot
    let fps = 30;
    setInterval(function () {
        moveEverything();
        drawEverything();
    }, 1000 / fps);

    canvas.addEventListener('mousemove',
        function(e) {
            let mousePos = calculateMousePos(e);
            // Divided by 2 so the position of the mouse is in the center of the paddle
            paddle1Y = mousePos.y - (PADDLE_HEIGHT/2);
        });

};


function moveEverything() {
    ballX = ballX + ballSpeedX;
    ballY = ballY + ballSpeedY;
    if (ballX < 0) {
        ballSpeedX = -ballSpeedX;
    }
    if (ballX > canvas.width) {
        ballSpeedX = -ballSpeedX;
    }
    if (ballY < 0) {
        ballSpeedY = -ballSpeedY;
    }
    if (ballY > canvas.height) {
        ballSpeedY = -ballSpeedY;
    }
}

function drawEverything() {
    // Next line blanks out the screen with black
    colorRect(0, 0, canvas.width, canvas.height, 'black');
    // This is left player paddle
    colorRect(0, paddle1Y, 10, 100, 'white');
    // Next line draws the ball, circle
    colorCircle(ballX, ballY, 10, 'white');
};


// This function draws the circle
function colorCircle(centerX, centerY, radius, drawColor) {
    canvasContext.fillStyle = drawColor;
    canvasContext.beginPath();
    canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
    canvasContext.fill();
};


//This function draws the background color(canvas) and paddles
function colorRect(leftX, topY, width, height, drawColor) {
    canvasContext.fillStyle = drawColor;
    canvasContext.fillRect(leftX, topY, width, height);
};
