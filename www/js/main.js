var game = new Phaser.Game(600, 800, Phaser.CANVAS, "");

// ------------------------------------------------------ GLOBALS ------------------------------------------------------

// HEALTH
var health = 3;
var maxHealth = 3;
var extraLife;
var death = 0;

// TIME
var currentTime;
var nextTime;
var elapsedTime;
var waitingTime = 0.5; // In seconde
var lastEventTrackedTime = 0;

// STATES
var currentstate = "";
var nextState = "";

var map;
var hole;
var layer;

var speed = 15;

// ------------------------------------------------------ FUNCTIONS ------------------------------------------------------

function fixFallthrough() {
    game.physics.arcade.TILE_BIAS = 40;
}

// DEVICE ORIENTATION
function HandleOrientation(e) {
    bal.body.velocity.x = e.gamma * speed;
    bal.body.velocity.y = e.beta * speed;
}

// UPDATE TIME
function TimeChecker() {
    var currentTime = game.time.time;
    elapsedTime = game.time.elapsedSecondsSince(lastEventTrackedTime);
}

// DECREASE HEALTH
function Decreasehealth() {
    if (elapsedTime > waitingTime) {
        health--;
        if (health == death) {
            health = maxHealth;
            game.state.start(currentstate);
        }
        if (game.device.vibration) {
            window.navigator.vibrate(500);
        }
    }
}

// ENEMYHIT
function Enemyhit(bal, enemy) {
    Decreasehealth();
    lastEventTrackedTime = game.time.time;
}

// LASERHIT
function Laserhit(bal, laser) {
    if (laser.animations.frame == 0) {
        Decreasehealth();
        lastEventTrackedTime = game.time.time;
    }
}

// WINGAME
function Wingame(bal, winningHole) {
    music = game.add.audio('win');
    music.play();
    health = maxHealth;
    game.state.start(nextState);
}

// HOLEHIT
function Holehit(bal, hole) {
    health = maxHealth;
    game.state.start(currentstate);
}

// EXTRA LIFE
function AddLife(bal, extraLife) {
    if (elapsedTime > waitingTime && health < 3) {
        health += 1;
        lastEventTrackedTime = game.time.time;
    }
    extraLife.kill();
}

// ENEMYTWEEN & HEALTH
function EnemyTween() {
    game.physics.arcade.collide(enemy, layer);
    if (game.physics.arcade.collide(enemy, bal))
        this.Decreasehealth();

    if (enemy.body.position.y <= 262.5)
        enemy.body.velocity.y += 50;

    if (enemy.body.position.y >= 600)
        enemy.body.velocity.y -= 50;
}
// ------------------------------------------------------ STATES ------------------------------------------------------

// CORE STATES
game.state.add('preload', this.PreloadState);
game.state.add('menu', this.menuState);
game.state.add('instructions', this.instructionState);
game.state.add('finished', this.finishedState);

// LEVELS
game.state.add('level1', this.LEVEL_1);
game.state.add('level2', this.LEVEL_2);
game.state.add('level3', this.LEVEL_3);
game.state.add('level4', this.LEVEL_4);
game.state.add('level5', this.LEVEL_5);

// INTROS
game.state.add('intro_lvl2', this.intro_lvl2State);
game.state.add('intro_lvl3', this.intro_lvl3State);
game.state.add('intro_lvl4', this.intro_lvl4State);
game.state.add('intro_lvl5', this.intro_lvl5State);

// START
game.state.start('preload');
