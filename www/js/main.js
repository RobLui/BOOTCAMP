var game = new Phaser.Game(600, 800, Phaser.AUTO, "");

// ------------------------------------------------------ GLOBALS ------------------------------------------------------
var speed = 3;
var health = 3;

var map;
var layer;
var hole;

var style;
var timeText;
var time;
var timer;
var timeString;

// ------------------------------------------------------ FUNCTIONS ------------------------------------------------------

// DEVICE ORIENTATION
function HandleOrientation(e)
{
  deltaTime = (game.time.elapsedMS);
  var x = e.gamma;
  var y = e.beta;
  bal.body.velocity.x = x * speed * deltaTime;
  bal.body.velocity.y = y * speed * deltaTime;
}

// UPDATE TIME
function UpdateTime()
{
  time = new Date();
  // var hours = time.getHours();
  // var minutes = time.getMinutes();
  var sec = time.getSeconds();
  var ms = time.getMilliseconds();
  timeString =   sec - ms;
  timeText.text = timeString;
  return timeString;
}

// DECREASE HEALTH
function Decreasehealth(){
  health--;
  healthtext.text=health;
  if("vibrate" in window.navigator)
  {
      window.navigator.vibrate(100);
  }
}

// ENEMYHIT
function Enemyhit(bal,enemy)
{
  Decreasehealth();
}

// LASERHIT
function Laserhit(bal,laser)
{
  if(laser.animations.frame==0)
    Decreasehealth();
}

// WINGAME
function Wingame()
{
  game.state.start('game');
}

// HOLEHIT
function Holehit(bal,hole)
{
  healthtext.text = health;
  game.state.start('game');
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
game.state.add('game', this.LEVEL_1);
game.state.add('menu', this.menuState);
game.state.add('instructions', this.instructionState);

game.state.start('preload');
