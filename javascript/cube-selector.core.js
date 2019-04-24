/*
 * JavaScript library: selector-engine
 * Released under MIT license
 * Copyright genesis-gub
 * Made by M4TT
*/

var _Cube = (function(root, cube) {
   "use strict";
   
    /* Variables */
    var doc = document; // used for shorthand 
    var toStr = Object.prototype.toString, // used for shorthand
        astr = "[object Array]";// used to comparison
    // initiating function
    cube = function(select) {
        return new query(select);
    };
    
    // check if 'select' is a string, function or object 
    // make array from node list
    // or simple add one element to function and return 'this'
    var query = function(selector){
        if(typeof selector === 'string'){          
            var ary = doc.querySelectorAll(selector),
                len = ary.length;
            if(len > 1) { // check length of node list if bigger then 1 create array 
                cube.fn.match(ary, this);

            } else {
                // if length < 1 first element is equal to first element of node list
                this[0] = ary[0]; 
            }
            this.length = ary.length // array length
        } 
        if(typeof selector === 'function') {

            cube.ready(selector); // DOMContentLoaded 
        } 
        if(typeof selector === 'object') {
            this[0] = selector;
        }
        return this;
    };

    cube.copyDeep = function(from, into){
        var i; into = into || {};
        for (i in from) {
            if(from.hasOwnProperty(i)){
                if(typeof from[i] === 'object'){
                    // call [line:33]
                    into[i] = (toStr.call(from[i]) === astr) ? [] : {};
                   cube.copyDeep(from[i], into[i]);
                } else {
                    into[i] = from[i];
                }    
            }
        }
        return into;
    },

    // wait for "DOM" when it will be safe to manipulate
    cube.ready = function(fn) {
        if (doc.readyState != 'loading'){ // modern browser
            fn();
        } else if (doc.addEventListener) { // W3C
            doc.addEventListener('DOMContentLoaded', fn);
        } else {
            doc.attachEvent('onreadystatechange', function() { // IE
            if (doc.readyState != 'loading')
                fn(); 
            });
        }
    };


    query.prototype = cube.fn = {

        length: 0,

        // copy methods and types of methods into object
       

        /* css({display : "block"})
        // sets css style  */
        css: function (prop){
            var elem = this,
                len = this.length,
                i = 0, property;
            for (property in prop){
                for(; i < len; i++){
                elem[i].style[property] = prop[property];
                }
            }    
        }, 

        forEach: function(){

        },
        /* event handler */
        on: function(events, callback){
            var i = 0,
                len = this.length;
            if(this[i].addEventListener) {
                for(; i < len; i++){
                    this[i].addEventListener(events, callback, false);
                } 
            } else if(this[i].attachEvent){
                for(; i < len; i++){
                    this[i].attachEvent(events, callback);
                } 
            }
        },  

        /* returns the index of matching items, can be used instead 'index method' */
        match: function( arr, el ) {
            var i = 0, 
                len = arr.length;
            for(; i < len; i++) {
                if(arr[i] == el){
                    return i;
                }
            } 
        },

        toggle: function(){
            if(this[0].style.display == 'none' || this[0].style.display == ' '){
                this[0].style.display = 'block';
            } else {
                this[0].style.display = 'none';
            }
            
            return;
        },

        hide: function(){
            this[0].style.display = 'none';
        }               
        

    };

    root.Q = cube;

    return cube;
})(this, _Cube || {});


