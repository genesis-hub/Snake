// var Snake = Snake || {};
var Snake = (function(root, snk){
    'use strict';

    var toStr = Object.prototype.toString, // used for shorthand
        objArr = '[object Array]'; // used to comparison

    snk.loadJSON = function(path, callback){
        var xobj = new XMLHttpRequest();
        xobj.overrideMimeType('application/json');
        xobj.open('GET', path, true);
        xobj.addEventListener('load', function() {
            if(xobj.status === 200){
                if(callback){
                    callback(xobj.responseText);
                }
            } else {
                console.log('Error load json file');
            }
        }, false );
        xobj.send(null);
    };

    //extend object methods from another 
    // $.Extend({codeSyntax: function(el){}});
    snk.Extend = function(meth) { 
        var i; 
        var lib = snk.fn;
        for (i in meth) {
            if(meth.hasOwnProperty(i)){
                if(typeof meth[i] === 'object'){        
                    // call method of an object, substituting another object for the current object.
                    lib[i] = (toStr.call(meth[i]) === objArr) ? [] : {};
                    snk.Extend(meth[i], lib[i]);
                } else {
                    lib[i] = meth[i];
                }    
            }
        }
        return lib;
    };





   
    // initialization 
    snk.initGame = function(){
        root.addEventListener('DOMContentLoaded', function(){
            if(snk.config === undefined){
                // snk.loadJSON('../data/cfg.json', function(res){
                    
                //     snk.JSONfiles = {
                //         cfg : JSON.parse(res)
                //     }  // console.log(res);
                   
                //     // root.addEventListener('keydown', function(e){
                //     //     snk.Game.control(e);
                //     // }, false);

                // });
            }


            snk.newGame();

        }, false);
    };

    snk.initGame();

    return snk;
})(this, Snake || {});