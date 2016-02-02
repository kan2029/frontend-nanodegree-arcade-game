//Enemy class that returns an enemy object
var Enemy = function(locX, locY, speed) {
    this.sprite = 'images/enemy-bug.png';
    this.x = locX;
    this.y = locY;
    this.speed = speed;
};

//All instances of Enemy class will have
//the following methods present inside
//Enemy.prototype

//Method-1: Updates enemy's position based on its speed
//Also handles collision (method-3)
Enemy.prototype.update = function(dt) {
    this.x = this.x + dt*this.speed;
    if(this.x > 500){
        this.x = -100;
    }
    this.handleCollision();
};

// Method-2: Renders the enemy on screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Method-3: Resets player positoin on collision between enemy and player
//Player's winning streak is also reset to 0
Enemy.prototype.handleCollision = function(){
    if(this.y == player.y){
        if(this.x > (player.x -80) && this.x < (player.x + 80) ){
            player.resetPlayer();
            player.streak = 0;
            document.getElementById('streak').innerHTML = player.streak;
        }
    }
}

//Player class with an additional 'streak' member
//streak gets incremented by 1 on successive victories
// Once the player collides, streak resets to 0
var Player = function(locX, locY){
    this.sprite = 'images/char-boy.png';
    this.x = locX;
    this.y = locY;
    this.streak = 0; //additional functionality that shows winning streak
}

//Enemy's render function is shared with all instances of Player
//Separate function not needed
Player.prototype = Object.create(Enemy.prototype); 

//Resets player position on reaching water
Player.prototype.update = function(){
    if(this.y == -10){
        this.resetPlayer();
        this.streak++;
        document.getElementById('streak').innerHTML = this.streak;
    }
};

//Changes player position based on user interaction
//Also limits the player within canvas border
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

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player(200,405);
var allEnemies = [];
var bug1 = new Enemy(0, 73, 110);
var bug2 = new Enemy(0, 156, 50);
var bug3 = new Enemy(0, 239, 175);
allEnemies.push(bug1, bug2, bug3);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});

