/* Snake Core */
/* Copyright genesis-hub */

var _Snake = (function (root, snake){

    'use strict';
    console.log("%cSNAKE GAME 🐍", "color: green; font-size: 30px;");

    // add browser support
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    var cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;  

    var toStr = Object.prototype.toString, // used for shorthand
        astr = "[object Array]";// used to comparison
  
    var speedup = 2;
    // set interval
    var myAnimateReq;

    var myInerval,
        interval = 10;
    var timeSpentInterval;

    // for set combo countdown method
    var comboTimeInterval;

    // get canvas element
    var canvasElem = document.getElementById("game_canvas");
    // set canvas to '2D'
    var ctx = canvasElem.getContext('2d');
        //set cavas height and width
        canvasElem.width = 1000;
        canvasElem.height = 700;

    // object for hold the time spent in game 
    var timeSpent = {
        h: 0,
        m: 0,
        s: 0,
    };
 
    // snake details like color, width, height
    var snakeDetails = {
        borderColor: "#1d1d1d",
        color: "#dedddd", //#dedddd
        width: 30,
        height: 30,
        velocity: 2,
        score: 0,
        length: 5+1, // add 1 for property display
        spaceBetweenParts: 6,
        snakeLife: 1,
    };

    var gameStarted = false;
    var gameCountDownToStart = 3;
    var gameCountDownInterval;

    // game statistics to display
    var gameStats = {
        consumed: 0,
        score: 0,
        difficultyLevel: 'Normal',
        time: '00:00:00',
        combo: 0,
        comboTime: 5,
        opacity: 1
    }

    // food color, width, height etc
    var foodDetails = {
        width: 30,
        height: 30,
        color: 'crimson',
        borderColor:'#101010',
        // blinkTime: 5,
    };

  

    // variable for combo time countdown
    var comboTime = gameStats.comboTime;

    // map details
    var canvasMap = {
        borderWidth: 5,
        borderColor: '#cfcfcf'
    }

    // get cavnas rows and columns
    var canvasRows = Math.floor((canvasElem.width ) / snakeDetails.width);
    var canvasCols = Math.floor((canvasElem.height ) / snakeDetails.height);

    // number to determine how much to move points to be aligned
    // TODO: add if modulo = 0, ??? hmmm
    var numbersToMovePoints = {
        x: (canvasElem.width % canvasRows / 2)  + (snakeDetails.spaceBetweenParts / 2),
        y: (canvasElem.height % canvasCols / 2) + (snakeDetails.spaceBetweenParts / 2)
    }

    // get the center of canvas 
    var getCenterOfCanvas = {
        x: Math.floor(canvasRows / 2 ) * snakeDetails.width + numbersToMovePoints.x,
        y: Math.floor(canvasCols / 2 ) * snakeDetails.height +  numbersToMovePoints.y,
    }; 

    var uiProperties = {
        menu: {
            show: true,
            index: 0,
            width: 300,
            height: 400,
            color: '#1d1d1d', //#212121
            coordinates: {
                x: getCenterOfCanvas.x - 300 / 2,
                y: getCenterOfCanvas.y - 300 / 2
            },
            list: ['New Game', 'Continue', 'History', 'Options', 'Leaderboards'],
            margin: 50,
            align: 'center',
        }
    }

    snake.changeMenuIndex = function(e){

        if(e > 0 && uiProperties.menu.index < 4 ){
            uiProperties.menu.index += e;
        } else if( e < 0 && uiProperties.menu.index > 0) {
            uiProperties.menu.index += e;
        }
        console.log(uiProperties.menu.index)
       
    }
   

    var snakeTab = []; // hold snake parts
    var holdPrevPosition = []; // hold parts to draw
    var foodHolder = []; // food holder

    // all current data / informations of the snake
    snake.data = {
        directions: {
            v: 0,
            h: -1,
        },
        gameStatus: false,
        position: {
            previous: {
                x: 0,
                y: 0
            },
            current: {
                x: 0,
                y: 0
            }
        },
        snakeParts: snakeTab,
    };

    var newGame = function(){
        return new GameSnake();
    }


    var GameSnake = function(){
        this.create = function(){

        }
    }

   
    // var x = function(){
    //     return new GameEngine;
    // }

    // var GameEngine = function(){
        
    // }

    // GameEngine.prototype = {
    //     aaa: function(){}
    // };

    // snake.OP = GameEngine;
    // all snake functionalities
    var snakeFunctionalities = {
         /* For each part of snake call function "drawSnakeFromPart" */
        initSnake: function (){
            if(snake.data.gameStatus == true || snake.data.gameStatus == false ){ // safety
                snakeFunctionalities.clearCanvas(); 
                if(snake.data.gameStatus == true){
                    snake.draw.food(foodHolder, ctx,  foodDetails.width, foodDetails.height, foodDetails.color, foodDetails.borderColor, snakeDetails.spaceBetweenParts);
                }
                if(gameStarted == false && snake.data.gameStatus == true){
                    snake.draw.countToStart(ctx, gameCountDownToStart, getCenterOfCanvas);
                } 
                if(snake.data.gameStatus == false && gameStarted == false && snakeDetails.snakeLife == 1 ){
                    snake.draw.countToStart(ctx, 'PAUSE', getCenterOfCanvas);
                } else if(snakeDetails.snakeLife == 0 ) {
                    snake.draw.countToStart(ctx, 'GAME OVER!', getCenterOfCanvas);
                }

              


                snake.draw.snakeFromParts(holdPrevPosition,ctx, snakeDetails.width, snakeDetails.height, snakeDetails.color, snakeDetails.borderColor , snakeDetails.spaceBetweenParts, snakeDetails.snakeLife);
                snake.draw.stats(ctx, snakeDetails.score, gameStats.difficultyLevel, gameStats.consumed, gameStats.combo, gameStats.time, comboTime);
                snake.draw.mapBorder(ctx, canvasElem.width, canvasElem.height, canvasMap.borderColor, canvasMap.borderWidth);
                  if(gameStarted == false){
                    snake.draw.menu(ctx, getCenterOfCanvas, uiProperties.menu);
                }
                requestAnimationFrame(snakeFunctionalities.initSnake);
            }
        },
    
        /* create snake in center of canvas */
        create: function(x){
          
            var len = x;
            // snakeTab.length = 0;
            for (let i = 0; i < len; i++) {
                snakeTab.push({
                    x: getCenterOfCanvas.x + (snakeDetails.width * i) - (Math.floor((len-1)/2) * snakeDetails.width),
                    y: getCenterOfCanvas.y + snakeDetails.height,
                });
            };
            // do deep copy of snakeTab
            this.copyArrayD(snakeTab, holdPrevPosition);

            // do necessary methods
            snake.updatePositions.previous();
            snakeFunctionalities.createFood();
           
        },


        addPartToArray: function(){
            snakeTab.push({x: snakeTab[snakeTab.length-2].x , y: snakeTab[snakeTab.length-2].y});
            holdPrevPosition.push({x: holdPrevPosition[holdPrevPosition.length-2].x, y: holdPrevPosition[holdPrevPosition.length-2].y })
       },

        // method for smooth draw snake
        changeCoordinatesOfParts: function(){
            if(gameStarted == true){
                if(snakeTab[0].x !== (holdPrevPosition[0].x) || snakeTab[0].y !==  holdPrevPosition[0].y) {
                    for(var i = 0; i < holdPrevPosition.length; i++){
                        var x = snakeTab[i].x - holdPrevPosition[i].x;
                        var y = snakeTab[i].y - holdPrevPosition[i].y;
                        
                        if(y == 0 ){ //x <= 20 && x !== 0 
                            holdPrevPosition[i].x += (x < 0) ? -snakeDetails.velocity : snakeDetails.velocity; 
                        };

                        if(x == 0){ //y <= 20 && y !== 0
                            holdPrevPosition[i].y += (y < 0) ? -snakeDetails.velocity : snakeDetails.velocity;
                        };

                        //check if snake eaten food
                        if(snakeFunctionalities.eat(foodHolder)){
                            snakeFunctionalities.addPartToArray();
                            snakeFunctionalities.createFood();
                            snakeFunctionalities.score();
                        };
                    };
                    
                } else {

                    var i = snakeTab.length-1;
                    for(i; i > 0; i--){
                        snakeTab[i].x += ((snakeTab[i-1].x - snakeTab[i].x));
                        snakeTab[i].y += ((snakeTab[i-1].y - snakeTab[i].y));
                    };
                    
                    snakeTab[0].x += (snake.data.directions.h  * snakeDetails.width );
                    snakeTab[0].y += (snake.data.directions.v  * snakeDetails.height );
                    if(snakeDetails.velocity < speedup){
                        snakeDetails.velocity = speedup;
                    };
                    
                    snakeFunctionalities.changeCoordinatesOfParts(); 
                };

                // check if the snake ate himself or hit the map border
                if(snake.data.gameStatus == true){
                    snakeFunctionalities.checkIfSnakeDead();
                } 
            }

        },

        // clear cabvas
        clearCanvas: function(){
            ctx.clearRect(3, 3, canvasElem.width - 5, canvasElem.height - 5 );
        },

        // deep copy, used to copy array to draw
        copyArrayD: function(from, into){
            var i; into = into || {};
            for (i in from) {
                if(from.hasOwnProperty(i)){
                    if(typeof from[i] === 'object'){
                        into[i] = (toStr.call(from[i]) === astr) ? [] : {};
                        this.copyArrayD(from[i], into[i]);
                    } else {
                        into[i] = from[i];
                    }; 
                };
            };
            return into;
        },

        // creating food for snake 
        createFood: function(){
            console.log('food')
            var food = snakeFunctionalities.randomCoordinates();
            comboTime = gameStats.comboTime;
            foodHolder = []; 
            return foodHolder.push(food);
        },

        // method to check if snake eaten the food
        eat: function(food){
            var dis = this.checkDist(food, holdPrevPosition);
            if(dis.x < 25 && dis.y < 25 || dis.x == 0 &&  dis.y == 0){

                clearInterval(comboTimeInterval);
                comboTimeInterval = setInterval(snakeFunctionalities.timerCountdown, 1000);
                return true;
            } else {
                return false;
            };
            
        },

        // check distance between snake and food
        checkDist: function(arr, secArr){
            var dist = {
                x: Math.abs(arr[0].x - secArr[0].x),
                y: Math.abs(arr[0].y - secArr[0].y),
            };
            return dist;
        },

        // check if snake ate himself or hits the map border 
        checkIfSnakeDead: function(){
        
            var len = holdPrevPosition.length - 2;
            // himself
            for(len; len > 1; len--){ //i; i < len; i++
                var x = Math.abs(holdPrevPosition[0].x - holdPrevPosition[len].x);
                var y = Math.abs(holdPrevPosition[0].y - holdPrevPosition[len].y);

                if( x < 15 && y < 15 ){;
                    snakeFunctionalities.gameStop();
                    this.clearCanvas();
                    // snake.draw(holdPrevPosition,ctx, snakeDetails.width, snakeDetails.height, "black" ,snakeDetails.borderColor , snakeDetails.spaceBetweenParts);
                    snake.draw.stats(ctx, snakeDetails.score, gameStats.difficultyLevel, gameStats.consumed, gameStats.combo, gameStats.time, comboTime);
                    snakeDetails.snakeLife = 0;
                };

            };
            // map
            if(snakeTab[0].x < 8 || snakeTab[0].y > 668 || snakeTab[0].x > 968  || snakeTab[0].y < 33){
                 snakeFunctionalities.gameStop();
                this.clearCanvas();
                // snake.draw(holdPrevPosition,ctx, snakeDetails.width, snakeDetails.height, "black" ,snakeDetails.borderColor , snakeDetails.spaceBetweenParts);
                snake.draw.stats(ctx, snakeDetails.score, gameStats.difficultyLevel, gameStats.consumed, gameStats.combo, gameStats.time, comboTime);
                snakeDetails.snakeLife = 0;
            };
        },
        
        // create random coordinates for the food or others items which will be draw in canvas
        randomCoordinates: function(){
            var coordinates = {
                x: (Math.floor((Math.random() * canvasRows)) * snakeDetails.width ) + numbersToMovePoints.x,
                y: (Math.floor((Math.random() * (canvasCols - 1) + 1) )* snakeDetails.height ) + numbersToMovePoints.y
            };
            var len = snakeTab.length-1;
            // checks if the created coordinates already exist
            for(len; len >= 0; len--){
                if(coordinates.x == snakeTab[len].x && coordinates.y == snakeTab[len].y){
                    return this.randomCoordinates();
                } ;
                if(foodHolder.length > 0){
                    if (coordinates.x == foodHolder[0].x && coordinates.y == foodHolder[0].y){
                        return this.randomCoordinates();
                    };
                };
            };

            return coordinates;
        },

        // counting 'score' 
        score: function(){
            gameStats.consumed+=1;
            snakeDetails.score = snakeDetails.score + (5 * ((gameStats.combo == 0 )? 1 : gameStats.combo)) ;
            gameStats.combo += 2;
        },

        timerCountdown: function(){
            // console.log('d')
            if(snake.data.gameStatus == true, gameStarted == true){
                if(comboTime > 1){
                    comboTime -= 1;
                } else {
                    clearInterval(comboTimeInterval);
                    gameStats.combo = 0;
                    comboTime = gameStats.comboTime;
 
                };
            };
        },

        // method which count spent time
        timeSpent: function(){
            
            if(snake.data.gameStatus == true && gameStarted == true){
                var setTwoDigits = function (number){
                    return (number < 10 ? '0' : '') + number;
                };

                if(timeSpent.s < 59){
                    timeSpent.s += 1;
                } else {
                    timeSpent.m += 1;
                    timeSpent.s = 0;
                };
                
                if(timeSpent.m == 60){
                    timeSpent.m = 0;
                    timeSpent.h +=1;
                };

                if(timeSpent.h == 24){
                    return gameStats.time = 'ERROR :)';
                };
                return gameStats.time = setTwoDigits(timeSpent.h) + ':' + setTwoDigits(timeSpent.m) + ':' + setTwoDigits(timeSpent.s);
            };

        },

        gameStart: function(){
            console.log("%cGame Started", "color: blue; font-size: 15px");
            snake.data.gameStatus = true;
            gameStarted = false;
            myInerval = setInterval(snakeFunctionalities.changeCoordinatesOfParts, interval);
            gameCountDownInterval = setInterval(snakeFunctionalities.gameCountToStart, 1000);
            comboTimeInterval = setInterval(snakeFunctionalities.timerCountdown, 1000);
            if(timeSpentInterval == undefined){
                timeSpentInterval = setInterval(function(){
                    snakeFunctionalities.timeSpent();
                    // snakeFunctionalities.timeFood();
                }, 1000); // interval ony for 1 sec delay
            }
        }, 

        gameStop: function(){
            console.log("%cGame Stopped", "color: crimson; font-size: 15px");
            snake.data.gameStatus = false;
            gameCountDownToStart = 3;
            gameStarted = false;
            clearInterval(gameCountDownInterval);
            
            clearInterval(myInerval);
            clearInterval(comboTimeInterval);
            // cancelAnimationFrame(myAnimateReq);
        },

        gameCountToStart: function(){
             if(gameStarted == false){
                console.log(gameCountDownToStart);
                if(gameCountDownToStart > 0){
                     gameCountDownToStart += -1;
                } else {
                    clearInterval(gameCountDownInterval);
                    gameStarted = true;
                    snake.data.gameStatus = true;
                    gameCountDownToStart = 3;
                }
            }    
        },

        newGame: function(){
            cancelAnimationFrame(myAnimateReq);
            timeSpent.h = 0;
            timeSpent.m = 0;
            timeSpent.s = 0;
            
            snakeDetails.snakeLife = 1;
            // snakeTab = []; // hold snake parts
            // holdPrevPosition = []; // hold parts to draw
            // foodHolder = []; // food holder
           
            // snakeFunctionalities.create(6);
            // var gameCountDownToStart = 3;
         

          
            gameStats.consumed = 0;
           
            gameStats.score = 0;
            gameStats.difficultyLevel = 'Normal';
            gameStats.time = '00:00:00';
            gameStats.combo = 0;
            // gameStats.comboTime: 5,
         
        },

        // addBonusItems: function(item){
        //     if(item == 'speedUp'){
        //         snake.drawBonusItmes(ctx,)
        //     }
        // }
        
    };

    
  
    // test function
    snake.testFood = function(){
        snakeFunctionalities.createFood();
         snake.draw.food(foodHolder, ctx,  foodDetails.width, foodDetails.height, foodDetails.color, snakeDetails.spaceBetweenParts);
               
    }
    


     GameSnake.prototype = snakeFunctionalities;

    snake.op = GameSnake;
    /* ---- public snake functionalities ----- */
    // update snake positions prev and current
    snake.updatePositions = {
        previous: function(){
            snake.data.position.previous.x = snakeTab[0].x;
            snake.data.position.previous.y = snakeTab[0].y;
        },
        current: function(){
            snake.data.position.current.x = snakeTab[0].x;
            snake.data.position.current.y = snakeTab[0].y;
        }
    };
    
    // change game status
    snake.toggleGameStatus = function (){
        if(snake.data.gameStatus == false && snakeDetails.snakeLife == 1) {
            myAnimateReq = requestAnimationFrame(snakeFunctionalities.initSnake);
            // comboTimeInterval = setInterval(snakeFunctionalities.timerCountdown, 1000);
            snakeFunctionalities.gameStart();

            // setTimeout(function() {
            //     console.log("%cGame Started", "color: blue; font-size: 15px");
            //     snake.data.gameStatus = true;
               
            //     myInerval = setInterval(snakeFunctionalities.changeCoordinatesOfParts, interval);
            //     comboTimeInterval = setInterval(snakeFunctionalities.comboTime, 1000);
            //     if(timeSpentInterval == undefined){
            //         timeSpentInterval = setInterval(function(){
            //             snakeFunctionalities.timeSpent();
            //             // snakeFunctionalities.timeFood();
            //         }, 1000); // interval ony for 1 sec delay
            //     }
            // }, 1000);
            
                
           
        } else {
                if(snakeDetails.snakeLife == 0){
                    console.log('a')
                    snakeFunctionalities.newGame();
                    snakeFunctionalities.gameStart();
                }
            // gameCountDownToStart = 3;
            // clearInterval(comboTimeInterval);
            // gameStarted = false;
            snakeFunctionalities.gameStop();
            // cancelAnimationFrame(myAnimateReq);
             
            // console.log("%cGame Stopped", "color: crimson; font-size: 15px");
            // snake.data.gameStatus = false;
            // cancelAnimationFrame(myAnimateReq);
            // clearInterval(myInerval);                
            // clearInterval(comboTimeInterval);
            // clearInterval(foodCreateInterval);
            
        }
    };

    //check if you can change direction 
    snake.directionChecker = function(up){
        var calc;
        if (up == "update"){
            snake.updatePositions.current();
        }   
        if (snake.data.directions.h == -1 || snake.data.directions.h  == 1) {
            calc = Math.abs(snake.data.position.previous.x - snake.data.position.current.x);
        } else {
            calc = Math.abs(snake.data.position.previous.y - snake.data.position.current.y)
        };
        return calc;
    };

    // change snake volecity for test for now
    snake.changeVelocity = function(x){
        speedup += x;
        console.log(this);
        console.log(snakeDetails.velocity);
        console.log(speedup);
        //interval += x;
       // console.log(interval)
       
        
    };

    // test 
    snake.gameStart = function(){
        // console.log(myAnimateReq)
        myAnimateReq = requestAnimationFrame(snakeFunctionalities.initSnake);

    }

    snake.gameStop = function(){
        
    }

    snake.gameCancel= function() {
        cancelAnimationFrame(myAnimateReq);
        snakeFunctionalities.clearCanvas();
        console.log(myAnimateReq);
    }

    snake.cl = snakeFunctionalities.clearCanvas;


     snakeFunctionalities.create(snakeDetails.length);
    // create snake when DOM is ready
    root.addEventListener('DOMContentLoaded', function(){
        // snakeFunctionalities.create(snakeDetails.length);
        snake.gameStart()
    });
    
    // snake.returnValue = function (e){
    //     if(e == 'uiProperties.menu.index'){
    //         return uiProperties.menu.index;
    //     }
    //     // console.log(x)
    //     return x;
    // }
    return snake;
})(this, _Snake || {}); 
