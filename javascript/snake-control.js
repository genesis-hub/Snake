
var _Snake = (function(snk){
    "use strict";

    window.addEventListener('keydown', function(e){
       
        var key = e.keyCode;
        var calc;
        // console.log(key)
        
    
        if (key == 32 && snk.data.gameStatus == false) {
            console.log("%cGame Started", "color: blue; font-size: 15px");
            snk.UI.hideBg();
            snk.UI.hide();
            snk.changeGameStatus();
            return;

        } else if (key == 32 && snk.data.gameStatus == true) {
            console.log("%cGame Stopped", "color: crimson; font-size: 15px");
            // snk.UI.toggleUi();
            snk.changeGameStatus();
            return;
        };
       
        // check if you can change direction
        // snk.updatePositions.current();
        var calc = snk.directionChecker('updata');
        
        //  h -1 left
        //  v -1 up
        //  h 1 right 
        //  v 1 down


        // console.log(calc);
        if (calc >= 20 && snk.data.gameStatus == true) {
            // console.log(calc)
            snk.differenceDirection = calc;
            // left
            if(key == 37 || key == 65){
                if(snk.data.directions.h !== 1 && snk.data.directions.h !== -1){
                    // console.log('left') 
                    snk.data.position.previous.x = snk.data.snakeParts[0].x;
            
                    // snk.targetDirection.push(snk.data.position.previous);
                    snk.data.prevDirections.h = snk.data.directions.h;
                    snk.data.directions.v = 0;
                    snk.data.directions.h = -1;  
                   
                }
                return;
            };
            // up
            if(key == 38 || key == 87){
                if(snk.data.directions.v !== 1 && snk.data.directions.v !== -1){  
        
                    snk.updatePositions.previous();
                    // snk.targetDirection.push(snk.data.position.previous);
                    // console.log(snk.targetDirection);
                    snk.data.prevDirections.h = snk.data.directions.h;
                    // snk.data.position.previous.y = snk.data.snakeParts[0].y;
                    // snk.data.position.previous.x = snk.data.snakeParts[0].x;
                    // console.log('up')
                    snk.data.directions.v = -1;
                    snk.data.directions.h = 0;
                }
                return;
            };
            // right
            if(key == 39 || key == 68) {
                if(snk.data.directions.h !== -1 && snk.data.directions.h !== 1 ) { 
                    snk.data.position.previous.x = snk.data.snakeParts[0].x;
                    snk.data.directions.v = 0;
                    snk.data.directions.h = 1;           
                }
                return;
            };
            // down
            if(key == 40 || key == 83) {
                if(snk.data.directions.v !== -1 && snk.data.directions.v !== 1  ){ 
                    snk.data.position.previous.y = snk.data.snakeParts[0].y;
                    snk.data.directions.v = 1;
                    snk.data.directions.h = 0;
                }
                return;
            };

        
        } else {
            // TODO: add change direction with delay ?? HMM??

        };

         // for test 
        if(key == 107){
            snk.changeVelocity(1);
        } else if(key == 109) {
            snk.changeVelocity(-1);
        }

    },false);
    
    
    return snk;
})(_Snake || {});