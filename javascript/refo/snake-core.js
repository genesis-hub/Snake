var _SNAKE = (function(root, core ){
    'use strict';
  
    console.log("%cSNAKE GAME 🐍", "color: green; font-size: 30px;");
    console.dir(core);


    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    var cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;    

    var myAnimateReq;

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
        velocity: 1,                                                                                                       
        score: null,
        slength: null,
        speeed: null,
    };

    var snakeTab = []; // hold snake parts

    // Snake data
    core.data = {
        currentDirection: 'left',
        directionVertical: 0,
        directionHorizontal: -snakeDetails.velocity,
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
        snakeParts: snakeTab,
       
    };

    
    function createSnake (){
        var len = 5;
        for (let i = 0; i < len; i++) {
            snakeTab.push({
                x: getCenterPositions.x + (snakeDetails.width * i),
                y: getCenterPositions.y
            });
        };
        snakeTab.forEach(function (part) { // TODO: do zmiany
            ctx.fillStyle = snakeDetails.color;
            ctx.strokeStyle = snakeDetails.borderColor;
            ctx.fillRect(part.x, part.y, snakeDetails.width, snakeDetails.height);
            ctx.strokeRect(part.x, part.y, snakeDetails.width, snakeDetails.height);
        });
        core.updatePositions.previous();
        console.table(snakeTab);
        return;
    }; //TODO: add "start button" to call function
    
    console.log(core.data.gameStatus);
     /* For each part of snake call function "drawSnakeFromPart" */
    function initSnake(){
        if(core.data.gameStatus == true){
            snakeTab.forEach(drawSnakeFromPart);
            requestAnimationFrame(initSnake);
        }  
    };
    

    /* Display snake from part in canvas */
    var drawSnakeFromPart = function(part) {
        // console.log(part)
        ctx.fillSyle = snakeDetails.color;
        ctx.strokeStyle = snakeDetails.borderColor;
        ctx.fillRect(part.x += (core.data.directionHorizontal * snakeDetails.velocity), part.y += (core.data.directionVertical * snakeDetails.velocity), snakeDetails.width, snakeDetails.height);
        ctx.strokeRect(part.x += (core.data.directionHorizontal * snakeDetails.velocity), part.y += (core.data.directionVertical * snakeDetails.velocity), snakeDetails.width, snakeDetails.height);

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
        } else {
            core.data.gameStatus = false;
            cancelAnimationFrame(myAnimateReq);
            
        }
    };

    //check if you can change direction 
    core.directionChecker = function(calc){
        
        if (core.data.currentDirection == 'left' || core.data.currentDirection == 'right') {
            calc = Math.abs(core.data.position.previous.x - core.data.position.current.x);
        } else {
            calc = Math.abs(core.data.position.previous.y - core.data.position.current.y)
        };
        return calc;
    };

    core.updateDirection = function(x, y){
        core.data.directionVertical = y;
        core.data.directionHorizontal = -x;
    }

    createSnake();

    return core;

})(this, _SNAKE || {});