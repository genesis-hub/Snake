var _SNAKE = (function(snk, Q){
      
    snk.UI = {
        toggleUi: function(){
            Q("#game_guide").toggle();
        },
        hideBg: function(){
            Q("#game_background").hide();
        }
    }

    return snk;
})(_SNAKE || {}, _Cube);
