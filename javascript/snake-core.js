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

    // get canvas element
    var canvasElem = document.getElementById("gameCanvas");
    // set canvas to '2D'
    var ctx = canvasElem.getContext('2d');
        //set cavas height and width
        canvasElem.width = 1000;
        canvasElem.height = 700;

    // snake details like color, width, height
    var snakeDetails = {
        borderColor: "#101010",
        color: "#234564",
        width: 30,
        height: 30,
        velocity: 0,
        score: null,
        length: 5,
        speeed: 0,
        spaceBetweenParts: 6,
    };

    var foodDetails = {
        width: 30,
        height: 30,
        color: 'crimson',
    }

    var canvasMap = {
        borderWidth: 5,
        borderColor: '#111111'
    }

    // get cavnas rows and columns
    var canvasRows = Math.floor((canvasElem.width )/ snakeDetails.width);
    var canvasCols = Math.floor((canvasElem.height ) / snakeDetails.height);

    var getCenterOfCanvas = {
        x: Math.floor(canvasRows / 2 ) * snakeDetails.width + snakeDetails.spaceBetweenParts,
        y: Math.floor(canvasCols / 2 ) * snakeDetails.height + snakeDetails.spaceBetweenParts,
    }; 

    var snakeTab = []; // hold snake parts
    var holdPrevPosition = []; // hold parts to draw
    var foodHolder = []; // food holder

    // all data / informations of the snake
    snake.data = {
        directions: {
            v: 0,
            h: -1,
        },
        gameStatus: false,
        position: {
            previous: {
                x: null,
                y: null
            },
            current: {
                x: null,
                y: null
            }
        },
        prevDirections: {
            
        },  
        snakeParts: snakeTab,
        // testing 
        differenceDirection: null,
    };

    snake.holdPrevPosition = holdPrevPosition; // for test

    // all snake functionalities
    var snakeFunctionalities = {

         /* For each part of snake call function "drawSnakeFromPart" */
        initSnake: function (){
            if(snake.data.gameStatus == true || snake.data.gameStatus == false){
                 if(snake.data.gameStatus == true){
               snakeFunctionalities.clearSnakePart();
                
            }
              
                snake.draw(holdPrevPosition,ctx, snakeDetails.width, snakeDetails.height, snakeDetails.color, snakeDetails.borderColor , snakeDetails.spaceBetweenParts);
               
                snake.drawFood(foodHolder, ctx,  foodDetails.width, foodDetails.height, foodDetails.color, snakeDetails.spaceBetweenParts);
                requestAnimationFrame(snakeFunctionalities.initSnake);
            }  
        },
    
        /* create snake in center of canvas */
        create: function(x){
            var len = x;
            for (let i = 0; i < len; i++) {
                snakeTab.push({
                    x: getCenterOfCanvas.x + (snakeDetails.width * i),
                    y: getCenterOfCanvas.y
                });
            };
            console.log(canvasElem.width % canvasRows /2);
            this.copyArrayD(snakeTab, holdPrevPosition);
            snake.drawMapBorder(ctx, canvasElem.width, canvasElem.height, canvasMap.borderColor, canvasMap.borderWidth)
            snake.updatePositions.previous();
            console.table(holdPrevPosition);
            snakeFunctionalities.createFood();
           
        }, //TODO: add "start button" to call function


        addPartToArray: function(){
            console.log('aa');
            snakeTab.push({x: foodHolder[0].x, y: foodHolder[0].y});
            this.copyArrayD(snakeTab, holdPrevPosition);
       },

        // 
        changeCoordinatesOfParts: function(){
            if(snakeTab[0].x !== (holdPrevPosition[0].x) || snakeTab[0].y !==  holdPrevPosition[0].y) {
            
                for(var i = 0; i < holdPrevPosition.length; i++){
                    var x = snakeTab[i].x - holdPrevPosition[i].x;
                    var y = snakeTab[i].y - holdPrevPosition[i].y;
                    
                    // console.log(x + '|' + y)
                    if(y == 0 ){ //x <= 20 && x !== 0 
                        holdPrevPosition[i].x += (x < 0) ? -snakeDetails.velocity : snakeDetails.velocity; 
                    }

                    if(x == 0){ //y <= 20 && y !== 0
                        holdPrevPosition[i].y += (y < 0) ? -snakeDetails.velocity : snakeDetails.velocity;
                    }   
                }  

            } else {

                var i = snakeTab.length-1;
                for(i; i > 0; i--){
                    snakeTab[i].x += ((snakeTab[i-1].x - snakeTab[i].x));
                    snakeTab[i].y += ((snakeTab[i-1].y - snakeTab[i].y));
                }
                
                snakeTab[0].x += (snake.data.directions.h  * snakeDetails.width );
                snakeTab[0].y += (snake.data.directions.v  * snakeDetails.height );
                snakeDetails.velocity = speedup;
                snakeFunctionalities.changeCoordinatesOfParts(); 
            }
            // check if snake eaten food
            if(snakeFunctionalities.eat(foodHolder)){
                snakeFunctionalities.addPartToArray();
                snakeFunctionalities.createFood();
            } 
            // clear cavas 
            // if(snake.data.gameStatus == true){
            //    snakeFunctionalities.clearSnakePart();
                
            // }
        },

        clearSnakePart: function(){
            
            ctx.clearRect(5, 5, canvasElem.width - 10, canvasElem.height - 10 );
        },

        copyArrayD: function(from, into){
            var i; into = into || {};
            for (i in from) {
                if(from.hasOwnProperty(i)){
                    if(typeof from[i] === 'object'){
                        into[i] = (toStr.call(from[i]) === astr) ? [] : {};
                        this.copyArrayD(from[i], into[i]);
                    } else {
                        into[i] = from[i];
                    }    
                }
            }
            return into;
        },

        createFood: function(){
            var foodX = (Math.floor((Math.random() * canvasRows )) * snakeDetails.width ) + (canvasElem.width % canvasRows / 2)  + (snakeDetails.spaceBetweenParts / 2);
            var foodY = (Math.floor((Math.random() * canvasCols )) * snakeDetails.height ) + (canvasElem.height % canvasCols / 2) + (snakeDetails.spaceBetweenParts / 2);
            // var foodX = Math.floor((Math.random() * (canvasCols - 1)) + 1) * snakeDetails.width ;
            // var foodY = Math.floor((Math.random() * (canvasRows -1)) + 1 ) * snakeDetails.height ;
            console.log(foodX);
            console.log(foodY);
            foodHolder = [];
            return  foodHolder.push({x: foodX, y: foodY });
           
        },
        
        eat: function(food){
            var dis = this.checkDist(food, holdPrevPosition);
            if(dis.x < 5 && dis.y < 5 ){
                return true;
            } else {
                return false;
            }
        },

        checkDist: function(arr, secArr){
            var dist = {
                x: Math.abs(arr[0].x - secArr[0].x),
                y: Math.abs(arr[0].y - secArr[0].y),
            }
            return dist;
        },
        
    };
    snake.testFood = function(){
        snakeFunctionalities.createFood();
         snake.drawFood(foodHolder, ctx,  foodDetails.width, foodDetails.height, foodDetails.color, snakeDetails.spaceBetweenParts);
               
    }
    
    // public snake functionalities
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
    snake.changeGameStatus = function (){
        if(snake.data.gameStatus == false) {
            snake.data.gameStatus = true;
            myAnimateReq = requestAnimationFrame(snakeFunctionalities.initSnake);
            myInerval = setInterval(snakeFunctionalities.changeCoordinatesOfParts, interval);
        } else {
            snake.data.gameStatus = false;
            cancelAnimationFrame(myAnimateReq);
            clearInterval(myInerval);
            
        }
    };

    //check if you can change direction 
    snake.directionChecker = function(up){
        var calc;
        if (up == "updata"){
            snake.updatePositions.current();
        }   
         
        if (snake.data.directions.h == -1 || snake.data.directions.h  == 1) {
            calc = Math.abs(snake.data.position.previous.x - snake.data.position.current.x);
        } else {
            calc = Math.abs(snake.data.position.previous.y - snake.data.position.current.y)
        };
        return calc;
    };

    // change snake volecity
    snake.changeVelocity = function(x){
        speedup += x;
        console.log(this);
        console.log(snakeDetails.velocity);
        console.log(speedup);
        //interval += x;
       // console.log(interval)
       
        
    };
    root.addEventListener('DOMContentLoaded', function(){
        snakeFunctionalities.create(snakeDetails.length);
    });
    

    return snake;
})(this, _Snake || {}); 
