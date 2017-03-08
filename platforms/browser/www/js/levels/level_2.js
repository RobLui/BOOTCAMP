var LEVEL_2 = {
    create: function() {
        window.addEventListener("deviceorientation", HandleOrientation, true);
        game.add.image(1, 1, 'bg');
        game.physics.startSystem(Phaser.Physics.ARCADE);

        // LASER
        laser   = game.add.sprite(400,450,"laser");
        laser.animations.add("blink",[0,1],1,true);
        laser.animations.play("blink");
        laser.enableBody=true;
        game.physics.arcade.enable(laser);

        // HOLE / LOSING HOLE
        holes=game.add.group();
        holes.enableBody=true;
        holes.create(55,710,"hole");
        holes.create(155,300,"hole");
        holes.create(405,250,"hole");

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
        map = game.add.tilemap('level2');
        map.addTilesetImage('tileset', 'tileset');
        layer = map.createLayer('Tilelaag 1');
        layer.resizeWorld();
        map.setCollisionBetween(1, 12);

        // CURSORS
        cursors = game.input.keyboard.createCursorKeys();

        // HEALTH
        healthtext = game.add.text(250, 0, "2", {font: '5em Arial', fill: '#ff0000'});
        healthtext.text = health;
    },

    // UPDATE
    update: function()
    {
      // CURSOR MOVEMENT
      CursorMovement();
      // BOUNCE WALLS
      game.physics.arcade.collide(layer, bal);
      // HOLE
      game.physics.arcade.overlap(holes, bal, Holehit, null, this);
      // LASER
      game.physics.arcade.overlap(bal, laser, Laserhit, null, this);
      // WIN GAME
      game.physics.arcade.overlap(bal, winningHole, Wingame, null, this);
      // TIMER
      TimeChecker();
      // game.physics.arcade.collide(enemy, bal);
    }
};
