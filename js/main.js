$(document).keydown(function(e) {
    switch (e.which) {
    case 38:
        $('#player2').stop().animate({
            top: '-=30'
        }, "fast"); //up arrow key
        break;
    case 40:
        $('#player2').stop().animate({
            top: '+=30'
        }, "fast"); //bottom arrow key
        break;
    case 87:
        $('#player1').stop().animate({
            top: '-=30'
        }, "fast"); //up arrow key
        break;
    case 83:
        $('#player1').stop().animate({
            top: '+=30'
        }, "fast"); //bottom arrow key
        break;
    }

    
});

var player1 = {
        name: "John",
        score: 0
};
var player2 = {
        name: "Kevin",
        score: 0
};



var ball = { 
    speed: 3, 
    x: 290, 
    y: 140, 
    directionX: 1, 
    directionY: 1 
};

$(document).ready(function() {
    // Set main loop to be called on the desired frame rate
    setInterval(gameLoop, 1000 / 60);
});

// Main loop of the game
function gameLoop() {
    moveBall();
}


// Control movement of the ball doing collision checking
function moveBall() {
    var gameWidth = parseInt($("#gboard").width());
    var gameHeight = parseInt($("#gboard").height());

    // Check collision to the bottom border and change the moving orientation on Y axis
    if (ball.y + ball.speed * ball.directionY > (gameHeight - parseInt($("#ball").height()))) {
        ball.directionY = -1
    }
    
    // Check collision to the top border and change the moving orientation on Y axis
    if (ball.y + ball.speed * ball.directionY < 0) {
        ball.directionY = 1
    }

    // Check collision to the left border and change the moving orientation on X axis
    if (ball.x + ball.speed * ball.directionX > (gameWidth - parseInt($("#ball").width()))) {
        checkBorder($("#player2").offset(), $("#ball").offset(), true);
        ball.directionX = -1
    }

    // Check collision to the right border and change the moving orientation on X axis
    if (ball.x + ball.speed * ball.directionX < 0) {
        checkBorder($("#player1").offset(), $("#ball").offset(), false);
        ball.directionX = 1
    }
    
    // Update ball position on X and Y axes based on speed and orientation
    ball.x += ball.speed * ball.directionX;
    ball.y += ball.speed * ball.directionY;

    // Render the updated ball position
    $("#ball").css({ "left": ball.x, "top": ball.y });

};

function checkBorder(playerCoords, ballCoords, isLeft) {
    var playerBoardHeight = $(".player").height();
    if (ballCoords.top < playerCoords.top ||  ballCoords.top - playerCoords.top > playerBoardHeight) {
        if(isLeft) {
            player1.score++;
            $("#p1Score").text(player1.score);
        } else {
            player2.score++;
            $("#p2Score").text(player2.score);
        }
        ball.x = 290;
        ball.y = 140;
    }
}
