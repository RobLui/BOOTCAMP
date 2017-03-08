var LEVEL_1 = {
    create: function() {
        window.addEventListener("deviceorientation", HandleOrientation, true);
        game.add.image(1, 1, 'bg');
        game.physics.startSystem(Phaser.Physics.ARCADE);

        //ARROW
        arrow =  game.add.sprite(450,700,"arrow");

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

        // CURSORS
        //cursors = game.input.keyboard.createCursorKeys();

        // HEALTH
        healthtext = game.add.text(250, 0, "2", {font: '5em Arial', fill: '#ff0000'});
        healthtext.text = health;
    },

    // UPDATE
    update: function()
    {
      // CURSOR MOVEMENT
      //CursorMovement();
      // BOUNCE WALLS
      game.physics.arcade.collide(layer, bal);
      // HOLE
      game.physics.arcade.overlap(hole, bal, Holehit, null, this);
      // LASER
      game.physics.arcade.overlap(bal, laser, Laserhit, null, this);
      // WIN GAME
      game.physics.arcade.overlap(bal, winningHole, Wingame, null, this);
      // ENEMY
      game.physics.arcade.overlap(bal, enemy, Enemyhit, null, this);
      EnemyTween();
      // TIMER
      TimeChecker();
      // game.physics.arcade.collide(enemy, bal);
    }
};
