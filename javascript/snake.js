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

    snk.localStorage = {
        set: function(name, value){
            localStorage.setItem(name, JSON.stringify(value));
        },
        get: function(name){
            var get = localStorage.getItem(name);
            return JSON.parse(get);
        },
        remove: function(name){
            localStorage.removeItem(name);
        }
    };
   
    // initialization 
    snk.initGame = function(){
        root.addEventListener('DOMContentLoaded', function(){
            snk.newGame();
        }, false);
    };

    snk.initGame();

    return snk;
})(this, Snake || {});