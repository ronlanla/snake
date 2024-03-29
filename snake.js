
var Snake = function(container, arenaSize) {
    this.container = container;
    this.arenaSize = arenaSize;

    this.reset();
};

Snake.prototype.colorNum = 0;
Snake.prototype.body = [];

Snake.prototype.addBodyPart = function() {
    var bodyElement = document.createElement("div");
    bodyElement.classList.add("bodyPiece");
    console.log(this.container);
    this.container.appendChild(bodyElement);
    this.colorNum++;
    var bodyPart = [this.body[0][0], this.body[0][1], bodyElement, [193, 100, this.colorNum * 2]];
    this.body.unshift(bodyPart);
};

Snake.prototype.reset = function() {
    var headElement = document.getElementById("snek");
    this.colorNum = 0;

    var x = Math.floor(Math.random() * this.arenaSize);
    var y = Math.floor(Math.random() * this.arenaSize);
    this.body = [[x, y, headElement]];
    this.addBodyPart();
};

// Arena Variables //
var arena = document.getElementById("arena");
var canvasSize = document.getElementById("arena").offsetWidth - 20;
var cellSize = 20;
var cellCanvas = (canvasSize / cellSize);
var scoreBoardCounter = 0;
var pointsAdd = 0;
var highScore = 0;
// ############### //

s = new Snake(arena, cellCanvas)

// Other //
var pointsPlusLength = 0;
var gradientColor = 10;
var colorNum = 0;
//       //

// Snake Variables //
var food = document.getElementById("food");
var foodPosition = [Math.floor(Math.random() * cellCanvas), Math.floor(Math.random() * cellCanvas)];
var snakeHead = document.getElementById("snek");
var snakeBody = [[Math.floor(Math.random() * cellCanvas),Math.floor(Math.random() * cellCanvas),snakeHead]];
// ############### //

/* Directions */
var left = 65;
var right = 68;
var up = 87;
var down = 83;
/* ########## */


var head = snakeBody[snakeBody.length - 1];
createPiece(head)

var direction = undefined;
var snakeSpeed = 70;

snakeHead.style.top = Math.floor(Math.random() * cellCanvas) * cellSize + 'px';
snakeHead.style.left = Math.floor(Math.random() * cellCanvas) * cellSize + 'px';

food.style.top = foodPosition[0] * cellSize + 'px';
food.style.left = foodPosition[1] * cellSize + 'px';


moveSnake = setInterval(function (head) {
    var head = snakeBody[snakeBody.length - 1];
    if(direction == right)
    {
        head[1]++;
    }
    else if(direction == left)
    {
            head[1]--;  
    }
    else if(direction == up)
    {
        head[0]--;
    }
    else if(direction == down)
    {
        head[0]++;
    }
    gameFunctions(head,snakeBody);
},snakeSpeed);


window.onkeydown = function (e,index) {
    if(e.keyCode == right)
    {
        if(direction == left)
        {
            return;
        }
        else
        {
            direction = right;
            console.log("GO RIGHT");
        }
    } 
    else if(e.keyCode == left) 
    {
        if(direction == right)
            {
                return;
            }
        direction = left;
        console.log("GO LEFT");
    }
    else if(e.keyCode == up)
    {
        if(direction == down)
            {
                return;
            }
       direction = up;
       console.log("GO UP");
    }
    else if(e.keyCode == down)
    {
        if(direction == up)
        {
            return;
        }
       direction = down;
       console.log("GO DOWN");
    }
}

function gameFunctions(head,snakeBody) {

    // game logic
    foodRandom(head,index,gradientColor,snakeBody);
    followBody(head,index,gradientColor);
    headOutBounds(head);
    scoreBoard();
    setNewHighScore(scoreBoardCounter)
    showSnakePosition(head);
    // checkHeadPos(head,snakeBody);
    console.log('Head Is At ' + head[0] + ' ' + head[1]);

    for (var index = 0; index < snakeBody.length; index++) {
        resetGame(head,index);
    };
    
    // rendering
    renderSnake(snakeBody,head); 
}

function createPiece(bodyPiece,gradientColor) {
    var snakeBodyNew = document.createElement("div");
    snakeBodyNew.classList.add("bodyPiece");
    document.getElementById("arena").appendChild(snakeBodyNew);
    colorNum++;
    gradientColor = colorNum * 2;
    var createNewArray = [0, 0, snakeBodyNew, [193, 100, gradientColor]];
    snakeBody.unshift(createNewArray);
    console.log('FOOD HAS SPAWNED ' + foodPosition[0] + ' ' + foodPosition[1]);
}

