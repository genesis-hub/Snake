
var _SNAKE = (function(snk){
    "use strict";

    window.addEventListener('keydown', function(e){

        var key = e.keyCode;
        var calc;
        // console.log(key)
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
        
        //  h -1 left
        //  v -1 up
        //  h 1 right
        //  v 1 down

        if (calc >= 20 && snk.data.gameStatus == true) {
            console.log(calc)
            // left
            if(key == 37 || key == 65){
                if(snk.data.directionHorizontal !== 1 && snk.data.directionHorizontal !== -1){
                    snk.data.position.previous.x = snk.data.snakeParts[0].x;
                    snk.data.directionVertical = 0;
                    snk.data.directionHorizontal = -1;  
                }
                return;
            };
            // up
            if(key == 38 || key == 87){
                if(snk.data.directionVertical !== 1 && snk.data.directionVertical !== -1){ 
                    snk.data.position.previous.y = snk.data.snakeParts[0].y;
                    snk.data.directionVertical = -1;
                    snk.data.directionHorizontal = 0;
                }
                return;
            };
            // right
            if(key == 39 || key == 68) {
                if(snk.data.directionHorizontal !== -1 && snk.data.directionHorizontal !== 1 ) { 
                    snk.data.position.previous.x = snk.data.snakeParts[0].x;
                    snk.data.directionVertical = 0;
                    snk.data.directionHorizontal = 1;           
                }
                return;
            };
            // down
            if(key == 40 || key == 83) {
                if(snk.data.directionVertical !== -1 && snk.data.directionVertical !== 1  ){ 
                    snk.data.position.previous.y = snk.data.snakeParts[0].y;
                    snk.data.directionVertical = 1;
                    snk.data.directionHorizontal = 0;
                }
                return;
            };

        
        } else {
            // TODO: add change direction with delay ?? HMM??

        };

         // for test 
        if(key == 107){
            snk.changeVelocity(0.1);
        } else if(key == 109) {
            snk.changeVelocity(-0.1);
        }

    },false);
    
    
    return snk;
})(_SNAKE || {});