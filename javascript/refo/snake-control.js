
var _SNAKE = (function(snk){
    "use strict";

    window.addEventListener('keydown', function(e){

        

        var key = e.keyCode;
        var calc;

        snk.updatePositions.current();
    
        if (key == 32 && snk.data.gameStatus == false) {
            console.log("%cGame Started", "color: blue; font-size: 15px");

            snk.UI.hideBg();
            snk.UI.toggleUi();
            snk.changeGameStatus();
            return;

        } else if (key == 32 && snk.data.gameStatus == true) {
            console.log("%cGame Stopped", "color: crimson; font-size: 15px");
            snk.UI.toggleUi();
            snk.changeGameStatus();
            return;
        };
       
        // check if you can change direction
        var calc = snk.directionChecker();
        
        if (calc >= 20 && snk.data.gameStatus == true) {
            // left
            if(key == 37 || key == 65){
                if(snk.data.currentDirection !== 'right' && snk.data.currentDirection !== 'left'){
                    console.log('left');
                    snk.data.position.previous.x = snk.data.snakeParts[0].x;
                    snk.data.directionVertical = 0;
                    snk.data.directionHorizontal = -1;
                    snk.data.currentDirection = 'left';
                }
                return;
            };
            // up
            if(key == 38 || key == 87){
                if(snk.data.currentDirection !== 'down' && snk.data.currentDirection !== 'up'){
                    console.log('up');
                    snk.data.position.previous.y = snk.data.snakeParts[0].y;
                    snk.data.directionVertical = -1;
                    snk.data.directionHorizontal = 0;
                    snk.data.currentDirection = 'up';
                }
                return;
            };
            // right
            if(key == 39 || key == 68) {
                if(snk.data.currentDirection !== 'left' && snk.data.currentDirection !== 'right') {
                    console.log('right');
                    snk.data.position.previous.x = snk.data.snakeParts[0].x;
                    snk.data.directionVertical = 0;
                    snk.data.directionHorizontal = 1;
                    snk.data.currentDirection = 'right';                
                }
                return;
            };
            // down
            if(key == 40 || key == 83) {
                if(snk.data.currentDirection !== 'up' && snk.data.currentDirection !== 'down' ){
                    console.log('down');
                    snk.data.position.previous.y = snk.data.snakeParts[0].y;
                    snk.data.directionVertical = 1;
                    snk.data.directionHorizontal = 0;
                    snk.data.currentDirection = 'down';
                }
                return;
            };

        
        } else {
            // TODO: add change direction with delay ?? HMM??

        };


    },false);
    
    
    return snk;
})(_SNAKE || {});