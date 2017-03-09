var LEVEL_5 = {
    create: function() {
        window.addEventListener("deviceorientation", HandleOrientation, true);
        game.add.image(1, 1, 'bg');
        game.physics.startSystem(Phaser.Physics.ARCADE);

        // LASER
        lasers=game.add.group();
        lasers.enableBody=true;
        lasers.create(500,115,"laser");
        lasers.create(500,215,"laser");
        lasers.create(300,215,"laser");
        lasers.create(200,415,"laser");
        lasers.create(200,615,"laser");

        lasers.callAll('animations.add', 'animations', "blink",[0,1],1,true);
        lasers.callAll('animations.play', 'animations', 'blink');
        game.physics.arcade.enable(lasers);

        // HOLE / LOSING HOLE
        holes=game.add.group();
        holes.enableBody=true;
        holes.create(455,155,"hole");
        holes.create(355,155,"hole");
        holes.create(55,455,"hole");
        holes.create(55,505,"hole");
        holes.create(55,705,"hole");
        holes.create(105,605,"hole");
        holes.create(305,455,"hole");

        // ACTIVATEWALL
        activator1 = game.add.sprite(55, 305, "activateWall");
        activator1.enableBody=true;
        game.physics.arcade.enable(activator1);
        checkifWallisOpen1=false;

        activator2 = game.add.sprite(505, 355, "activateWall");
        activator2.enableBody=true;
        game.physics.arcade.enable(activator2);
        checkifWallisOpen2=false;

        //ENEMY
        enemy1 = game.add.sprite(250, 250, 'enemy');
        walk1 = enemy1.animations.add('walk1');
        enemy1.animations.play('walk1', 30, true);
        game.physics.arcade.enable(enemy1);

        enemy2 = game.add.sprite(150, 50, 'enemy');
        walk2 = enemy2.animations.add('walk2');
        enemy2.animations.play('walk2', 30, true);
        game.physics.arcade.enable(enemy2);

        enemy3 = game.add.sprite(500, 500, 'enemy');
        walk3 = enemy3.animations.add('walk3');
        enemy3.animations.play('walk3', 30, true);
        game.physics.arcade.enable(enemy3);

        // EXTRA LIFE
        extraLife = game.add.sprite(305,510,"extraLife");
        game.physics.arcade.enable(extraLife);
        extraLife.enableBody=true;

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
        currentstate="level5";
        nextState="finished";

        // MAP
        map = game.add.tilemap('level5');
        map.addTilesetImage('tileset', 'tileset');
        layer = map.createLayer('Tilelaag 1');
        layer.resizeWorld();
        map.setCollisionBetween(1, 12);

        cursors = game.input.keyboard.createCursorKeys();

        //WALLS
        movingwall1 = game.add.sprite(300, 650, "movingWall");
        movingwall1.enableBody=true;
        game.physics.arcade.enable(movingwall1);
        movingwall1.body.immovable=true;

        movingwall2 = game.add.sprite(400, 650, "movingWall");
        movingwall2.enableBody=true;
        game.physics.arcade.enable(movingwall2);
        movingwall2.body.immovable=true;

        fixFallthrough();
        //HEALTH
        life=game.add.sprite(220, 0, "harts");
    },
    EnemyTween:function()
    {
      if(enemy1.body.position.x <= 250)
          enemy1.body.velocity.x += 100;

      if(enemy1.body.position.x >= 490)
         enemy1.body.velocity.x -= 5;

      if(enemy2.body.position.y <= 100)
          enemy2.body.velocity.y += 10;

      if(enemy2.body.position.y >= 150)
          enemy2.body.velocity.y -= 10;

      if(enemy3.body.position.x >= 500)
          enemy3.body.velocity.x -= 200;

      if(enemy3.body.position.x <= 400)
          enemy3.body.velocity.x += 200;

    },
    // UPDATE
    update: function()
    {
      CursorMovement();
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
      life.frame = health;
      // ENEMY
      game.physics.arcade.overlap(bal, enemy1, Enemyhit, null, this);
      game.physics.arcade.overlap(bal, enemy2, Enemyhit, null, this);
      game.physics.arcade.overlap(bal, enemy3, Enemyhit, null, this);

      game.physics.arcade.overlap(bal,activator1,this.MoveWall1,null,this);
      game.physics.arcade.overlap(bal,activator2,this.MoveWall2,null,this);
      this.EnemyTween();
    },


    MoveWall1: function()
    {
        if(checkifWallisOpen1==false)
        {
            tweenWall = game.add.tween(movingwall1).to({y: 700}, 1000, Phaser.Easing.Linear.None,true, 0,0, false);
            checkifWallisOpen1=true;
        }
    },
    MoveWall2: function()
    {
        if(checkifWallisOpen2==false)
        {
            tweenWall = game.add.tween(movingwall2).to({y: 700}, 1000, Phaser.Easing.Linear.None,true, 0,0, false);
            checkifWallisOpen2=true;
        }
    }
};
