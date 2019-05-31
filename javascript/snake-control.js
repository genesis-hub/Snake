/* eslint-disable no-undef */

var Snake = (function(snk){
    'use strict';
    
    snk.fn.control = function(e){
        // console.log(this);
        //  console.log(e.keyCode);
        var key = e.keyCode;
        var calc;
        if (key == 32  && this.data.gameStatus == false) {
            this.toggleGameStatus();
            return;
        } 
        if (key == 32 || key === 27 && this.data.gameStatus == true) {       // snk.UI.toggleUi();
            this.toggleGameStatus();
            return;
        }
       
        // check if you can change direction
        calc = this.directionChecker('update');
        
        //  h -1 left
        //  v -1 up
        //  h 1 right 
        //  v 1 down

        /* ------ SNAKE CONTROLLING ----- */
        if (calc >= 20 && this.data.gameStatus == true) {
            // left
            if(key == 37 || key == 65){
                if(this.data.directions.h !== 1 && this.data.directions.h !== -1){
                    this.data.position.previous.x = this.data.snakeArry.snakeParts[0].x;
                    this.data.directions.v = 0;
                    this.data.directions.h = -1;  
                }
                return;
            }
            // up
            if(key == 38 || key == 87){
                if(this.data.directions.v !== 1 && this.data.directions.v !== -1){  
                    this.data.position.previous.y = this.data.snakeArry.snakeParts[0].y;
                    this.data.directions.v = -1;
                    this.data.directions.h = 0;
                }
                return;
            }
            // right
            if(key == 39 || key == 68) {
                if(this.data.directions.h !== -1 && this.data.directions.h !== 1 ) { 
                    this.data.position.previous.x = this.data.snakeArry.snakeParts[0].x;
                    this.data.directions.v = 0;
                    this.data.directions.h = 1;           
                }
                return;
            }
            // down
            if(key == 40 || key == 83) {
                if(this.data.directions.v !== -1 && this.data.directions.v !== 1  ){ 
                    this.data.position.previous.y = this.data.snakeArry.snakeParts[0].y;
                    this.data.directions.v = 1;
                    this.data.directions.h = 0;
                }
                return;
            }

        } else {
            /* ------ MENU CONTROLLING ----- */

            if(key == 38){
                this.menuControl('up');
                return;
            }
            if(key == 40){
                this.menuControl('down');
                return;
            }

            if(key == 13){
                this.menuControl('enter');
                return;
            }

            if(key == 37){
                this.menuControl('left');
                return;
            }
            if(key == 39){
                this.menuControl('right');
                return;
            }

            if(key == 8 || key == 27){
                this.menuControl('back');
                return;
            }

        }



        

        // for test 
        if(key == 107){
            snk.changeVelocity(1);
        } else if(key == 109) {
            snk.changeVelocity(-1);
        }


    };

  
   
    return snk;
})(Snake || {});