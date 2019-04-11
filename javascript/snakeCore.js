(function (root) {
    "use strict";
    const doc = document;
    console.log(root);

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
        let previousPosition_X; 
        let previousPosition_Y;
        // let dx = 0.1;
        // let dy = 0.1;
        let currentDirection = 'left';
        let key; 

        canvasElem.width = window.innerWidth;
        canvasElem.height = window.innerHeight;

        let centerOfCanvas = {
            x: Math.round((window.innerWidth / 2)-10),
            y: Math.round((window.innerHeight / 2)-10),
        }; // add event when window change height or width and overwrite centerOfCanvas;
        console.log(centerOfCanvas);

        /* Create Snake Array */
        const snake = []; // hold snake parts

        /* Add part of snake to "snake array" */
        function createSnake(len) {

            for (let i = 0; i < len; i++) {
                snake.push({
                    x: centerOfCanvas.x + (snake_width * i),
                    y: centerOfCanvas.y
                });
            }
            console.log(snake);
            initSnake();
        }

        createSnake(1); // add "start button" to call function

        /* For each part of snake call function "drawSnakeFromPart" */
        function initSnake() {
            console.log("test");
            if (startORstopGame == false) {
                // snake.forEach(drawSnakeFromPart);
                snake.forEach(function (part) { // do zmiany
                    ctx.fillStyle = snake_color;
                    ctx.strokeStyle = snake_border_color;
                    ctx.fillRect(part.x, part.y, snake_width, snake_height);
                    // console.log(part.x);
                    ctx.strokeRect(part.x, part.y, snake_width, snake_height);
                });

                previousPosition_X = snake[0].x; 
                previousPosition_Y = snake[0].y;
            }
            if (startORstopGame == true) {
                // clearCanvas();
                //  console.log("StartAnimation");
                snake.forEach(drawSnakeFromPart);
                window.requestAnimationFrame(initSnake);
            }
        }

        /* Display snake form part in canvas */
        function drawSnakeFromPart(part, index) {

            ctx.fillStyle = snake_color;
            ctx.strokeStyle = snake_border_color;
            ctx.fillRect(part.x += (directionOfMovment_horizontal), part.y += (directionOfMovment_vertical), snake_width, snake_height);
            ctx.strokeRect(part.x += (directionOfMovment_horizontal), part.y += (directionOfMovment_vertical), snake_width, snake_height);

        }
        

        function clearCanvas () {
            ctx.clearRect(0,0, canvasElem.width, canvasElem.height);
        }

        function changeSnakePart_position(ver, her) {
            let i = 0;
            let len = snake.length;
            for(i; i < len; i++) {
 
            }
        }

        
        //add an event, when you click "space" the game will start
        root.addEventListener("keydown", function (e) {
            let key = e.keyCode;
            let calc;

            if (key == 32 && startORstopGame == false) {
                console.log("Game Started");
                gameBackground.style.opacity = 0;
                gameGuide.style.opacity = 0;
                startORstopGame = true;
                window.requestAnimationFrame(initSnake);
            } else if (key == 32 && startORstopGame == true) {
                startORstopGame = false;
                console.log("Game Stopped");
                // gameBackground.style.opacity = ;
                //gameGuide.style.opacity = 0.8;
                window.cancelAnimationFrame(initSnake);
                //animate stop ???
            }

            // change direction of snake
            switch (key) {
                case 37: // left
                    if (currentDirection !== 'right' ) {
                        //math.abs
                        let updatePosition_Y = snake[0].y;
                        calc = Math.abs(previousPosition_Y - updatePosition_Y) ;

                        if(calc >= 20 ){
                            previousPosition_X = snake[0].x;
                            directionOfMovment_vertical = 0;
                            directionOfMovment_horizontal = -snakeVelocity;
                            currentDirection = 'left';
                         break;
                        }  
                    }

                    break;
                case 38: // up
                    if (currentDirection !== 'down') {

                        let updatePosition_X = snake[0].x;
                        calc = Math.abs(previousPosition_X - updatePosition_X);

                        if(calc >= 20 ) {
                            previousPosition_Y = snake[0].y;
                            directionOfMovment_vertical = -snakeVelocity;
                            directionOfMovment_horizontal = 0;
                            currentDirection = 'up';
                            break;
                        } 
                    }
                    break;
                case 39: // right
                    if (currentDirection !== 'left') {

                        let updatePosition_Y = snake[0].y;
                        calc = Math.abs(previousPosition_Y - updatePosition_Y);
                      
                        if(calc >= 20 || calc <= -20) {
                            previousPosition_X = snake[0].x;
                            directionOfMovment_vertical = 0;
                            directionOfMovment_horizontal = +snakeVelocity;
                            currentDirection = 'right';
                            break;
                        }
                    }
                    break;
                case 40: // down
                    if (currentDirection !== 'up') {

                        let updatePosition_X = snake[0].x;
                        calc = Math.abs(previousPosition_X - updatePosition_X);

                        if(calc <= -20 || calc >= 20) {
                            previousPosition_Y = snake[0].y;
                            directionOfMovment_vertical = +snakeVelocity;
                            directionOfMovment_horizontal = 0;
                            currentDirection = 'down';
                            break;
                        }
                    }
                    break;
                default:
            }
        }, false);

    }, false);


})(this)


