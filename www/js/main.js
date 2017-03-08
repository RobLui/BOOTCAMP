var game = new Phaser.Game(600, 800, Phaser.CANVAS, "");

// ------------------------------------------------------ GLOBALS ------------------------------------------------------
var speed = 15;
var health = 3;

var map;
var layer;
var hole;

var style;
var timeText;
var time;
var timer;
var timeString;

var fpsString;
var fpsText;

var currentTime;
var nextTime;

var elapsedTime;
var waitingTime = 1; // In seconde
var death = 0;
var lastEventTrackedTime = 0;

var currentstate="";
var nextState = "";

// ------------------------------------------------------ FUNCTIONS ------------------------------------------------------

// DEVICE ORIENTATION
function HandleOrientation(e)
{
  bal.body.velocity.x = e.gamma * speed;
  bal.body.velocity.y =  e.beta * speed;
}

// UPDATE TIME
function TimeChecker()
{
  var currentTime = game.time.time;
  elapsedTime = game.time.elapsedSecondsSince(lastEventTrackedTime);
  // console.log(elapsedTime);
}

// DECREASE HEALTH
function Decreasehealth(){
  if (elapsedTime > waitingTime ) {
    health--;
    if (health == death) {
      health = 3;
      game.state.start(currentstate);
    }
  }
  healthtext.text = health;
  navigator.vibrate(1000);
}

// ENEMYHIT
function Enemyhit(bal,enemy)
{
  if (TimeChecker() > waitingTime )
  {
    Decreasehealth();
  }
  lastEventTrackedTime = game.time.time;
}

// LASERHIT
function Laserhit(bal,laser)
{
  if(laser.animations.frame==0)
  {
      Decreasehealth();
      //Elapsed time (seconds) since the last event tracked
      lastEventTrackedTime = game.time.time;
  }
}

// WINGAME
function Wingame()
{
  game.state.start(nextState);
}

// HOLEHIT
function Holehit(bal,hole)
{
  health = 3;
  game.state.start(currentstate);
  healthtext.text = health;
}

// ENEMYTWEEN & HEALTH
function EnemyTween()
{
  game.physics.arcade.collide(enemy, layer);
  if(game.physics.arcade.collide(enemy, bal))
      this.Decreasehealth();

  if(enemy.body.position.y <= 262.5)
    enemy.body.velocity.y += 50;

  if(enemy.body.position.y >= 600)
    enemy.body.velocity.y -= 50;
}

// CURSOR MOVEMENT
function CursorMovement()
{
  if (cursors.up.isDown)
  {
    bal.body.velocity.y = -300;
  }
  else if (cursors.down.isDown)
  {
    bal.body.velocity.y = +300;
  }
  else if (cursors.left.isDown)
  {
    bal.body.velocity.x = -300;
  }
  else if (cursors.right.isDown)
  {
    bal.body.velocity.x = +300;
  }
}

// ------------------------------------------------------ ADDING STATES ------------------------------------------------------
game.state.add('preload', this.PreloadState );
game.state.add('level1', this.LEVEL_1);
game.state.add('level2', this.LEVEL_2);
game.state.add('menu', this.menuState);
game.state.add('instructions', this.instructionState);

game.state.start('preload');
