/* Snake Core */
/* Copyright genesis-hub */

// drawing functions
var Snake = (function (root, snk){
    'use strict';
    // console.log(snake);
    // snk.draw = snk.draw || {};
     
    snk.fn.drawSnakeFromParts = function () {
      
        if(this.data.changes.gameStage === 'started' || this.data.changes.gameStage === 'count'){

            for(var i = 0; i < this.data.snakeArry.snakeParts.length-1; i++){ 
                if(this.stats.snakeLife != 1){
                    this.ctx.fillStyle = this.cfg.snakeDetails.deathColor;
                } else {
                    this.ctx.fillStyle =  this.cfg.snakeDetails.color;
                }
            
                this.ctx.lineWidth = 1;
                //  this.ctx.strokeStyle = bordColor;
                this.ctx.fillRect(this.data.snakeArry.holdPartsDraw[i].x, this.data.snakeArry.holdPartsDraw[i].y, this.cfg.snakeDetails.width - this.cfg.snakeDetails.spaceBetweenParts, this.cfg.snakeDetails.height - this.cfg.snakeDetails.spaceBetweenParts);
                //  this.ctx.strokeRect(this.data.snakeArry.holdPartsDraw[i].x  , this.data.snakeArry.holdPartsDraw[i].y  , width - space, height - space)
                if(this.stats.snakeLife == 1 ){
                    this.ctx.fillStyle = 'crimson';
                    this.ctx.fillRect(this.data.snakeArry.holdPartsDraw[0].x , this.data.snakeArry.holdPartsDraw[0].y  , this.cfg.snakeDetails.width - this.cfg.snakeDetails.spaceBetweenParts, this.cfg.snakeDetails.height - this.cfg.snakeDetails.spaceBetweenParts );
                    // this.ctx.strokeStyle = 'crimson';
                    //  this.ctx.strokeRect(part[0].x , part[0].y  , width - space  , height - space );
                } 
            }   

            for(var j = 0; j < this.data.snakeArry.holdPartsDraw.length ; j++){
                if( j > 1 && this.data.snakeArry.snakeParts[j-2].x !== this.data.snakeArry.snakeParts[j].x && this.data.snakeArry.snakeParts[j-2].y !== this.data.snakeArry.snakeParts[j].y){ 
                    // this.ctx.fillStyle = this.cfg.snakeDetails.color;
                    if(this.stats.snakeLife != 1){
                        this.ctx.fillStyle = this.cfg.snakeDetails.deathColor;
                    } else {
                        this.ctx.fillStyle =  this.cfg.snakeDetails.color;
                    }
            
                    this.ctx.fillRect(this.data.snakeArry.snakeParts[j-1].x, this.data.snakeArry.snakeParts[j-1].y, this.cfg.snakeDetails.width - this.cfg.snakeDetails.spaceBetweenParts, this.cfg.snakeDetails.height - this.cfg.snakeDetails.spaceBetweenParts);
                    //  this.ctx.fillRect(snake.data.snakeParts[part.length-2].x, snake.data.snakeParts[part.length-2].y, width - space, height - space);
                    //  this.ctx.strokeRect(snake.data.snakeParts[i-1].x , snake.data.snakeParts[i-1].y , width - space , height - space );
                }
            } 
        }
        
    };

    snk.fn.drawFood = function(){
        this.ctx.fillStyle = this.cfg.snakeFood.color;
        // this.ctx.strokeStyle = bordColor;
        this.ctx.lineWidth = 1;
        this.ctx.fillRect(this.data.snakeArry.foodCoordi[0].x , this.data.snakeArry.foodCoordi[0].y , this.cfg.snakeFood.width - this.cfg.snakeDetails.spaceBetweenParts, this.cfg.snakeFood.height - this.cfg.snakeDetails.spaceBetweenParts);
        // this.ctx.fillRect(this.data.snakeArry.foodCoordi[0].x, this.data.snakeArry.foodCoordi[0].y, 30, 30);
        this.ctx.strokeStyle = this.cfg.snakeFood.borderColor;
        this.ctx.strokeRect(this.data.snakeArry.foodCoordi[0].x, this.data.snakeArry.foodCoordi[0].y, this.cfg.snakeFood.width -  this.cfg.snakeDetails.spaceBetweenParts, this.cfg.snakeFood.height - this.cfg.snakeDetails.spaceBetweenParts);
    };

    snk.fn.drawMapBorder = function(){
        
        // this.ctx.fillStyle = color;
        this.ctx.lineWidth = this.cfg.canvasMap.borderWidth;
        this.ctx.strokeStyle = this.cfg.canvasMap.borderColor;
            
        this.ctx.beginPath();
        this.ctx.setLineDash([0,0]);
        this.ctx.strokeRect(0, 0, this.cfg.canvas.width, this.cfg.canvas.height );
    };

    snk.fn.drawStats = function(){
        this.ctx.textAlign = 'left';
        // var opacity = 0.9;
        // this.stats.combo = this.stats.combo.toString();
        
        this.ctx.fillStyle = '#fff';
        this.ctx.font = '2rem Monospace';
        this.ctx.fillText('Consumed: ' + this.stats.consumed ,20, 22);
        this.ctx.fillText('Score: ' + this.stats.score, 230, 22);
        this.ctx.fillText('Combo: x' + this.stats.combo, 390, 22);
        if(this.stats.combo > 0){
            var text = this.ctx.measureText(this.stats.combo);
            this.ctx.fillText('['+ this.data.changes.comboTime +']', 465 + text.width, 22);
        }
        this.ctx.fillText('Time: ' + this.stats.time, 595, 22);
        this.ctx.fillText('Difficulty: ' + this.data.gameSettings.difficulty, 820, 22);

        this.ctx.strokeStyle = '#cfcfcf';
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.setLineDash([7, 5]);
        this.ctx.moveTo(18, 33);
        this.ctx.lineTo(990, 33);
        this.ctx.stroke();
      
    
    };

    snk.fn.drawGameoverScoreBoard = function(){

        this.ctx.textAlign = this.cfg.ui.gameoverBoard.align;
        this.ctx.font = '2.4rem Monospace';

        this.cfg.ui.gameoverBoard.rowWidth = this.ctx.measureText('Consumed: ' + this.stats.consumed + ' ' + ' Score: ' + this.stats.score + ' '+ ' Max Combo: x' + this.stats.maxCombo).width;
        this.cfg.ui.gameoverBoard.width = this.cfg.ui.gameoverBoard.rowWidth + this.cfg.ui.gameoverBoard.paddingLR;

        this.ctx.setLineDash([0,0]);
        this.ctx.fillStyle = this.cfg.ui.gameoverBoard.color;
        this.ctx.fillRect(this.cfg.canvas.center.x - this.cfg.ui.gameoverBoard.width / 2, this.cfg.canvas.center.y - this.cfg.ui.gameoverBoard.height / 2 , this.cfg.ui.gameoverBoard.width, this.cfg.ui.gameoverBoard.height);
        
        this.ctx.fillStyle = '#fff';
        this.ctx.fillText('G A M E O V E R', this.cfg.canvas.center.x , this.cfg.canvas.center.y - this.cfg.ui.gameoverBoard.height / 2 + 8);
        this.ctx.fillText('Consumed: ' + this.stats.consumed + '  Score: ' + this.stats.score + '  Max Combo: x' + this.stats.maxCombo, this.cfg.canvas.center.x, this.cfg.canvas.center.y - (this.cfg.ui.gameoverBoard.height / 2 - this.cfg.ui.gameoverBoard.paddingTop));
        this.ctx.fillText('Time: ' + this.stats.time + ' Difficulty: ' + this.data.gameSettings.difficulty, this.cfg.canvas.center.x , this.cfg.canvas.center.y - ((this.cfg.ui.gameoverBoard.height / 2 - this.cfg.ui.gameoverBoard.paddingTop) - this.cfg.ui.gameoverBoard.margin));
        this.ctx.fillText('Total score: ' + this.stats.total, this.cfg.canvas.center.x, this.cfg.canvas.center.y - ((this.cfg.ui.gameoverBoard.height / 2 - this.cfg.ui.gameoverBoard.paddingTop) - this.cfg.ui.gameoverBoard.margin * 2));

        /* ------ BUTTON ------ */
    
        this.ctx.fillRect(this.cfg.canvas.center.x - this.ctx.measureText('Next').width / 2 - 20, this.cfg.canvas.center.y - ((this.cfg.ui.gameoverBoard.height / 2 - this.cfg.ui.gameoverBoard.paddingTop) - this.cfg.ui.gameoverBoard.margin * 3.5) - 20 , this.ctx.measureText('Next').width + 40 , 27);
        this.ctx.fillStyle = 'black';
        this.ctx.fillText('NEXT', this.cfg.canvas.center.x, this.cfg.canvas.center.y - ((this.cfg.ui.gameoverBoard.height / 2 - this.cfg.ui.gameoverBoard.paddingTop) - this.cfg.ui.gameoverBoard.margin * 3.5) );
    
        /* ------ SCORE BORDER ------ */

        this.ctx.lineWidth = 2;
        this.ctx.beginPath();

        // this.ctx.setLineDash([7, 5]);
        this.ctx.moveTo((this.cfg.canvas.center.x - this.cfg.ui.gameoverBoard.width / 2), (this.cfg.canvas.center.y - this.cfg.ui.gameoverBoard.height / 2) + 30);
        this.ctx.lineTo((this.cfg.canvas.center.x - this.cfg.ui.gameoverBoard.width / 2), (this.cfg.canvas.center.y - this.cfg.ui.gameoverBoard.height / 2));
        this.ctx.lineTo((this.cfg.canvas.center.x - this.cfg.ui.gameoverBoard.width / 2) + 30, (this.cfg.canvas.center.y - this.cfg.ui.gameoverBoard.height / 2));
        this.ctx.stroke();


        this.ctx.beginPath();
        // this.ctx.setLineDash([7, 5]);
        this.ctx.moveTo((this.cfg.canvas.center.x + this.cfg.ui.gameoverBoard.width / 2), (this.cfg.canvas.center.y - this.cfg.ui.gameoverBoard.height / 2) + 30);
        this.ctx.lineTo((this.cfg.canvas.center.x + this.cfg.ui.gameoverBoard.width / 2), (this.cfg.canvas.center.y - this.cfg.ui.gameoverBoard.height / 2));
        this.ctx.lineTo((this.cfg.canvas.center.x + this.cfg.ui.gameoverBoard.width / 2) - 30, (this.cfg.canvas.center.y - this.cfg.ui.gameoverBoard.height / 2));
        this.ctx.stroke();


            
        this.ctx.beginPath();
        // this.ctx.setLineDash([7, 5]);
        this.ctx.moveTo((this.cfg.canvas.center.x + this.cfg.ui.gameoverBoard.width / 2), (this.cfg.canvas.center.y + this.cfg.ui.gameoverBoard.height / 2) - 30);
        this.ctx.lineTo((this.cfg.canvas.center.x + this.cfg.ui.gameoverBoard.width / 2), (this.cfg.canvas.center.y + this.cfg.ui.gameoverBoard.height / 2));
        this.ctx.lineTo((this.cfg.canvas.center.x + this.cfg.ui.gameoverBoard.width / 2) - 30, (this.cfg.canvas.center.y + this.cfg.ui.gameoverBoard.height / 2));
        this.ctx.stroke();

        this.ctx.beginPath();
        // this.ctx.setLineDash([7, 5]);
        this.ctx.moveTo((this.cfg.canvas.center.x - this.cfg.ui.gameoverBoard.width / 2), (this.cfg.canvas.center.y + this.cfg.ui.gameoverBoard.height / 2) - 30);
        this.ctx.lineTo((this.cfg.canvas.center.x - this.cfg.ui.gameoverBoard.width / 2), (this.cfg.canvas.center.y + this.cfg.ui.gameoverBoard.height / 2));
        this.ctx.lineTo((this.cfg.canvas.center.x - this.cfg.ui.gameoverBoard.width / 2) + 30, (this.cfg.canvas.center.y + this.cfg.ui.gameoverBoard.height / 2));
        this.ctx.stroke();


    
        // this.ctx.lineWidth = 2;
        
        // this.ctx.beginPath();

        // // this.ctx.setLineDash([7, 5]);
        // this.ctx.moveTo(this.cfg.canvas.center.x ,this.cfg.canvas.center.y - this.cfg.canvas.height / 2 );
        // this.ctx.lineTo(this.cfg.canvas.center.x, this.cfg.canvas.center.y + this.cfg.canvas.height / 2 + 30);
        // this.ctx.moveTo(this.cfg.canvas.center.x - this.cfg.canvas.width / 2 ,this.cfg.canvas.center.y );
        // this.ctx.lineTo(this.cfg.canvas.center.x + this.cfg.canvas.width / 2 + 30, this.cfg.canvas.center.y);
        // this.ctx.stroke();
    };

    snk.fn.drawCountToStart = function(countDown){
        this.ctx.textAlign = 'left';
        this.ctx.fillStyle = '#fff';
        this.ctx.font = '3.5rem Monospace';
        if(this.data.gameInterval.gameCountDownToStart == 0){
            this.ctx.fillText('GO!', this.cfg.canvas.center.x - 10, this.cfg.canvas.center.y - 20);
        } else {  
            this.ctx.fillText(countDown, this.cfg.canvas.center.x, this.cfg.canvas.center.y - 20);
        }
    };

    snk.fn.drawMenu = function(){
         
        this.ctx.fillStyle = this.cfg.ui.menu.color;
        this.ctx.fillRect(this.cfg.canvas.center.x - this.cfg.ui.menu.width / 2, this.cfg.canvas.center.y - this.cfg.ui.menu.height / 2, this.cfg.ui.menu.width , this.cfg.ui.menu.height);   
        this.ctx.textAlign = this.cfg.ui.menu.align;
        this.ctx.fillStyle = '#fff';
        this.ctx.font = '2.6rem Monospace';
        if(this.menu.tree.length == 1){
            if(this.data.changes.gameStage == 'unstarted'){
                this.ctx.fillText('S N A K E', this.cfg.canvas.center.x , this.cfg.ui.menu.coordinates.y - 40);
            } else {
                this.ctx.fillText(this.data.changes.gameStage.toUpperCase().split('').join(String.fromCharCode(8202)), this.cfg.canvas.center.x , this.cfg.ui.menu.coordinates.y - 40);
            }
          
        } else {
            this.ctx.fillText(this.menu.tree[this.menu.tree.length-1].name.split('').join(String.fromCharCode(8202)), this.cfg.canvas.center.x , this.cfg.ui.menu.coordinates.y - 40); 
        }


        this.ctx.strokeStyle = '#fff';
        this.ctx.lineWidth = 4;
        // this.ctx.fillStyle = '#dadada';
        this.ctx.font = '2.9rem Monospace';
       
       
    
        for(var i = 0; i < this.menu.lists.length ; i++){
        
            var text = this.ctx.measureText(this.menu.lists[this.menu.index].name);

            // if(this.menu.selected !== 'none'){
                
            // }
            if(i === this.menu.index ){
                if(this.menu.selected === false){
                    this.ctx.font = '2.7rem Monospace';
                    if(this.menu.lists[i].available === false){
                        this.ctx.fillStyle = 'gray';
                    } else {
                        this.ctx.fillStyle = '#fff';
                    }
                   
                    this.ctx.fillText(this.menu.lists[i].name, this.cfg.canvas.center.x , this.cfg.ui.menu.coordinates.y + 50 + this.cfg.ui.menu.margin * i);
                    
                    this.ctx.beginPath();
                    // this.ctx.setLineDash([7, 5]);
                    this.ctx.moveTo(this.cfg.canvas.center.x - text.width / 2 - 20, ((this.cfg.canvas.center.y - this.cfg.ui.menu.height / 2) + 80) + this.cfg.ui.menu.margin * i );
                    this.ctx.lineTo(this.cfg.canvas.center.x - text.width / 2 - 20, (this.cfg.canvas.center.y - this.cfg.ui.menu.height / 2 + 105) + this.cfg.ui.menu.margin * i);
                    // this.ctx.lineTo((this.cfg.canvas.center.x - this.cfg.ui.menu.width / 2) + 30, this.cfg.canvas.center.y - this.cfg.ui.menu.height / 2);
                    this.ctx.stroke();   
                } else {
                    this.ctx.fillStyle = '#fff';
                    this.ctx.fillRect(this.cfg.canvas.center.x - text.width / 2 -20, ((this.cfg.canvas.center.y - this.cfg.ui.menu.height / 2) + 78)+ this.cfg.ui.menu.margin * i, text.width + 40 , 29);
                    this.ctx.fillStyle = 'black';
                    this.ctx.font = '2.7rem Monospace';
                    this.ctx.fillText(this.menu.lists[i].name, this.cfg.canvas.center.x , this.cfg.ui.menu.coordinates.y + 50 + this.cfg.ui.menu.margin * i); 
                }
              
                // console.log('a')
            } else if(this.menu.lists[i].available === false){
                this.ctx.font = '2.7rem Monospace';
                this.ctx.fillStyle = 'gray';
                this.ctx.fillText(this.menu.lists[i].name, this.cfg.canvas.center.x , this.cfg.ui.menu.coordinates.y + 50 + this.cfg.ui.menu.margin * i);
   
            } else {
                this.ctx.font = '2.7rem Monospace';
                this.ctx.fillStyle = '#e4e4e4';
                this.ctx.fillText(this.menu.lists[i].name, this.cfg.canvas.center.x , this.cfg.ui.menu.coordinates.y + 50 + this.cfg.ui.menu.margin * i);
        
                
            }
               
                
        }
        // if(this.menu.lists[this.menu.lists-1].show === true){
        //     this.ctx.fillText('Back', this.cfg.canvas.center.x , this.cfg.ui.menu.coordinates.y + 50 + this.cfg.ui.menu.margin * this.menu.lists.length );
               
        // }


        /* ------ MENU BORDER ------ */

        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        // this.ctx.setLineDash([7, 5]);
        this.ctx.moveTo(this.cfg.canvas.center.x - this.cfg.ui.menu.width / 2, (this.cfg.canvas.center.y - this.cfg.ui.menu.height / 2) + 30 );
        this.ctx.lineTo((this.cfg.canvas.center.x - this.cfg.ui.menu.width / 2), this.cfg.canvas.center.y - this.cfg.ui.menu.height / 2);
        this.ctx.lineTo((this.cfg.canvas.center.x - this.cfg.ui.menu.width / 2) + 30, this.cfg.canvas.center.y - this.cfg.ui.menu.height / 2);
        this.ctx.stroke();


        this.ctx.beginPath();
        // this.ctx.setLineDash([7, 5]);
        this.ctx.moveTo(this.cfg.canvas.center.x + this.cfg.ui.menu.width / 2, (this.cfg.canvas.center.y - this.cfg.ui.menu.height / 2) + 30 );
        this.ctx.lineTo((this.cfg.canvas.center.x + this.cfg.ui.menu.width / 2), this.cfg.canvas.center.y - this.cfg.ui.menu.height / 2);
        this.ctx.lineTo((this.cfg.canvas.center.x + this.cfg.ui.menu.width / 2) - 30, this.cfg.canvas.center.y - this.cfg.ui.menu.height / 2);
        this.ctx.stroke();


            
        this.ctx.beginPath();
        // this.ctx.setLineDash([7, 5]);
        this.ctx.moveTo(this.cfg.canvas.center.x + this.cfg.ui.menu.width / 2, (this.cfg.canvas.center.y + this.cfg.ui.menu.height / 2) - 60 );
        this.ctx.lineTo((this.cfg.canvas.center.x + this.cfg.ui.menu.width / 2), this.cfg.canvas.center.y + this.cfg.ui.menu.height / 2  - 30);
        this.ctx.lineTo((this.cfg.canvas.center.x + this.cfg.ui.menu.width / 2) - 30, this.cfg.canvas.center.y + this.cfg.ui.menu.height / 2 - 30);
        this.ctx.stroke();

        this.ctx.beginPath();
        // this.ctx.setLineDash([7, 5]);
        this.ctx.moveTo(this.cfg.canvas.center.x - this.cfg.ui.menu.width / 2, (this.cfg.canvas.center.y + this.cfg.ui.menu.height / 2) - 60 );
        this.ctx.lineTo((this.cfg.canvas.center.x - this.cfg.ui.menu.width / 2), this.cfg.canvas.center.y + this.cfg.ui.menu.height / 2 - 30);
        this.ctx.lineTo((this.cfg.canvas.center.x - this.cfg.ui.menu.width / 2) + 30, this.cfg.canvas.center.y + this.cfg.ui.menu.height / 2 - 30);
        this.ctx.stroke();



        // ctx.beginPath();
        // // ctx.setLineDash([7, 5]);
        // ctx.moveTo(coordy.x - prop.width / 2, (coordy.y + prop.height / 2) );
        // ctx.lineTo((coordy.x + prop.width / 2), coordy.y +prop.height / 2);
        // // ctx.lineTo((coordy.x + prop.width / 2) - 30, coordy.y - prop.height / 2);
        // ctx.stroke();

        // ctx.beginPath();
        // // ctx.setLineDash([7, 5]);
        // ctx.moveTo(coordy.x - prop.width / 2, (coordy.y -  prop.height / 2) );
        // ctx.lineTo((coordy.x + prop.width / 2), coordy.y -prop.height / 2);
        // // ctx.lineTo((coordy.x + prop.width / 2) - 30, coordy.y - prop.height / 2);
        // ctx.stroke();

        // ctx.fillRect(coordy.x, coordy.y, 5, 5);


        // ctx.fillRect(coordy.x, coordy.y, 1, 300);
        // ctx.fillRect(coordy.x, coordy.y, 1, -300);
        // ctx.fillRect(coordy.x, coordy.y, 300, 1);
        // ctx.fillRect(coordy.x, coordy.y, -300, 1);
    };

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
    

    // public method
    // snk.fn draw= {
    //     snakeFromParts: snakeDrawFunctions.drawSnakeFromParts,
    //     food: snakeDrawFunctions.drawFood,
    //     mapBorder: snakeDrawFunctions.drawMapBorder,
    //     stats: snakeDrawFunctions.drawStats,
    //     countToStart: snakeDrawFunctions.drawCountToStart,
    //     menu: snakeDrawFunctions.drawMenu,
    // };
    // snake.draw = snakeDrawFunctions.drawSnakeFromParts;
    // snake.drawFood = snakeDrawFunctions.drawFood;
    // snake.drawMapBorder = snakeDrawFunctions.drawMapBorder;
    // snake.drawStats = snakeDrawFunctions.drawStats;
    // snake.drawCountToStart = snakeDrawFunctions.drawCountToStart;
    // snake.drawMenu = snakeDrawFunctions.drawMenu;
    return snk;
})(this, Snake || {}); 