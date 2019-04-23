var _SNAKE = (function(snk){
    console.log(snk.data.snakeParts)

    window.addEventListener('keydown', function(e){

        var key = e.keyCode;
        var calc;
        snk.updatePositions.current();
        if (key == 32 && snk.data.gameStatus == false) {
            console.log("%cGame Started", "color: blue; font-size: 15px");
            snk.UI.hideBg();
            snk.UI.toggleUi();
            snk.changeGameStatus();

        } else if (key == 32 && snk.data.gameStatus == true) {
            console.log("%cGame Stopped", "color: crimson; font-size: 15px");
            snk.UI.toggleUi();
            snk.changeGameStatus();
            return;
        };

        //check if you can change direction 
    
        if (snk.data.currentDirection == 'left' || snk.data.currentDirection == 'right') {
            calc = Math.abs(snk.data.position.previous.x - snk.data.position.current.x);
        } else {
            calc = Math.abs(snk.data.position.previous.y - snk.data.position.current.y)
        };
        
        if (calc >= 20) {
            console.log(calc);
            // change direction of snake
            switch (key) {
                case 37: // left
                    if (snk.data.currentDirection !== 'right' && snk.data.currentDirection !== 'left') {
                        snk.data.position.previous.x = snake[0].x;
                        directionOfMovment_vertical = 0;
                        directionOfMovment_horizontal = -snakeVelocity;
                        snk.data.currentDirection = 'left';
                    }
                    break;

                case 38: // up
                    if (snk.data.currentDirection !== 'down' && snk.data.currentDirection !== 'up') {
                        snk.data.position.previous.y = snake[0].y;
                        directionOfMovment_vertical = -snakeVelocity;
                        directionOfMovment_horizontal = 0;
                        snk.data.currentDirection = 'up';
                    }
                    break;

                case 39: // right
                    if (snk.data.currentDirection !== 'left' && snk.data.currentDirection !== 'right') {

                        snk.data.position.previous.x = snake[0].x;
                        directionOfMovment_vertical = 0;
                        directionOfMovment_horizontal = +snakeVelocity;
                        snk.data.currentDirection = 'right';
                    }
                    break;

                case 40: // down
                    if (snk.data.currentDirection !== 'up' && snk.data.currentDirection !== 'down') {
                        snk.data.position.previous.y = snake[0].y;
                        directionOfMovment_vertical = +snakeVelocity;
                        directionOfMovment_horizontal = 0;
                        snk.data.currentDirection = 'down';
                    }
                    break;

                default:
            }
        } else {
            // TODO: add change direction with delay ?? HMM??

        };


    },false);
    
    
    return snk;
})(_SNAKE || {});