function foodRandom(head,index,gradientColor,snakeBody) {
    if (head[0] === foodPosition[0] && head[1] === foodPosition[1]){ 
        foodPosition[0] = Math.floor(Math.random() * cellCanvas);
        foodPosition[1] = Math.floor(Math.random() * cellCanvas);
        food.style.top = foodPosition[0] * cellSize + 'px';
        food.style.left = foodPosition[1] * cellSize + 'px';
        createPiece(head,gradientColor);
        pointsPlusLength = snakeBody.length + head[0] + head[1];
        scoreBoardCounter = scoreBoardCounter + pointsPlusLength;
        if(scoreBoardCounter > highScore) {
            highScore = scoreBoardCounter;
        }
        scoreBoardColor(snakeBody);
        foodColor(snakeBody)
    }     
}

function showSnakePosition(head) {
    var snakePosition = document.getElementById("positionOfSnake").innerHTML = head[0] + " , " + head[1];
}

function scoreBoardColor(snakeBody) {
    var scoreColor = document.getElementById("arena");
    scoreColor.style.backgroundColor = 'hsl(' + snakeBody[0][3][0] + ', ' + snakeBody[0][3][1] + '%, ' + (Math.floor(Math.random() * 50 - 20)) + '%)';
}

function foodColor(snakeBody) {
    var foodColor = document.getElementById("food");
    foodColor.style.backgroundColor = 'hsl(' + snakeBody[0][3][0] + ', ' + snakeBody[0][3][1] + '%, ' + (Math.floor(Math.random() * 100 + 30)) + '%)';
}

function setNewHighScore(scoreBoardCounter) {
    var addNewHighscore = document.getElementById("highScoreBoard").innerHTML = "High Score = " + highScore;
}

function scoreBoard() {
   var score = document.getElementById("scoreBoard").innerHTML = "Current Score = " + scoreBoardCounter;
}

function followBody(head) {
    for (var index = 1; index < snakeBody.length; index++) {
        snakeBody[index-1][0] = snakeBody[index][0];
        snakeBody[index-1][1] = snakeBody[index][1];
        // snakeBody[index-1][3][2] = index * 4;
        // snakeBody[index-1][3][0] = index * 4;
        test = 'hsl(' + snakeBody[index-1][3][0] + ', ' + snakeBody[index-1][3][1] + '%, ' + snakeBody[index-1][3][2] + '%)';
        snakeBody[index-1][2].style.backgroundColor = test;
    }
}

function renderSnake(snakeBody,head) {
    for (var index = 0; index < snakeBody.length; index++) {
        snakeBody[index][2].style.left = snakeBody[index][1] * cellSize + 'px';
        snakeBody[index][2].style.top = snakeBody[index][0] * cellSize + 'px';
        resetGame(head,index);
    }
}

function resetGame(head,index) {
    if (index >= snakeBody.length-2) {
        return
    }

    if (head[0] === snakeBody[index][0] && head[1] === snakeBody[index][1]) {
        console.log("died");
        var snakeHead = document.getElementById("snek");
        snakeHead.style.opacity = 0.0;
        scoreBoardCounter = 0;
        colorNum = 0;
        var deleteSnakeBody = document.getElementsByClassName("bodyPiece");
        while(deleteSnakeBody.length > 0) {
            deleteSnakeBody[0].parentNode.removeChild(deleteSnakeBody[0]);
        }
        snakeBody = [[Math.floor(Math.random() * cellCanvas),Math.floor(Math.random() * cellCanvas),snakeHead]];
        createPiece(head)
        var scoreColor = document.getElementById("arena");
        scoreColor.style.backgroundColor = 'hsl(' + snakeBody[0][3][0] + ', ' + snakeBody[0][3][1] + '%, ' + (Math.floor(Math.random() * 50 - 20)) + '%)';
    }
}

function headOutBounds(head) {
    if(head[0] > cellCanvas || head[0] < 0 || head[1] > cellCanvas || head[1] < 0) {
        console.log("died");
        var snakeHead = document.getElementById("snek");
        snakeHead.style.opacity = 0.0;
        scoreBoardCounter = 0;
        colorNum = 0;
        snakeBody[snakeBody.length-1][2].style.backgroundColor = '';
        var deleteSnakeBody = document.getElementsByClassName("bodyPiece");
        while(deleteSnakeBody.length > 0) {
            deleteSnakeBody[0].parentNode.removeChild(deleteSnakeBody[0]);
        }
        snakeBody = [[Math.floor(Math.random() * cellCanvas),Math.floor(Math.random() * cellCanvas),snakeHead]];
        direction = undefined;
        createPiece(head)
        var scoreColor = document.getElementById("arena");
        scoreColor.style.backgroundColor = 'hsl(' + snakeBody[0][3][0] + ', ' + snakeBody[0][3][1] + '%, ' + 30 + '%)';
    }
    else{
        return
    }
}