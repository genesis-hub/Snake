var _SNAKE = (function(snk){
    console.log(snk.data.snakeParts)

    window.addEventListener('keydown', function(e){

        var key = e.keyCode;
        var calc;

        if (key == 32 && snk.data.gameStatus == false) {
            console.log("%cGame Started", "color: blue; font-size: 15px");
            snk.UI.hideBg();
            snk.UI.toggleUi();
            snk.data.gameStatus = true;
            snk.changeGameStatus();
        } else if (key == 32 && snk.data.gameStatus == true) {
             snk.data.gameStatus = false;
            console.log("%cGame Stopped", "color: crimson; font-size: 15px");
            snk.UI.toggleUi();
            // gameBackground.style.opacity = ;
            //gameGuide.style.opacity = 0.8;
            // window.cancelAnimationFrame(initSnake);
            //animate stop ???
        };

        
        if (snk.data.currentDirection == 'left' || snk.data.currentDirection == 'right') {
            calc = Math.abs(previousPosition_X - updatePosition_X);
        } else {
            calc = Math.abs(previousPosition_Y - updatePosition_Y)
        };
        
        if (calc >= 20) {
            console.log(`${calc}`)
            // change direction of snake
            switch (key) {
                case 37: // left
                    if (snk.data.currentDirection !== 'right' && snk.data.currentDirection !== 'left') {
                        previousPosition_X = snake[0].x;
                        directionOfMovment_vertical = 0;
                        directionOfMovment_horizontal = -snakeVelocity;
                        snk.data.currentDirection = 'left';
                    }
                    break;

                case 38: // up
                    if (snk.data.currentDirection !== 'down' && snk.data.currentDirection !== 'up') {
                        previousPosition_Y = snake[0].y;
                        directionOfMovment_vertical = -snakeVelocity;
                        directionOfMovment_horizontal = 0;
                        snk.data.currentDirection = 'up';
                    }
                    break;

                case 39: // right
                    if (snk.data.currentDirection !== 'left' && snk.data.currentDirection !== 'right') {

                        previousPosition_X = snake[0].x;
                        directionOfMovment_vertical = 0;
                        directionOfMovment_horizontal = +snakeVelocity;
                        snk.data.currentDirection = 'right';
                    }
                    break;

                case 40: // down
                    if (snk.data.currentDirection !== 'up' && snk.data.currentDirection !== 'down') {
                        previousPosition_Y = snake[0].y;
                        directionOfMovment_vertical = +snakeVelocity;
                        directionOfMovment_horizontal = 0;
                        snk.data.currentDirection = 'down';
                    }
                    break;

                default:
            }
        } else {
            // TODO: add change direction with delay ?? HMM??

        }


    },false);
    
    
    return snk;
})(_SNAKE || {});