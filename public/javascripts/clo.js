var player = function() {
    var YTPlayer = 1;
console.log(YTPlayer);
};


player.prototype.a = function() {
    console.log('function A');
};

player.prototype.b = function() {
    console.log('function B');    
};




var p = new player();

console.log(p.a());