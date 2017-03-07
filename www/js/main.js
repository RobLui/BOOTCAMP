var game = new Phaser.Game(600, 800, Phaser.AUTO, "");
var speed = 3;
var map;
var layer;
var health = 3;
var hole;
// PRELOAD
var PreloadState = {
    preload: function() {
        game.load.image("bal", "assets/bal.png");
        game.load.image('tileset','assets/tileset.png');
        game.load.image('start','assets/start_button.png');
        game.load.image('instruction','assets/instruction_button.png');
        game.load.image('back','assets/back_button.png');
        game.load.image('hole','assets/hole.png');
        game.load.spritesheet("laser","assets/laser.png",50,20,2);
        game.load.tilemap('map', 'assets/level1.json', null, Phaser.Tilemap.TILED_JSON);
        game.stage.backgroundColor = '#0ad100';
        game.time.advancedTiming.enable = true;
    },
    create: function() {
        game.state.start("game");
    }
};
// PLAYGAME
var PlayGame = {
    create: function() {
            window.addEventListener("deviceorientation", this.handleOrientation, true);
            game.physics.startSystem(Phaser.Physics.ARCADE);
            // Laser
            laser   = game.add.sprite(250,112.5,"laser");
            laser.animations.add("blink",[0,1],1,true);
            laser.animations.play("blink");
            laser.enableBody=true;
            game.physics.arcade.enable(laser);
            // Bal
            bal     = game.add.sprite(50, 50, "bal");
            game.physics.arcade.enable(bal);
            bal.enableBody=true;
            bal.body.collideWorldBounds = true;
            // Hole
            hole   = game.add.sprite(250,100,"hole");
            hole.enableBody=true;
            game.physics.arcade.enable(hole);
            hole.anchor.y=0.5;
            hole.anchor.x=0.5;
            // Map
            map = game.add.tilemap('map');
            map.addTilesetImage('tileset', 'tileset');
            layer = map.createLayer('Tilelaag 1');
            layer.resizeWorld();
            map.setCollisionBetween(1, 12);
            // Cursors
            cursors = game.input.keyboard.createCursorKeys();
            //Text
            healthtext = game.add.text(550, 0, "3", {font: '5Em Arial', fill: '#ff0000'});
            healthtext.text=health;
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
  laserhit: function(bal,laser){
    if(laser.animations.frame==1)
    {
      this.decreasehealth();
    }
  },
  decreasehealth: function(){
        health--;
        healthtext.text=health;
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
  }
};

var menuState = {
    create: function() {
        var nameLabel = game.add.text(game.world.centerX, game.world.centerY-200, "The Supermaze", {font: '5Em Arial', fill: '#ffffff'});
        startBtn = game.add.button(game.world.centerX, game.world.centerY, 'start', this.start, this);
        instrBtn = game.add.button(game.world.centerX, game.world.centerY+200, 'instruction', this.instruction, this);

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
