var LEVEL_3 = {
    create: function() {
        window.addEventListener("deviceorientation", HandleOrientation, true);
        game.add.image(1, 1, 'bg');
        game.physics.startSystem(Phaser.Physics.ARCADE);

        // LASER
        lasers=game.add.group();
        lasers.enableBody=true;
        lasers.create(250,115,"laser");
        lasers.create(250,315,"laser");
        lasers.create(50,315,"laser");
        lasers.create(50,505,"laser");
        lasers.callAll('animations.add', 'animations', "blink",[0,1],1,true);
        lasers.callAll('animations.play', 'animations', 'blink');
        game.physics.arcade.enable(lasers);

        // HOLE / LOSING HOLE
        holes=game.add.group();
        holes.enableBody=true;
        holes.create(305,55,"hole");
        holes.create(55,155,"hole");
        holes.create(205,355,"hole");

        // ACTIVATEWALL
        activator1 = game.add.sprite(505, 155, "activateWall");
        activator1.enableBody=true;
        game.physics.arcade.enable(activator1);
        checkifWallisOpen1=false;

        activator2 = game.add.sprite(205, 450, "activateWall");
        activator2.enableBody=true;
        game.physics.arcade.enable(activator2);
        checkifWallisOpen2=false;

        // BAL A.K.A. PLAYER
        bal = game.add.sprite(50, 50, "bal");
        game.physics.arcade.enable(bal);
        bal.enableBody=true;
        bal.body.collideWorldBounds = true;

        // HOLE / WINNING HOLE
        winningHole = game.add.sprite(525,725,"winningHole");
        winningHole.enableBody=true;
        game.physics.arcade.enable(winningHole);
        winningHole.anchor.y=0.5;
        winningHole.anchor.x=0.5;

        // STATES
        currentstate="level3";
        nextState="intro_lvl4";

        // MAP
        map = game.add.tilemap('level3');
        map.addTilesetImage('tileset', 'tileset');
        layer = map.createLayer('Tilelaag 1');
        layer.resizeWorld();
        map.setCollisionBetween(1, 12);

        //MOVINGWALL
        movingwall1 = game.add.sprite(400, 250, "movingWall");
        movingwall1.enableBody=true;
        game.physics.arcade.enable(movingwall1);
        movingwall1.body.immovable=true;

        movingwall2 = game.add.sprite(400, 600, "movingWall");
        movingwall2.enableBody=true;
        game.physics.arcade.enable(movingwall2);
        movingwall2.body.immovable=true;
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
      game.physics.arcade.collide(movingwall1, bal);
      game.physics.arcade.collide(movingwall1, layer);
      game.physics.arcade.collide(movingwall2, layer);
      game.physics.arcade.collide(movingwall2, bal);
      // HOLE
      game.physics.arcade.overlap(holes, bal, Holehit, null, this);
      // LASER
      game.physics.arcade.overlap(bal, lasers, Laserhit, null, this);
      // WIN GAME
      game.physics.arcade.overlap(bal, winningHole, Wingame, null, this);
      // HEALTH
      game.physics.arcade.overlap(bal, extraLife, AddLife, null, this);
      // ACTIVATOR
      game.physics.arcade.overlap(bal,activator1,this.MoveWall1,null,this);
      game.physics.arcade.overlap(bal,activator2,this.MoveWall2,null,this);
// console.log()
      life.frame = health;
  },
    MoveWall1: function()
    {
        if(checkifWallisOpen1==false)
        {
            tweenWall = game.add.tween(movingwall1).to({x: 350}, 1000, Phaser.Easing.Linear.None,true, 0,0, false);
            checkifWallisOpen1=true;
        }
    },
    MoveWall2: function()
    {
        if(checkifWallisOpen2==false)
        {
            tweenWall = game.add.tween(movingwall2).to({x: 500}, 1000, Phaser.Easing.Linear.None,true, 0,0, false);
            checkifWallisOpen2=true;
        }
    }
};
