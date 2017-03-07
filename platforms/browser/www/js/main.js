var game = new Phaser.Game(600, 800, Phaser.AUTO, "");
var speed = 3;
var map;
var layer;
var health = 3;
var hole;
var timer;
var style;
var elapsed_sec = 1000;
var timeText;
var time;
var timeString;

// PRELOAD
var PreloadState = {
    preload: function() {
        game.load.image('tileset','assets/tileset.png');
        game.load.image("bal", "assets/bal.png");
        game.load.image('back','assets/back_button.png');
        game.load.image('hole','assets/hole.png');
        game.load.image('logo', 'assets/logo.png');
        game.load.image('bg', 'assets/bg.jpg');
        game.load.image('play','assets/play.png');
        game.load.image('what','assets/what.png');
        game.load.image('winningHole','assets/winningHole.png');
        game.load.image('enemy','assets/enemy.png');

        game.load.tilemap('map', 'assets/level1.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.spritesheet("laser","assets/laser.png",50,20,2);
        game.time.advancedTiming.enable = true;
    },
    create: function() {
        game.state.start("menu");
    }
};
// PLAYGAME
var PlayGame = {
    create: function() {
        window.addEventListener("deviceorientation", this.handleOrientation, true);
        game.add.image(1, 1, 'bg');
        game.physics.startSystem(Phaser.Physics.ARCADE);

        // LASER
        laser   = game.add.sprite(250,112.5,"laser");
        laser.animations.add("blink",[0,1],1,true);
        laser.animations.play("blink");
        laser.enableBody=true;
        game.physics.arcade.enable(laser);

        // HOLE / LOSING HOLE
        hole   = game.add.sprite(220,375,"hole");
        hole.enableBody=true;
        game.physics.arcade.enable(hole);
        hole.anchor.y=0.5;
        hole.anchor.x=0.5;

        // ENEMY
        enemy = game.add.sprite(62.5,275,"enemy");
        enemy.enableBody=true;
        game.physics.arcade.enable(enemy);
        enemy.anchor.y=0.5;
        enemy.anchor.x=0.5;
        enemy.body.mass=10;

        // BAL A.K.A. PLAYER
        bal     = game.add.sprite(50, 50, "bal");
        game.physics.arcade.enable(bal);
        bal.enableBody=true;
        bal.body.collideWorldBounds = true;

        // HOLE / WINNING HOLE
        winningHole   = game.add.sprite(525,725,"winningHole");
        winningHole.enableBody=true;
        game.physics.arcade.enable(winningHole);
        winningHole.anchor.y=0.5;
        winningHole.anchor.x=0.5;

        // MAP
        map = game.add.tilemap('map');
        map.addTilesetImage('tileset', 'tileset');
        layer = map.createLayer('Tilelaag 1');
        layer.resizeWorld();
        map.setCollisionBetween(1, 12);

        // TIMER
        style = { fill : "#FFFFFF" };
        timeText = game.add.text(200, 200, timeString, style);
        timer = game.time.create();
        timer.repeat(1 * Phaser.Timer.SECOND, 7200, this.updateTime, this);
        timer.start();

        // CURSORS
        cursors = game.input.keyboard.createCursorKeys();

        // HEALTH
        healthtext = game.add.text(550, 0, "3", {font: '5Em Arial', fill: '#ff0000'});
        healthtext.text = health;
    },

    // UPDATE
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

      // UPDATE TIME
      updateTime: function()
      {
        time = new Date();
        // var hours = time.getHours();
        // var minutes = time.getMinutes();
        var sec = time.getSeconds();
        var ms = time.getMilliseconds();
        timeString =   sec - ms;
        timeText.text = timeString;
      },

      // DEVICE ORIENTATION
      handleOrientation: function(e)
      {
        deltaTime = (game.time.elapsedMS);
        var x = e.gamma;
        var y = e.beta;
        bal.body.velocity.x = x * speed * deltaTime;
        bal.body.velocity.y = y * speed * deltaTime;
      },
      // CURSOS MOVEMENT
      cursorMovement: function()
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
      },
      holehit: function(bal,hole){
        healthtext.text = health;
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
      wingame: function(){
        game.state.start('game');
      },
      decreasehealth: function(){
        health--;
        healthtext.text=health;
        if("vibrate" in window.navigator)
        {
            window.navigator.vibrate(100);
        }
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
        game.physics.arcade.overlap(hole, enemy,this.enemyhit,null,this);
        this.EnemyTween();
        game.physics.arcade.collide(enemy, layer);
        if(game.physics.arcade.collide(enemy, bal))
        {
            this.decreasehealth();
        }
    },
EnemyTween: function()
{
    if(enemy.body.position.y <= 262.5)
    {
        enemy.body.velocity.y += 50;
    }
    if(enemy.body.position.y >= 600)
    {
        enemy.body.velocity.y -= 50;
    }
}
};

var menuState = {
    create: function() {
      //
      game.add.image(0, 0, 'bg');
      game.add.image(0, 0, 'logo');

      startBtn = game.add.button(game.world.centerX , game.world.centerY+50, 'play', this.start, this);
      startBtn.scale.setTo(0.4,0.4);
      startBtn.anchor.x=0.5;

      instrBtn = game.add.button(game.world.centerX , game.world.centerY+250, 'what', this.instruction, this);
      instrBtn.scale.setTo(0.3,0.3);
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
        nameLabel.anchor.x=0.5;
        var enemyLabel = game.add.text(game.world.centerX, game.world.centerY-100, "Enemy = ", {font: '5Em Arial', fill: '#ffffff'});
        enemyLabel.anchor.x=0.5;
        var cameraLabel = game.add.text(game.world.centerX, game.world.centerY, "Camera = ", {font: '5Em Arial', fill: '#ffffff'});
        cameraLabel.anchor.x=0.5;
        startBtn = game.add.button(game.world.width/3, game.world.centerY+200, 'start', this.start, this);
        startBtn.anchor.x=0.5;
        backBtn = game.add.button(game.world.width/6, game.world.centerY+200, 'back', this.menu, this);
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
