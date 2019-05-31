var Snake = (function(snk){



    snk.fn.menuControl = function(e){
        switch (e) {
            case 'up':
                if(this.menu.selected !== false){
                    if(typeof this.menu.proto[this.menu.choice.function] === 'function'){
                        this.menu.proto[this.menu.choice.function](1);
                    } 
                }else if( this.menu.index > 0) {
                    this.menu.selected = false;
                    this.menu.index -= 1;
                    console.log(this.menu);
                }
                break;

            case 'down':
                if(this.menu.selected !== false){
                    if(typeof this.menu.proto[this.menu.choice.function] === 'function'){
                        this.menu.proto[this.menu.choice.function](-1);
                    } 
                } else if(this.menu.index < this.menu.lists.length-1){
                    this.menu.selected = false;
                    this.menu.index += 1;
                    console.log(this.menu);
                }
                break;

            case 'left':
                if(this.menu.selected !== false){
                    if(typeof this.menu.proto[this.menu.choice.function] === 'function'){
                        this.menu.proto[this.menu.choice.function](-1);
                    } 
                }
                break;

            case 'right':
                if(this.menu.selected !== false){
                    if(typeof this.menu.proto[this.menu.choice.function] === 'function'){
                        this.menu.proto[this.menu.choice.function](1);
                    } 
                }
                break;

            case 'enter':
                if(this.menu.selected === true){ 
                    this.menu.selected = false;
                } else {
                    this.menu.choice = this.menu.lists[this.menu.index];
                    console.log(this.menu);
                    if(typeof this.menu.choice.subMenu === 'object' && this.menu.choice.available === true){
                        this.menu.lists = this.menu.lists[this.menu.index].subMenu;
                        this.menu.index = 0;
                        this.menu.tree.push(this.menu.choice);
                    } 
                    if(typeof this.menu.choice.function === 'string' &&  !this.menu.choice.change) {
                       
                        if(this.menu.proto[this.menu.choice.function] !== undefined && this.menu.choice.available === true){
                            this.menu.proto[this.menu.choice.function]();
                        }
                    } else if(typeof this.menu.choice.change === 'object'){
                        this.menu.selected = true;
                        console.log(this.menu);
                    }
                }
                break;

            case 'back':
                if(this.menu.selected === true){
                    this.menu.selected = false;
                } else if(this.menu.tree.length > 1){
                    if(typeof this.menu.tree[this.menu.tree.length-2].subMenu === 'object'){
                        this.menu.lists = this.menu.tree[this.menu.tree.length-2].subMenu;
                    } else {
                        this.menu.lists = this.menu.tree[this.menu.tree.length-2];
                    }
                    this.menu.index = 0;
                    this.menu.selected = false;
                    this.menu.tree.pop();
                }
                console.log(this.menu);
                break;   

            default: 
                console.log('nothing');

        }
       
    };


    snk.fn.setMenuProto = function(){
        // console.log(this);
        var that = this;
        if(!this.menu.proto){
            this.menu.proto = {
                showSettings: function(e) {
                    var len = e.length;
                    var i = 0;
                    var j = 0;
                    if(e){
                        for(i; i < len; i++){
                            if(e[i].subMenu !== false){
                                for(j; j < e[i].subMenu.length; j++ ){
                                    if(e[i].subMenu[j].default){
                                        e[i].subMenu[j].name += ' ' + e[i].subMenu[j].default;
                                    }
                                    if(e[i].subMenu[j].subMenu !== false){
                                        that.menu.proto.showSettings(e[i].subMenu);
                                    }
                                }
                            }
                        }
                    }
                },
                newGame: function(){
                    console.log(that);
                    console.log('newGame');
                },

                backMenu: function(){
                    that.menuControl('back');
                },
                
                toggleSound: function(){
                    if(that.data.gameSettings.sound === 'on'){
                        that.data.gameSettings.sound = 'off';
                        that.menu.choice.name = 'Sound: ' + that.menu.lists[that.menu.index].change[1];
                    } else {
                        that.data.gameSettings.sound = 'on';
                        that.menu.choice.name = 'Sound: ' + that.menu.lists[that.menu.index].change[0];
                    }
                },

                changeVolume: function(e){
                    if(e == -1 && that.data.gameSettings.volume >= 10 || e == 1 && that.data.gameSettings.volume <= 90){
                        that.data.gameSettings.volume += (10 * e);
                        that.menu.choice.name = 'Volume: ' + that.data.gameSettings.volume + '%';
                    }
                },

                changeDifficulty: function(e){
                    if(e == -1 && that.data.gameSettings.difficultyLevely !== that.menu.choice.change[0] || e == 1 && that.data.gameSettings.difficultyLevel !== that.menu.choice.change[that.menu.choice.change.length-1]){ //TODO: must change if
                        that.menu.choice.choiceChange += e;
                        that.data.gameSettings.difficultyLevel = that.menu.choice.change[that.menu.choice.choiceChange-1];
                        that.menu.choice.name = 'Difficulty: ' + that.data.gameSettings.difficultyLevel;
                    }
                }
            };
        }
    };

    
    return snk;
})(Snake || {});
