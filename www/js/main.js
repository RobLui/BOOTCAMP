var game = new Phaser.Game(600, 800, Phaser.AUTO, "");
var speed = 3;
var map;
var layer;
var health = 3;
var hole;
var timer;

var timeString;
var timeText;
// PRELOAD
var PreloadState = {
    preload: function() {
        game.load.image("bal", "assets/bal.png");
        game.load.image('tileset','assets/tileset.png');
        game.load.image('start','assets/start_button.png');
        game.load.image('instruction','assets/instruction_button.png');
        game.load.image('back','assets/back_button.png');
        game.load.image('hole','assets/hole.png');
        game.load.image('winningHole','assets/winningHole.png');
        game.load.image('enemy','assets/enemy.png');
        game.load.image('bg', 'assets/bg.jpg');
        game.load.tilemap('map', 'assets/level1.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.spritesheet("laser","assets/laser.png",50,20,2);
        game.time.advancedTiming.enable = true;
    },
    create: function() {
        game.state.start("game");
    }
};
// PLAYGAME
var PlayGame = {
  create: function() {
      game.add.image(0, 0, 'bg');
            window.addEventListener("deviceorientation", this.handleOrientation, true);
            game.physics.startSystem(Phaser.Physics.ARCADE);
            // Laser
            laser   = game.add.sprite(250,112.5,"laser");
            laser.animations.add("blink",[0,1],1,true);
            laser.animations.play("blink");
            laser.enableBody=true;
            game.physics.arcade.enable(laser);

            // Hole
            hole   = game.add.sprite(220,375,"hole");
            hole.enableBody=true;
            game.physics.arcade.enable(hole);
            hole.anchor.y=0.5;
            hole.anchor.x=0.5;

            // Enemy
            enemy = game.add.sprite(62.5,275,"enemy");
            enemy.enableBody=true;
            game.physics.arcade.enable(enemy);
            enemy.anchor.y=0.5;
            enemy.anchor.x=0.5;
            tweenEnemy = game.add.tween(enemy).to({y:600 },3000 , Phaser.Easing.Linear.None,true,0,-1,true);

            // Bal
            bal     = game.add.sprite(50, 50, "bal");
            game.physics.arcade.enable(bal);
            bal.enableBody=true;
            bal.body.collideWorldBounds = true;

            // Winning hole
            winningHole   = game.add.sprite(525,725,"winningHole");
            winningHole.enableBody=true;
            game.physics.arcade.enable(winningHole);
            winningHole.anchor.y=0.5;
            winningHole.anchor.x=0.5;

            // Map
            map = game.add.tilemap('map');
            map.addTilesetImage('tileset', 'tileset');
            layer = map.createLayer('Tilelaag 1');
            layer.resizeWorld();
            map.setCollisionBetween(1, 12);

            // Timer
            var style = { fill : "#FFFFFF" };
            timeText = game.add.text(200, 200, timeString, style);

            var timer = game.time.create();
            timer.repeat(1 * Phaser.Timer.SECOND, 7200, this.updateTime, this);
            timer.start();
            // Cursors
            cursors = game.input.keyboard.createCursorKeys();
            //Text
            healthtext = game.add.text(550, 0, "3", {font: '5Em Arial', fill: '#ff0000'});
            healthtext.text=health;
        },
        updateTime: function() {
          var time = new Date();

          var hours = time.getHours();
          var minutes = time.getMinutes();
          var seconds = time.getSeconds();

          if (hours < 10) {
              hours = "0" + hours;
          }
          if (minutes < 10) {
              minutes = "0" + minutes;
          }
          if (seconds < 10) {
              seconds = "0" + seconds;
          }

          timeString = hours + ":" + minutes + ":" + seconds;
          timeText.text = timeString;
      },
        update: function()
        {
          this.cursorMovement();
          // Laser hit
          game.physics.arcade.overlap(bal,laser,this.laserhit,null,this);
          //Bounce to walls
          game.physics.arcade.collide(layer, bal);
          // Hole
          game.physics.arcade.overlap(hole, bal,this.holehit,null,this);
          // Enemy
          game.physics.arcade.overlap(bal, enemy,this.enemyhit,null,this);
          // game.physics.arcade.collide(enemy, bal);
        },
         getCurrentTime: function(){
            var currentdate = new Date();
            time = currentdate.getHours() + ":"  + currentdate.getMinutes() + ":" + currentdate.getSeconds();
            return time;
          },
    handleOrientation: function(e) {
        deltaTime = (game.time.elapsedMS);
        var x = e.gamma;
        var y = e.beta;
        bal.body.velocity.x = x * speed * deltaTime;
        bal.body.velocity.y = y * speed * deltaTime;
    },
    cursorMovement: function(){
      // Cursor movement
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
      bal.body.velocity.x = -100;
    }
    else if (cursors.right.isDown)
    {
      bal.body.velocity.x = +100;
    }
  },
  holehit: function(bal,hole){
    game.state.start('game');
  },
  enemyhit: function(bal,enemy){
    this.decreasehealth();
  },
  laserhit: function(bal,laser){
    if(laser.animations.frame==0)
    {
      this.decreasehealth();
    }
  },
  decreasehealth: function(){
        health--;
        healthtext.text=health;
        if("vibrate" in window.navigator)
        {
            window.navigator.vibrate(100);
        }
  }
};

var menuState = {
    create: function() {
        var nameLabel = game.add.text(game.world.centerX, game.world.centerY-200, "The Supermaze", {font: '5Em Arial', fill: '#ffffff'});
        startBtn = game.add.button(game.world.centerX, game.world.centerY, 'start', this.start, this);
        instrBtn = game.add.button(game.world.centerX, game.world.centerY+200, 'instruction', this.instruction, this);
        game.add.image(0, 0, 'bg');
        nameLabel.anchor.x=0.5;
        startBtn.anchor.x=0.5;
        instrBtn.anchor.x=0.5;
    },
    start: function() {
        game.state.start('game');
    },
    instruction: function() {
        game.state.start('instruction');
    }
};
var instructionState = {
    create: function() {
        var nameLabel = game.add.text(game.world.centerX, game.world.centerY-200, "The Supermaze", {font: '5Em Arial', fill: '#ffffff'});
        var enemy = game.add.text(game.world.centerX, game.world.centerY-100, "Enemy = ", {font: '5Em Arial', fill: '#ffffff'});
        var camera = game.add.text(game.world.centerX, game.world.centerY, "Camera = ", {font: '5Em Arial', fill: '#ffffff'});
        startBtn = game.add.button(game.world.width/3, game.world.centerY+200, 'start', this.start, this);
        backBtn = game.add.button(game.world.width/3*2, game.world.centerY+200, 'back', this.menu, this);
        nameLabel.anchor.x=0.5;
        enemy.anchor.x=0.5;
        camera.anchor.x=0.5;
        startBtn.anchor.x=0.5;
        instrBtn.anchor.x=0.5;
    },
    start: function() {
        game.state.start('game');
    },
    menu: function() {
        game.state.start('menu');
    }
};
// ADD STATES ONTO GAME & START PRELOAD
game.state.add('preload', this.PreloadState);
game.state.add('menu', this.menuState);
game.state.add('instruction', this.instructionState);
game.state.add('game', this.PlayGame);
game.state.start('preload');
