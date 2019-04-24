/* Snake Core */
/* Copyright genesis-hub */
var _SNAKE = (function(root, core, Q ){
    'use strict';
  
    console.log("%cSNAKE GAME 🐍", "color: green; font-size: 30px;");
    console.dir(core);


    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    var cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;    

    // set interval
    var myAnimateReq;
    var myInerval,
        interval = 500;

    var getCenterPositions = {
        x: Math.round((window.innerWidth / 2) - 10), // -10 ? center of the square 
        y: Math.round((window.innerHeight / 2) - 10), // -10 ? center of the square 
    }; //TODO: add event when window change height or width and overwrite getCenterPositions;
        console.log(getCenterPositions);

    var canvasElem = Q('#gameCanvas')[0];

    var ctx = canvasElem.getContext('2d');
        canvasElem.width = window.innerWidth;
        canvasElem.height = window.innerHeight;

    var snakeDetails = {
        borderColor: "#101010",
        color: "#234564",
        width: 20,
        height: 20,
        velocity: 20,                                                                                                       
        score: null,
        slength: null,
        speeed: null,
    };

    var snakeTab = []; // hold snake parts
    var holdPrevPosition = [];
    // Snake data
    core.data = {
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

    core.targetDirection = holdPrevPosition;
    
    
    function createSnake (x){
        var len = x;
        for (let i = 0; i < len; i++) {
            snakeTab.push({
                x: getCenterPositions.x + (snakeDetails.width * i),
                y: getCenterPositions.y
            });
        };
        snakeTab.forEach(drawSnakeFromParts);
        core.updatePositions.previous();
        console.table(snakeTab);
        return;
    }; //TODO: add "start button" to call function
    
    console.log(core.data.gameStatus);
     /* For each part of snake call function "drawSnakeFromPart" */
    function initSnake(){
        if(core.data.gameStatus == true){
            snakeTab.forEach(drawSnakeFromParts);
            // changeCoordinatesOfParts(snakeTab);
            requestAnimationFrame(initSnake);
        }  
    };
     

    /* Display snake from part in canvas */
    function drawSnakeFromParts(part) {
        
        // ctx.fillRect(part.x += (core.data.direction.h * snakeDetails.velocity), part.y += (core.data.directions.v * snakeDetails.velocity), snakeDetails.width, snakeDetails.height);
        // ctx.strokeRect(part.x += (core.data.direction.h * snakeDetails.velocity), part.y += (core.data.directions.v * snakeDetails.velocity), snakeDetails.width, snakeDetails.height);
    
        ctx.fillStyle = snakeDetails.color;
        ctx.strokeStyle = snakeDetails.borderColor;
        ctx.fillRect(part.x, part.y, snakeDetails.width, snakeDetails.height);
        ctx.strokeRect(part.x, part.y, snakeDetails.width, snakeDetails.height);
       
    };

    // core.ad =  function(snakeTab){
    //     snakeTab.forEach(function(part){
    //         console.log('test');
    //     // ctx.fillRect(part.x += (core.data.direction.h * snakeDetails.velocity), part.y += (core.data.directions.v * snakeDetails.velocity), snakeDetails.width, snakeDetails.height);
    //     // ctx.strokeRect(part.x += (core.data.direction.h * snakeDetails.velocity), part.y += (core.data.directions.v * snakeDetails.velocity), snakeDetails.width, snakeDetails.height);
    
    //     ctx.fillStyle = snakeDetails.color;
    //     ctx.strokeStyle = snakeDetails.borderColor;
    //     ctx.fillRect(part.x, part.y, snakeDetails.width, snakeDetails.height);
    //     ctx.strokeRect(part.x, part.y, snakeDetails.width, snakeDetails.height);
       
    //     })
    
    // }

    function changeCoordinatesOfParts(){
        
        Q.copyDeep(snakeTab, holdPrevPosition);
        console.log("Prev po:" + holdPrevPosition[0].x);

        snakeTab[0].x += (core.data.directions.h  * snakeDetails.width);
        snakeTab[0].y += (core.data.directions.v  * snakeDetails.width);
        console.log("Prev po:" + holdPrevPosition[0].x);
        
        for(var i = 1; i < snakeTab.length; i++){
    
            snakeTab[i] = holdPrevPosition[i-1] ;
        }
    
        console.log("A P:" + snakeTab[0].x);

        clearSnakePart();
    };
  

    function clearSnakePart(){
      
        var len = snakeTab.length -1;
        var lastSnakePart = snakeTab[len];
        // console.log(lastSnakePart);
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        // console.dir( holdPrevPosition);
    };

   

    var drawDirectionChanges = function(){
        // assumptions:
        // 
    };

    
    // update positions
    core.updatePositions = {

        previous: function(){
            
            core.data.position.previous.x = snakeTab[0].x;
            core.data.position.previous.y = snakeTab[0].y;
        },
        current: function(){
            core.data.position.current.x = snakeTab[0].x;
            core.data.position.current.y = snakeTab[0].y;
        }
    };
    
    // change game status
    core.changeGameStatus = function (){
        if(core.data.gameStatus == false) {
            core.data.gameStatus = true;
            myAnimateReq = requestAnimationFrame(initSnake);
            myInerval = setInterval(changeCoordinatesOfParts, interval);
        } else {
            core.data.gameStatus = false;
            cancelAnimationFrame(myAnimateReq);
            clearInterval(myInerval);
            
        }
    };

    //check if you can change direction 
    core.directionChecker = function(up){
        var calc;
        if (up == "updata"){
            core.updatePositions.current();
        }   
         
       
        if (core.data.directions.h == -1 || core.data.directions.h  == 1) {
            calc = Math.abs(core.data.position.previous.x - core.data.position.current.x);
        } else {
            calc = Math.abs(core.data.position.previous.y - core.data.position.current.y)
        };
        return calc;
    };

    // change snake volecity
    core.changeVelocity = function(x){
        snakeDetails.velocity += x;
        
    };



    // invocation fun
    createSnake(5);

    return core;

})(this, _SNAKE || {}, _Cube);


 