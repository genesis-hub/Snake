var _Snake = (function(snk){
    
    snk.UI = {
        toggleUi: function(){
            document.getElementById("game_guide").style.display = 'none';     
        },
        hideBg: function(){
            document.getElementById("game_background").style.display = 'none';
            document.getElementById("wrapper").style.background = 'rgb(128, 128, 128)';

        },
        hide: function(){
            document.getElementById("game_guide").style.display = 'none';
        }
    }

    return snk;
})(_Snake || {});
