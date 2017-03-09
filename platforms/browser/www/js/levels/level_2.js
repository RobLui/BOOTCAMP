var LEVEL_2 = {
    create: function() {
        window.addEventListener("deviceorientation", HandleOrientation, true);
        game.add.image(1, 1, 'bg');
        game.physics.startSystem(Phaser.Physics.ARCADE);

        // LASER
        lasers=game.add.group();
        lasers.enableBody=true;
        lasers.create(400,500,"laser");
        lasers.create(150,155,"laser");
        lasers.callAll('animations.add', 'animations', "blink",[0,1],1,true);
        lasers.callAll('animations.play', 'animations', 'blink');
        game.physics.arcade.enable(lasers);

        // HOLE / LOSING HOLE
        holes=game.add.group();
        holes.enableBody=true;
        holes.create(55,710,"hole");
        holes.create(155,300,"hole");
        holes.create(405,255,"hole");
        holes.create(355,155,"hole");

        // BAL A.K.A. PLAYER
        bal = game.add.sprite(50, 50, "bal");
        game.physics.arcade.enable(bal);
        bal.enableBody=true;
        bal.body.collideWorldBounds = true;

        // HOLE / WINNING HOLE
        winningHole   = game.add.sprite(525,725,"winningHole");
        winningHole.enableBody=true;
        game.physics.arcade.enable(winningHole);
        winningHole.anchor.y=0.5;
        winningHole.anchor.x=0.5;


        // STATES
        currentstate="level2";
        nextState="intro_lvl3";

        // MAP
        map = game.add.tilemap('level2');
        map.addTilesetImage('tileset', 'tileset');
        layer = map.createLayer('Tilelaag 1');
        layer.resizeWorld();
        map.setCollisionBetween(1, 12);

        // CURSORS
        cursors = game.input.keyboard.createCursorKeys();

        //HEALTH
        life=game.add.sprite(220, 0, "harts");

        fixFallthrough();
    },

    // UPDATE
    update: function()
    {
      // TIMER
      TimeChecker();
      // BOUNCE WALLS
      game.physics.arcade.collide(layer, bal);
      // HOLE
      game.physics.arcade.overlap(holes, bal, Holehit, null, this);
      // LASER
      game.physics.arcade.overlap(bal, lasers, Laserhit, null, this);
      // WIN GAME
      game.physics.arcade.overlap(bal, winningHole, Wingame, null, this);

      life.frame = health;
    }
};
