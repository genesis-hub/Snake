/* Snake Core */
/* Copyright genesis-hub */

var SNAKE = (function (root, snake) {
    
    "use strict";
    const doc = document;
    console.log(root);
    let previousPosition_X; 
    let previousPosition_Y;
    let currentDirection = 'left';
    /* Create Snake Array */
    const snakeTab = []; // hold snake parts
    root.addEventListener("DOMContentLoaded", function () {
        
        const gameBackground = doc.getElementById("game_background");
        const gameGuide = doc.getElementById("game_guide");
   
        const canvasElem = doc.getElementById('gameCanvas');
        const ctx = canvasElem.getContext('2d');

        let startORstopGame = false; // start or stop game ;
        let snake_color = "#234564";
        let snake_border_color = "#101010";
        let snake_width = 20;
        let snake_height = 20;
        let snakeVelocity = 1;
        let directionOfMovment_vertical = 0;
        let directionOfMovment_horizontal = -snakeVelocity;
       
        let key; 

        canvasElem.width = window.innerWidth;
        canvasElem.height = window.innerHeight;

        let centerOfCanvas = {
            x: Math.round((window.innerWidth / 2) - 10), // -10 ? center of the square 
            y: Math.round((window.innerHeight / 2) - 10), // -10 ? center of the square 
        }; // add event when window change height or width and overwrite centerOfCanvas;
        console.log(centerOfCanvas);

      

        /* Add part of snake to "snake array" */
        function createSnake(len) {

            for (let i = 0; i < len; i++) {
                snakeTab.push({
                    x: centerOfCanvas.x + (snake_width * i),
                    y: centerOfCanvas.y
                });
            }
            console.log(snakeTab);
            initSnake();
        }

        createSnake(1); //TODO: add "start button" to call function

        /* For each part of snake call function "drawSnakeFromPart" */
        function initSnake() {
            //console.log("test");
            if (startORstopGame == false) {
                // snake.forEach(drawSnakeFromPart);
                snakeTab.forEach(function (part) { // TODO: do zmiany
                    ctx.fillStyle = snake_color;
                    ctx.strokeStyle = snake_border_color;
                    ctx.fillRect(part.x, part.y, snake_width, snake_height);
                    // console.log(part.x);
                    ctx.strokeRect(part.x, part.y, snake_width, snake_height);
                });

                previousPosition_X = snakeTab[0].x; 
                previousPosition_Y = snakeTab[0].y;
            }
            if (startORstopGame == true) {
                // clearCanvas();
                //  console.log("StartAnimation");
                snakeTab.forEach(drawSnakeFromPart);
                // console.log(snake);
                window.requestAnimationFrame(initSnake);
            }
        }

        /* Display snake from part in canvas */
        function drawSnakeFromPart(part, index) {

            ctx.fillStyle = snake_color;
            ctx.strokeStyle = snake_border_color;
            ctx.fillRect(part.x += (directionOfMovment_horizontal), part.y += (directionOfMovment_vertical), snake_width, snake_height);
            ctx.strokeRect(part.x += (directionOfMovment_horizontal), part.y += (directionOfMovment_vertical), snake_width, snake_height);
            // console.log(snake[0].x);
        }
        

        function clearCanvas () {
            ctx.clearRect(0,0, canvasElem.width, canvasElem.height);
        }

        function changeSnakePart_position(ver, her) {
            let i = 0;
            let len = snakeTab.length;
            for(i; i < len; i++) {
 
            }
        }

        
        
    }, false);

    snake.data = {
        snakeParts: snakeTab,
        position: {
            previous: {
                x: previousPosition_X,
                y: previousPosition_Y,
            },

        
        }
    }

    return snake;
    
})(this, SNAKE || {});


