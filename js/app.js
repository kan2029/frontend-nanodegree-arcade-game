/**
  * @desc This file contains pseudoclassical classes that are required for the game to function
  * @author Karanbir Kajal
*/

/**
  * @desc Enemy class that returns an enemy object
  * @param Number locX - x axis position parameter of canvas
  * @param Number locY - y axis position parameter of canvas
  * @param Number speed - the speed by which an enemy bug moves
  * @return object - an enemy bug
*/
var Enemy = function(locX, locY, speed) {
    this.sprite = 'images/enemy-bug.png';
    this.x = locX;
    this.y = locY;
    this.speed = speed;
};

//Updates enemy's position based on its speed and handles collision of player with enemy bug
Enemy.prototype.update = function(dt) {
    this.x = this.x + dt*this.speed;
    if(this.x > 500){
        this.x = -100;
    }
    this.handleCollision();
};

//Renders the enemy on screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Resets player positoin on collision with enemy and sets player's winning streak to 0
Enemy.prototype.handleCollision = function(){
    if(this.y == player.y){
        if(this.x > (player.x -80) && this.x < (player.x + 80) ){
            player.resetPlayer();
            player.streak = 0;
            document.getElementById('streak').innerHTML = player.streak;
        }
    }
};

/**
  * @desc Player class that returns a player object
  * @param Number locX - x axis position parameter of canvas
  * @param Number locY - y axis position parameter of canvas
  * @return object - aplayer
*/
var Player = function(locX, locY){
    this.sprite = 'images/char-boy.png';
    this.x = locX;
    this.y = locY;
    this.streak = 0;
};

//Enemy's render function is shared with all instances of Player. Separate function not needed
Player.prototype = Object.create(Enemy.prototype); 

//Resets player position on reaching water body
Player.prototype.update = function(){
    if(this.y == -10){
        this.resetPlayer();
        this.streak++;
        document.getElementById('streak').innerHTML = this.streak;
    }
};

//Changes player position based on user interaction and limits the player within canvas border
Player.prototype.handleInput = function(key){
    switch(key){
        case 'up': 
            if(this.y != -10){
                this.y = this.y - 83;    
            }
            break;
        case 'down':
            if(this.y != 405){
                this.y = this.y + 83;    
            } 
            break;    
        case 'right': 
                if(this.x != 400){
                    this.x = this.x + 100;
                }    
            break; 
        case 'left':
                if(this.x != 0){
                    this.x = this.x - 100;
                }
            break;        
    }
};

//Brings player back to starting point
Player.prototype.resetPlayer = function(){
    this.x = 200;
    this.y = 405;
};

//A method to change player character
Player.prototype.change = function(thisObj){
    this.sprite = $(thisObj).attr('src');
};


var player = new Player(200,405);
var allEnemies = [];
var bug1 = new Enemy(0, 73, 110);
var bug2 = new Enemy(0, 156, 50);
var bug3 = new Enemy(0, 239, 175);
allEnemies.push(bug1, bug2, bug3);

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});

