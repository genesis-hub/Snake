/* Snake Core */
/* Copyright genesis-hub */

// drawing functions
var _Snake = (function (root, snake){
    'use strict';
    console.log(snake)
   
    var snakeDrawFunctions = {
        drawSnakeFromParts: function (part, ctx, width, height, color, bordColor, space) {
           
            // space = 1;
            for(var i= 0; i < snake.data.snakeParts.length-1; i++){ 
                ctx.fillStyle =  color;
                ctx.lineWidth = 1;
                //  ctx.strokeStyle = bordColor;
                ctx.fillRect(part[i].x, part[i].y, width - space, height - space);
                //  ctx.strokeRect(part[i].x  , part[i].y  , width - space, height - space)
                if(snake.data.gameStatus == true){
                    ctx.fillStyle = "crimson";
                    ctx.fillRect(part[0].x , part[0].y  , width - space  , height - space );
                    // ctx.strokeStyle = 'crimson';
                    //  ctx.strokeRect(part[0].x , part[0].y  , width - space  , height - space );
                } 
            }   

            for(var i = 0; i < part.length ; i++){
                if( i > 1 && snake.data.snakeParts[i-2].x !== snake.data.snakeParts[i].x && snake.data.snakeParts[i-2].y !== snake.data.snakeParts[i].y){ 
                    ctx.fillStyle = color;
                    ctx.fillRect(snake.data.snakeParts[i-1].x, snake.data.snakeParts[i-1].y, width - space, height - space);
                    //  ctx.strokeRect(snake.data.snakeParts[i-1].x , snake.data.snakeParts[i-1].y , width - space , height - space );
                }
            } 
        
        },

        drawFood: function(part, ctx, width, height, color, borderColor,space ){
            ctx.fillStyle = color;
            // ctx.strokeStyle = bordColor;
            ctx.lineWidth = 1;
            ctx.fillRect(part[0].x , part[0].y , width - space  , height - space );
            // ctx.fillRect(part[0].x, part[0].y, 30, 30);
            ctx.strokeStyle = borderColor;
            ctx.strokeRect(part[0].x, part[0].y, width -  space, height - space);
        },

        drawMapBorder: function(ctx, width, height, borderColor, borderWidth){
        
            // ctx.fillStyle = color;
            ctx.lineWidth = borderWidth;
            ctx.strokeStyle = borderColor;
            
            ctx.beginPath();
            ctx.setLineDash([0,0]);
            ctx.strokeRect(0, 0, width   , height );
        },

        drawStats: function(ctx, score, difficulty, consumed, combo, time, combotime){
            // var opacity = 0.9;
             combo = combo.toString();
            //  console.log(combo.length)
            ctx.fillStyle = '#fff';
            ctx.font = "2rem Monospace";
            ctx.fillText("Consumed: " + consumed ,20, 22);
            ctx.fillText("Score: " + score, 230, 22);
            ctx.fillText("Combo: x" + combo, 390, 22);
            if(combo > 0){
                ctx.fillText("["+ combotime +"]", 465 + (combo.length * 10), 22);
            }
            ctx.fillText("Time: " + time, 595, 22);
            ctx.fillText("Difficulty: " + difficulty, 820, 22);

            ctx.strokeStyle = '#cfcfcf';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.setLineDash([7, 5]);
            ctx.moveTo(18, 33);
            ctx.lineTo(990, 33);
            ctx.stroke();
            
        }

        // drawBonusItmes: function(part, ctx, width, height, color, bordColor, space){

        // }




        /* ---- for later purpose---- */
    //     drawTurn: function(i, ctx, width, height, color, bordColor){
    //         ctx.fillStyle = color;
    //         ctx.strokeStyle = bordColor;
    //         // console.log(width)
        
    //         if(i >2){
    //             ctx.fillStyle = color;
    //             ctx.fillStyle = "black";
    //             ctx.fillRect(snake.data.snakeParts[i].x +2 , snake.data.snakeParts[i].y +2, width -10 , height-10 );
    //             ctx.fillRect(snake.data.snakeParts[i-2].x +2 , snake.data.snakeParts[i-2].y +2, width -10 , height-10 );
    //             ctx.fillRect(snake.data.snakeParts[i-1].x +24, snake.data.snakeParts[i-1].y -5, 5, 5 );
                
    //             ctx.fillStyle = "red";
    //             ctx.strokeStyle = 'red';
    //             ctx.beginPath();
    //             ctx.moveTo(snake.data.snakeParts[i-2].x +22, snake.data.snakeParts[i-2].y +2);
    //             ctx.quadraticCurveTo(snake.data.snakeParts[i-1].x +24, snake.data.snakeParts[i-1].y -5, snake.data.snakeParts[i].x +20, snake.data.snakeParts[i].y +2);

    //             ctx.lineTo(snake.data.snakeParts[i-1].x +2 , snake.data.snakeParts[i-1].y +2);
    //             // ctx.fill();
    //             // ctx.moveTo(10,80);
    //             // ctx.bezierCurveTo(30,130,120,130,140,80);
    //             // ctx.stroke();

    //             ctx.beginPath();
    //             ctx.moveTo(snake.data.snakeParts[i-2].x +2, snake.data.snakeParts[i-2].y +20);
    //             ctx.lineTo(snake.data.snakeParts[i].x +2, snake.data.snakeParts[i].y +20);
    //             // ctx.stroke();
    //         }
    //         ctx.fillStyle = color;
    //         ctx.fillRect(snake.data.snakeParts[i-1].x +2 , snake.data.snakeParts[i-1].y +2, width -10 , height-10 );
    //         var prev_x = snake.data.snakeParts[i-1].x - snake.data.snakeParts[i].x;
    //         var prev_y = snake.data.snakeParts[i-1].y - snake.data.snakeParts[i].y;
    //         var x = snake.data.snakeParts[i-1].x - snake.data.snakeParts[i-2].x; 
    //         var y = snake.data.snakeParts[i-1].y - snake.data.snakeParts[i-2].y;
        
        
    //         // current || previous
    //         if(prev_x < 0 && y > 0){ 
    //             // up & left
    //             ctx.fillRect(snake.data.snakeParts[i-1].x +25  , snake.data.snakeParts[i-1].y -8, 5, 5);
    //         } else if(prev_x > 0 && y < 0){ 
    //             // down & right
    //             ctx.fillRect(snake.data.snakeParts[i-1].x -8 , snake.data.snakeParts[i-1].y +12, 5, 5);
    //         } else if(prev_x < 0 && y < 0){ 
    //             // down & left
    //             ctx.fillRect(snake.data.snakeParts[i-1].x +12 , snake.data.snakeParts[i-1].y +12, 30, 5);
    //         } else if (prev_x >0 && y >0){ 
    //             // up & right
    //             ctx.fillRect(snake.data.snakeParts[i-1].x -8 , snake.data.snakeParts[i-1].y -8, 5, 5);
    //         } else if( prev_y < 0 && x > 0){ 
    //             // left & up
    //             ctx.fillRect(snake.data.snakeParts[i-1].x -8 , snake.data.snakeParts[i-1].y +12, 5, 5);
    //         } else if(prev_y >0 && x < 0){ 
    //             // right & down
    //             ctx.fillRect(snake.data.snakeParts[i-1].x +12 , snake.data.snakeParts[i-1].y -8, 5, 5);  
    //         } else if(prev_y < 0 && x < 0){ 
    //             // right & up
    //             ctx.fillRect(snake.data.snakeParts[i-1].x +12 , snake.data.snakeParts[i-1].y +12, 5, 5);
    //         } else if(prev_y > 0 && x > 0){ 
    //             // left & down'
    //             ctx.fillRect(snake.data.snakeParts[i-1].x -8 , snake.data.snakeParts[i-1].y -8, 5, 5);
    //         }
    //     }
    };

    // public method
    snake.draw = snakeDrawFunctions.drawSnakeFromParts;
    snake.drawFood = snakeDrawFunctions.drawFood;
    snake.drawMapBorder = snakeDrawFunctions.drawMapBorder;
    snake.drawStats = snakeDrawFunctions.drawStats;
    return snake;
})(this, _Snake || {}); 