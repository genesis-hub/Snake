var _SNAKE = (function(root, core ){
    'use strict';
  
    console.log("%cSNAKE GAME 🐍", "color: green; font-size: 30px;");
    console.dir(core);

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
        width: 20,
        height: 20,
        velocity: 1,                                                                                                       
        color: "#234564",
        borderColor: "#101010",
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
        score: null,
        slength: null,
        speeed: null,
    };

    
    (function createSnake (){
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
            // console.log(part.x);
            ctx.strokeRect(part.x, part.y, snakeDetails.width, snakeDetails.height);
        });

        console.table(snakeTab);
        return;
    })(); //TODO: add "start button" to call function
    
    console.log(core.data.gameStatus)
     /* For each part of snake call function "drawSnakeFromPart" */
    function initSnake(){
        var leng = snakeTab.length;
        var i = 0;
        // console.time(`Time`);
        
        // for(i; i < leng; i++){
        //     drawSnakeFromPart(snakeTab[i]);
        // }
        snakeTab.forEach(drawSnakeFromPart);
        // console.timeEnd(`Time`);
         window.requestAnimationFrame(initSnake);
        
    };
    

    /* Display snake from part in canvas */
    var drawSnakeFromPart = function(part) {
        // console.log(part)
        ctx.fillSyle = snakeDetails.color;
        ctx.strokeStyle = snakeDetails.borderColor;
        ctx.fillRect(part.x += (core.data.directionHorizontal), part.y += (core.data.directionVertical), snakeDetails.width, snakeDetails.height);
        ctx.strokeRect(part.x += (core.data.directionHorizontal), part.y += (core.data.directionVertical), snakeDetails.width, snakeDetails.height);

    };
    

    

    core.changeGameStatus = function (){
        window.requestAnimationFrame(initSnake);
    };
    return core;
})(this, _SNAKE || {});