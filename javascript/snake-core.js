var Snake = (function(root, snk){
    'use strict';
    console.log('%cSNAKE GAME 🐍', 'color: green; font-size: 30px;', '@ Matthew');
    
    var CONFIG;
    var cfgPath = 'https://cdn.jsdelivr.net/gh/ressel-hub/Snake/data/cfg.json';

    // var loadSettings;
    // add browser support
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    // eslint-disable-next-line no-unused-vars
    var cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;
   
    var toStr = Object.prototype.toString, // used for shorthand
        astr = '[object Array]'; // used to comparison

    // creating game
    var GameCreate = function(cfg){
        // get game config 
        this.cfg = JSON.parse(cfg);
        // snk.localStorage.remove('settings');
        this.initGame();
        console.log(this);
        console.log('%cGame ready to start!', 'color: Green; font-size: 20px;');
    };
   
    GameCreate.prototype = snk.fn = {
        length: 0,
        // game initilization  
        initGame: function(){
            // variables created with the config for further action
            console.log('%cSetting config', 'color: Green; font-size: 20px;');
            this.setConfig();
            //
            this.setStats();
            // 
            this.loadSettings();
            //
            console.log('%cCreate snake', 'color: blue; font-size: 15px;');
            this.createSnake(this.cfg.snakeDetails.length);
            // crate canvas element
            console.log('%cCreate canvas', 'color: blue; font-size: 15px;');
            this.createCanvas();
            //
            console.log('%cCreate food', 'color: blue; font-size: 15px;');
            this.createFood();
            console.log('%cSetting Menu methods', 'color: Green; font-size: 15px;');
            this.setMenuProto();

            // set event to control snake 
            console.log('%cSetting event listener', 'color: green; font-size: 15px;');
            this.setEventListener();

            this.data.gameInterval.myAnimateReq = requestAnimationFrame(this.initDraw.bind(this));
        },

        initDraw: function(){
            if(this.data.gameStatus == true || this.data.gameStatus == false ){ // safety
                this.clearCanvas();

                this.drawSnakeFromParts();

                if(this.data.gameStatus == true){
                    this.drawFood();
                }
                if(this.data.changes.gameStage == 'count'){
                    this.drawCountToStart(this.data.gameInterval.gameCountDownToStart);
                }
        
                if(this.data.gameStarted == true || this.data.changes.gameStage == 'count'){
                    this.drawStats();
                }


                this.drawMapBorder();
                if(this.data.changes.gameStage == 'gameover'){
                    this.drawGameoverScoreBoard();
                }
                if(this.menu.show == true){
                    this.drawMenu();
                }
             
                requestAnimationFrame(this.initDraw.bind(this));  
            }
        },
        splice: Array.prototype.splice,
        // variables created with the config for further action
        setConfig: function(){
            this.data = {
                snakeArry: {
                    snakeParts: [],
                    holdPartsDraw: [],
                    foodCoordi: [],
                },    

                gameStatus: false,
                gameStarted: false,
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
                changes: {
                    timeSpent: {
                        h: 0,
                        m: 0,
                        s: 0
                    },
                    gameStage: 'unstarted',
                },
                gameInterval: {
                    gameCountDownToStart: 3,
                    gameCountDownInterval: null,
                    timeSpentInterval: null,
                    myAnimateReq: null,
                    myInerval: null,
                    interval: 10,
                    comboTimeInterval: null,
                    totalScoreInterval: null
                },
                gameSettings: {}
            };
            
            this.menu = {
                index: this.cfg.ui.menu.index,
                lists: this.cfg.ui.menu.lists,
                show: true,
                tree: [this.cfg.ui.menu.lists],
                selected: false,
              
              
            },
   
            this.cfg.canvas.rows = Math.floor((this.cfg.canvas.width ) / this.cfg.snakeDetails.width);
            this.cfg.canvas.cols = Math.floor((this.cfg.canvas.height ) / this.cfg.snakeDetails.height);

            this.cfg.canvas.numbersToMovePoints = {
                x: (this.cfg.canvas.width % this.cfg.canvas.rows / 2)  + (this.cfg.snakeDetails.spaceBetweenParts / 2),
                y: (this.cfg.canvas.height % this.cfg.canvas.cols / 2) + (this.cfg.snakeDetails.spaceBetweenParts / 2)
            };

            this.cfg.canvas.center = {
                x: Math.floor(this.cfg.canvas.rows / 2 ) * this.cfg.snakeDetails.width + this.cfg.canvas.numbersToMovePoints.x,
                y: Math.floor(this.cfg.canvas.cols / 2 ) * this.cfg.snakeDetails.height +  this.cfg.canvas.numbersToMovePoints.y
            }; 
        },

        createCanvas: function(){
            // get canvas element
            this.canvas = document.getElementById('game_canvas');
            // set canvas to '2D'
            this.ctx = this.canvas.getContext('2d');
            // set width and height from game config
            this.canvas.width = this.cfg.canvas.width;
            this.canvas.height = this.cfg.canvas.height;
        },

        createSnake: function(x){
            var len = x;
            var i;
            var tab = [];
            for( i = 0; i < len; i++) {
                tab.push({
                    x: this.cfg.canvas.center.x + (this.cfg.snakeDetails.width * i) - (Math.floor((len-1)/2) * this.cfg.snakeDetails.width),
                    y: this.cfg.canvas.center.y + this.cfg.snakeDetails.height,
                });
            }
            this.data.directions = {
                v: 0,
                h: -1
            };
            this.data.snakeArry.snakeParts = tab;
            // do deep copy of tab
            this.data.snakeArry.holdPartsDraw = this.copyArrayD(tab, []);
            // do necessary methods
            this.prePosition();
            this.currPosition();
        },

        // creating food for snake
        createFood: function(){
            var food = this.randomCoordinates();
            this.data.changes.comboTime = this.data.difficultyProp.comboTime;
            this.data.snakeArry.foodCoordi = [];
            return this.data.snakeArry.foodCoordi.push(food);
        },

        // method for smooth draw snake
        changeCoordinatesOfParts: function(){
            if(this.data.gameStatus == true){
                if(this.data.snakeArry.snakeParts[0].x !== this.data.snakeArry.holdPartsDraw[0].x || this.data.snakeArry.snakeParts[0].y !==  this.data.snakeArry.holdPartsDraw[0].y) {
                    for(var i = 0; i < this.data.snakeArry.holdPartsDraw.length; i++){
                        var x = this.data.snakeArry.snakeParts[i].x - this.data.snakeArry.holdPartsDraw[i].x;
                        var y = this.data.snakeArry.snakeParts[i].y - this.data.snakeArry.holdPartsDraw[i].y;
                       
                        if(y == 0 ){ //x <= 20 && x !== 0
                            this.data.snakeArry.holdPartsDraw[i].x += (x < 0) ? -this.data.difficultyProp.speed :this.data.difficultyProp.speed;
                        }

                        if(x == 0){ //y <= 20 && y !== 0
                            this.data.snakeArry.holdPartsDraw[i].y += (y < 0) ? -this.data.difficultyProp.speed :this.data.difficultyProp.speed;
                        }

                        //check if snake eaten food
                        if(this.eat(this.data.snakeArry.foodCoordi)){ 
                            this.addPartToArray();
                            this.createFood();
                            this.score();
                        }
                    }
                } else {
                    var j = this.data.snakeArry.snakeParts.length-1;
                    for(j; j > 0; j--){
                        this.data.snakeArry.snakeParts[j].x += ((this.data.snakeArry.snakeParts[j-1].x - this.data.snakeArry.snakeParts[j].x));
                        this.data.snakeArry.snakeParts[j].y += ((this.data.snakeArry.snakeParts[j-1].y - this.data.snakeArry.snakeParts[j].y));
                    }
                   
                    this.data.snakeArry.snakeParts[0].x += (this.data.directions.h  * this.cfg.snakeDetails.width );
                    this.data.snakeArry.snakeParts[0].y += (this.data.directions.v  * this.cfg.snakeDetails.height );

                    this.changeCoordinatesOfParts();
                }

                // check if the snake ate himself or hit the map border
                if(this.data.gameStatus == true){
                    this.checkIfSnakeDead();
                }
            }

        },

        // add snake part after aeten food
        addPartToArray: function(){
            this.data.snakeArry.snakeParts.push({x: this.data.snakeArry.snakeParts[this.data.snakeArry.snakeParts.length-2].x , y: this.data.snakeArry.snakeParts[this.data.snakeArry.snakeParts.length-2].y});
            this.data.snakeArry.holdPartsDraw.push({x: this.data.snakeArry.holdPartsDraw[this.data.snakeArry.holdPartsDraw.length-2].x, y: this.data.snakeArry.holdPartsDraw[this.data.snakeArry.holdPartsDraw.length-2].y });
        },

        // clear canvas
        clearCanvas: function(){
            this.ctx.clearRect(3, 3, this.cfg.canvas.width - 5, this.cfg.canvas.height - 5 );
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
                    }
                }
            }
            return into;
        },

        // method to check if snake eaten the food
        eat: function(food){

            var dis = this.checkDist(food, this.data.snakeArry.holdPartsDraw);
            if(dis.x < 25 && dis.y < 25 || dis.x == 0 &&  dis.y == 0){

                clearInterval(this.data.gameInterval.comboTimeInterval);
                this.data.gameInterval.comboTimeInterval = setInterval(this.timerCountdown.bind(this), 1000);
                return true;
            } else {
                return false;
            }

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
            var len = this.data.snakeArry.holdPartsDraw.length - 2;
            // himself
            for(len; len > 1; len--){ //i; i < len; i++
                var x = Math.abs(this.data.snakeArry.holdPartsDraw[0].x - this.data.snakeArry.holdPartsDraw[len].x);
                var y = Math.abs(this.data.snakeArry.holdPartsDraw[0].y - this.data.snakeArry.holdPartsDraw[len].y);

                if( x < 15 && y < 15 ){
                    this.gameStop();
                    this.clearCanvas();
                    // snake.draw(snakeArry.holdPartsDraw,ctx, snakeDetails.width, snakeDetails.height, "black" ,snakeDetails.borderColor , snakeDetails.spaceBetweenParts);
                    this.drawStats();
                    this.stats.snakeLife = 0;
                    
                    this.data.changes.gameStage = 'gameover';
                    this.data.gameInterval.totalScoreInterval = setInterval(this.totalScore.bind(this), 5);
                }
            }
            // map
            if(this.data.snakeArry.snakeParts[0].x < 8 || this.data.snakeArry.snakeParts[0].y > 668 || this.data.snakeArry.snakeParts[0].x > 968  || this.data.snakeArry.snakeParts[0].y < 33){
                this.gameStop();
                this.clearCanvas();
                // snake.draw(snakeArry.holdPartsDraw,ctx, snakeDetails.width, snakeDetails.height, "black" ,snakeDetails.borderColor , snakeDetails.spaceBetweenParts);
                this.drawStats();
                this.stats.snakeLife = 0;
                this.data.changes.gameStage = 'gameover';
                this.data.gameInterval.totalScoreInterval = setInterval(this.totalScore.bind(this), 5);
                
            }
            if(this.data.changes.gameStage =='gameover'){
                this.cfg.ui.menu.lists[1].available = false;
            }
        },

        // method for countdown comboTime
        timerCountdown: function(){
           
            if(this.data.gameStatus == true && this.data.gameStarted == true){
                if(this.data.changes.comboTime > 1){
                    this.data.changes.comboTime -= 1;
                } else {
                    clearInterval(this.data.gameInterval.comboTimeInterval);
                   
                    this.stats.combo = 0;
                    this.data.changes.comboTime = this.data.difficultyProp.comboTime;

                }
            }
        },

        // create random coordinates for the food or others items which will be draw in canvas
        randomCoordinates: function(){
            var coordinates = {
                x: (Math.floor((Math.random() * this.cfg.canvas.rows)) * this.cfg.snakeDetails.width ) + this.cfg.canvas.numbersToMovePoints.x,
                y: (Math.floor((Math.random() * (this.cfg.canvas.cols - 1) + 1) )* this.cfg.snakeDetails.height ) + this.cfg.canvas.numbersToMovePoints.y
            };
            var len = this.data.snakeArry.snakeParts.length-1;
            // checks if the created coordinates already exist
            for(len; len >= 0; len--){
                if(coordinates.x == this.data.snakeArry.snakeParts[len].x && coordinates.y == this.data.snakeArry.snakeParts[len].y){
                    return this.randomCoordinates();
                } 
                if(this.data.snakeArry.foodCoordi.length > 0){
                    if (coordinates.x == this.data.snakeArry.foodCoordi[0].x && coordinates.y == this.data.snakeArry.foodCoordi[0].y){
                        return this.randomCoordinates();
                    }
                }
            }
            return coordinates;
        },

        // method which count spent time
        timeSpent: function(){
            if(this.data.gameStatus == true && this.data.gameStarted == true){
                var setTwoDigits = function (number){
                    return (number < 10 ? '0' : '') + number;
                };

                if(this.data.changes.timeSpent.s < 59){
                    this.data.changes.timeSpent.s += 1;
                } else {
                    this.data.changes.timeSpent.m += 1;
                    this.data.changes.timeSpent.s = 0;
                }

                if(this.data.changes.timeSpent.m == 60){
                    this.data.changes.timeSpent.m = 0;
                    this.data.changes.timeSpent.h +=1;
                }

                if(this.data.changes.timeSpent.h == 24){
                    return this.stats.time = 'ERROR :)';
                }
                return this.stats.time = setTwoDigits(this.data.changes.timeSpent.h) + ':' + setTwoDigits(this.data.changes.timeSpent.m) + ':' + setTwoDigits(this.data.changes.timeSpent.s);
            }
        },

        // method for change difficulty property
        difficultyLevelChanges: function(el){
            el = el || this.data.gameSettings.difficulty;
            this.data.difficultyProp = this.cfg.ui.menu.lists[3].subMenu[2].prop[el];
            this.cfg.ui.menu.lists[1].available = false;
            console.log(this.data.prop);
        },

        // method for countdown to start
        gameCountToStart: function(){
            if(this.data.gameStatus == false){
                console.log(this.data.gameInterval.gameCountDownToStart);
                if(this.data.gameInterval.gameCountDownToStart > 0){
                    this.data.gameInterval.gameCountDownToStart += -1;
                } else {
                    clearInterval(this.data.gameInterval.gameCountDownInterval);
                    // this.data.gameStarted = true;
                    this.data.gameStatus = true;
                    this.data.changes.gameStage = 'started';
                    this.data.gameInterval.gameCountDownToStart = 3;
                    if(this.data.gameStarted == false){
                        this.data.gameStarted = true;
                    }
                   
                }
            }
        },

        // counting 'score'
        score: function(){
           
            this.stats.consumed+=1;
            this.stats.score += (5 * ((this.stats.combo == 0 )? 1 : this.stats.combo)) ;
            this.stats.combo += 2;
            if(this.stats.maxCombo < this.stats.combo){
                this.stats.maxCombo = this.stats.combo;
            }
        },

        totalScore: function(){
            // if(this.stats.total > (this.stats.score + this.stats.consumed * this.stats.maxCombo) / 100 * 10 && this.stats.total < (this.stats.score + this.stats.consumed * this.stats.maxCombo) / 100 * 90){
            //     this.stats.total +=  Math.round((this.stats.score + this.stats.consumed * this.stats.maxCombo) / 500);
       
            // }else {
            //     this.stats.total +=  Math.round((this.stats.score + this.stats.consumed * this.stats.maxCombo) / 1000);
            // }
         
            // if(this.stats.total >= this.stats.score + this.stats.consumed * this.stats.maxCombo){
            //     var resto = Math.ceil((this.stats.score + (this.stats.consumed * this.stats.maxCombo) + Math.floor((this.stats.consumed * this.stats.maxCombo / this.data.difficultyProp.comboTime))) /5) * 5;
            //     this.stats.total = resto;
            //     clearInterval(this.data.gameInterval.totalScoreInterval);
            // }
             if(this.stats.total > (this.stats.score + this.stats.consumed * this.stats.maxCombo) / 100 * 10 && this.stats.total < (this.stats.score + this.stats.consumed * this.stats.maxCombo) / 100 * 90){
                if((this.stats.score + this.stats.consumed * this.stats.maxCombo) / 500 < 1){
                    this.stats.total +=  Math.round((this.stats.score + this.stats.consumed * this.stats.maxCombo) / 5);
                } else {
                    this.stats.total +=  Math.round((this.stats.score + this.stats.consumed * this.stats.maxCombo) / 500);
                }
            } else {
                if((this.stats.score + this.stats.consumed * this.stats.maxCombo) / 1000 < 1){
                    this.stats.total += Math.round((this.stats.score + this.stats.consumed * this.stats.maxCombo) / 10) ;
                } else {
                    this.stats.total += Math.round((this.stats.score + this.stats.consumed * this.stats.maxCombo) / 1000);
                }
            }
         
            if(this.stats.total >= (this.stats.score + this.stats.consumed * this.stats.maxCombo)){
                var resto = Math.ceil((this.stats.score + (this.stats.consumed * this.stats.maxCombo) + Math.floor((this.stats.consumed * this.stats.maxCombo / this.data.difficultyProp.comboTime))) / 5) * 5;
                this.stats.total = resto;
                clearInterval(this.data.gameInterval.totalScoreInterval);
            }
        },

        // set previous positions
        prePosition: function(){
            this.data.position.previous.x = this.data.snakeArry.snakeParts[0].x;
            this.data.position.previous.y = this.data.snakeArry.snakeParts[0].y;
        },

        // set current positions
        currPosition: function(){
            this.data.position.current.x = this.data.snakeArry.snakeParts[0].x;
            this.data.position.current.y = this.data.snakeArry.snakeParts[0].y;
        },

        // start
        gameStart: function(){
            console.log('%cGame Started', 'color: blue; font-size: 15px');
            // this.data.gameStatus = true;
            this.data.changes.gameStage = 'count';
            this.data.gameInterval.myInerval = setInterval(this.changeCoordinatesOfParts.bind(this), this.data.gameInterval.interval);
            this.data.gameInterval.gameCountDownInterval = setInterval(this.gameCountToStart.bind(this), 1000);
            this.data.gameInterval.comboTimeInterval = setInterval(this.timerCountdown.bind(this), 1000);
            if(this.data.gameInterval.timeSpentInterval == null){
                this.data.gameInterval.timeSpentInterval = setInterval(function(){
                    this.timeSpent();
                    // snakeFunctionalities.timeFood();
                }.bind(this), 1000); // interval ony for 1 sec delay
            }
            this.menu.show = false;
        },

        // stop
        gameStop: function(){
            console.log('%cGame Stopped', 'color: crimson; font-size: 15px');
            this.data.gameStatus = false;
            
            this.data.gameInterval.gameCountDownToStart = 3;
            // this.data.gameStarted = false;
            clearInterval(this.data.gameInterval.gameCountDownInterval);
            // this.data.gameCountDownInterval = null;
            clearInterval(this.data.gameInterval.myInerval);
            clearInterval(this.data.gameInterval.comboTimeInterval);
            // cancelAnimationFrame(this.data.myAnimateReq);
            this.data.changes.gameStage = 'pause';
            // this.menu.show = true;
            this.menu.index = 1;
            
        },

        // add eventListener to the 'keydown'
        setEventListener: function(){
            root.addEventListener('keydown', function(e){
                this.control(e);
            }.bind(this));
        },

        //change game status
        toggleGameStatus: function (){
            if(this.data.changes.gameStage == 'unstarted' || this.data.changes.gameStage == 'pause' ) {
                this.gameStart();

            } else {
                // if(this.stats.snakeLife === 0){
                //     console.log('a');
                //     // snakeFunctionalities.newGame();
                //     // snakeFunctionalities.gameStart();
                // }
                // console.log(this);

                this.gameStop();
            }
        },

        //check if you can change direction
        directionChecker: function(up){
            var calc;
            if (up == 'update'){
                // snake.updatePositions.current();
                this.currPosition();
            }
            if (this.data.directions.h == -1 || this.data.directions.h  == 1) {
                calc = Math.abs(this.data.position.previous.x - this.data.position.current.x);
            } else {
                calc = Math.abs(this.data.position.previous.y - this.data.position.current.y);
            }
            return calc;
        },

        // load settings from localStorage if supports 
        // set settings from localStorage or set default
        loadSettings: function() {
            if(typeof Storage !== 'undefined'){
                console.log('%cBrowser supports "local​Storage".', 'color: #f9a825; font-size: 20px;');
                if(snk.localStorage.get('settings') != null){
                    console.log('%cLoading Settings...', 'color: black; font-size: 15px;');
                    console.log(snk.localStorage.get('settings'));
                    this.data.gameSettings = snk.localStorage.get('settings');
                    this.setSettings(this.cfg.ui.menu.lists);
                    console.log('%cLoading finished', 'color: black; font-size: 15px;');
                }    
                else {
                    console.log('%cSetting the default settings..', 'color: black; font-size: 15px;');
                    this.setSettings(this.cfg.ui.menu.lists);
                    snk.localStorage.set('settings', this.data.gameSettings);
                    console.log(snk.localStorage.get('settings'));
                    console.log('%cSetting finished', 'color: black; font-size: 15px;');
                }
            } else {
                console.log('%cBrowser not supports "local​Storage".', 'color: Crimson; font-size: 20px;');
                console.log('%cYou can not save settings ;/', 'color: crimson; font-size: 20px;');
                this.setSettings(this.cfg.ui.menu.lists);
            }
          
        
        },

        // update localStorage
        updateSettings: function(){
            if(typeof Storage !== 'undefined'){
                console.log('%cUpdate settings', 'color: black; font-size: 15px;');
                snk.localStorage.set('settings', this.data.gameSettings);
                console.log('%cDone', 'color: black; font-size: 15px;');
            }
        },

        // set 'gameSettings' 
        setSettings: function(e){
            var len = e.length;
            var i = 0;
            for(i; i < len; i++){
                if(e[i].subMenu !== false){
                    for(var j = 0; j < e[i].subMenu.length; j++ ){
                        if(e[i].subMenu[j].default){
                            // set default settings
                            if(!this.data.gameSettings[e[i].subMenu[j].name.toLowerCase()]){
                                this.data.gameSettings[e[i].subMenu[j].name.toLowerCase()] = e[i].subMenu[j].default;
                                e[i].subMenu[j].name += ': ' + e[i].subMenu[j].default;
                            } else {
                                // set settings from localStorage
                                e[i].subMenu[j].name += ': ' + this.data.gameSettings[e[i].subMenu[j].name.toLowerCase()];
                            }
                            // set 'difficulty properties' 
                            if(Object.keys(this.data.gameSettings)[j] === 'difficulty' && !this.data.difficultyProp){
                                this.data.difficultyProp = this.cfg.ui.menu.lists[3].subMenu[2].prop[this.data.gameSettings.difficulty];
                            }
                        }
                        if(e[i].subMenu[j].subMenu !== false){
                            this.setSettings(e[i].subMenu);
                        }
                    }
                    
                }
            }            
        },

        // set | reset game stats
        setStats: function(){
            return this.stats = this.copyArrayD(this.cfg.gameStats, {});
        },

        // start new game
        newGame: function(){
            this.setStats();
            this.createSnake(this.cfg.snakeDetails.length);
            this.gameStart();
        }
    };

    // create new game 
    snk.newGame = function(){
        // load config if no exist 
        if(CONFIG === undefined){
            snk.loadJSON(cfgPath, function(res){
                CONFIG = res;
                return new GameCreate(res);
            });
        } else {
            return new GameCreate(CONFIG);
        }
    };

    
    return snk;
})(this, Snake || {});