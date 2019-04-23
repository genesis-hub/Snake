//add an event, when you click "space" the game will start
//use the arrow keys to control the snake
Snake.control = (function() {
   
    window.addEventListener("keydown", function (e) {
         console.log(Snake.data.position);
        let key = e.keyCode;
        let calc;
        // let updatePosition_Y = snake[0].y;
        // let updatePosition_X = snake[0].x;
        console.log(key);
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

        if (currentDirection == 'left' || currentDirection == 'right') {
            calc = Math.abs(previousPosition_X - updatePosition_X);
        } else {
            calc = Math.abs(previousPosition_Y - updatePosition_Y)
        }

        if (calc >= 20) {
            console.log(`${calc}`)
            // change direction of snake
            switch (key) {
                case 37: // left
                    if (currentDirection !== 'right' && currentDirection !== 'left') {
                        previousPosition_X = snake[0].x;
                        directionOfMovment_vertical = 0;
                        directionOfMovment_horizontal = -snakeVelocity;
                        currentDirection = 'left';
                    }
                    break;

                case 38: // up
                    if (currentDirection !== 'down' && currentDirection !== 'up') {
                        previousPosition_Y = snake[0].y;
                        directionOfMovment_vertical = -snakeVelocity;
                        directionOfMovment_horizontal = 0;
                        currentDirection = 'up';
                    }
                    break;

                case 39: // right
                    if (currentDirection !== 'left' && currentDirection !== 'right') {

                        previousPosition_X = snake[0].x;
                        directionOfMovment_vertical = 0;
                        directionOfMovment_horizontal = +snakeVelocity;
                        currentDirection = 'right';
                    }
                    break;

                case 40: // down
                    if (currentDirection !== 'up' && currentDirection !== 'down') {
                        previousPosition_Y = snake[0].y;
                        directionOfMovment_vertical = +snakeVelocity;
                        directionOfMovment_horizontal = 0;
                        currentDirection = 'down';
                    }
                    break;

                default:
            }
        } else {
            // TODO: add change direction with delay ?? HMM??

        }

    }, false);

    return ;
})(Snake.control);