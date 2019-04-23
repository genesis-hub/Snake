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

// var SNAKE = Q(function(snk){
//      snk.UI = {
//         hideUi: function(){
//             Q("#game_guide").toggle();
//         }
//     }
//     return snk;
// });