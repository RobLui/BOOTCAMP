var LEVEL_4 = {
    create: function() {
        window.addEventListener("deviceorientation", HandleOrientation, true);
        game.add.image(1, 1, 'bg');
        game.physics.startSystem(Phaser.Physics.ARCADE);

        // LASER
        lasers=game.add.group();
        lasers.enableBody=true;
        lasers.create(500,305,"laser");
        lasers.create(500,375,"laser");
        lasers.callAll('animations.add', 'animations', "blink",[0,1],1,true);
        lasers.callAll('animations.play', 'animations', 'blink');
        game.physics.arcade.enable(lasers);

        // HOLE / LOSING HOLE
        holes=game.add.group();
        holes.enableBody=true;
        holes.create(305,205,"hole");
        holes.create(355,405,"hole");
        holes.create(355,505,"hole");
        holes.create(105,405,"hole");
        holes.create(455,555,"hole");

        // ACTIVATEWALL
        activator1 = game.add.sprite(205, 205, "activateWall");
        activator1.enableBody=true;
        game.physics.arcade.enable(activator1);
        checkifWallisOpen1=false;

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

        //ENEMY
        enemy1 = game.add.sprite(75, 150, 'enemy');
        walk1 = enemy1.animations.add('walk1');
        enemy1.animations.play('walk1', 30, true);
        game.physics.arcade.enable(enemy1);

        enemy2 = game.add.sprite(400, 300, 'enemy');
        walk2 = enemy2.animations.add('walk2');
        enemy2.animations.play('walk2', 30, true);
        game.physics.arcade.enable(enemy2);

        enemy3 = game.add.sprite(150, 550, 'enemy');
        walk3 = enemy3.animations.add('walk3');
        enemy3.animations.play('walk3', 30, true);
        game.physics.arcade.enable(enemy3);

        // STATES
        currentstate="level4";
        nextState="intro_lvl5";

        // MAP
        map = game.add.tilemap('level4');
        map.addTilesetImage('tileset', 'tileset');
        layer = map.createLayer('Tilelaag 1');
        layer.resizeWorld();
        map.setCollisionBetween(1, 12);

        //WALLS
        movingwall1 = game.add.sprite(150, 700, "movingWall");
        movingwall1.enableBody=true;
        game.physics.arcade.enable(movingwall1);
        movingwall1.body.immovable=true;

        //HEALTH
        life = game.add.sprite(220, 0, "harts");
        fixFallthrough();
    },
    EnemyTween:function()
    {
      if(enemy1.body.position.x <= 200)
          enemy1.body.velocity.x += 5;

      if(enemy1.body.position.x >= 350)
          enemy1.body.velocity.x -= 5;

      if(enemy2.body.position.x <= 150)
          enemy2.body.velocity.x += 5;

      if(enemy2.body.position.x >= 350)
          enemy2.body.velocity.x -= 5;

      if(enemy3.body.position.y >= 540)
          enemy3.body.velocity.y -= 15;

      if(enemy3.body.position.y <= 425)
          enemy3.body.velocity.y += 15;

    },
    // UPDATE
    update: function()
    {
      // TIMECHECKER
      TimeChecker();
      // BOUNCE WALLS
      game.physics.arcade.collide(layer, bal);
      game.physics.arcade.collide(movingwall1, bal);
      game.physics.arcade.collide(movingwall1, layer);
      // HOLE
      game.physics.arcade.overlap(bal, holes, Holehit, null, this);
      //LASER
      game.physics.arcade.overlap(bal, lasers, Laserhit, null, this);
      // WIN GAME
      game.physics.arcade.overlap(bal, winningHole, Wingame, null, this);
      // ENEMY
      game.physics.arcade.overlap(bal, enemy1, Enemyhit, null, this);
      game.physics.arcade.overlap(bal, enemy2, Enemyhit, null, this);
      game.physics.arcade.overlap(bal, enemy3, Enemyhit, null, this);
      game.physics.arcade.collide(enemy1, layer);
      game.physics.arcade.collide(enemy2, layer);
      game.physics.arcade.collide(enemy3, layer);
      game.physics.arcade.overlap(bal,activator1,this.MoveWall1,null,this);
      // HEALTH
      life.frame = health;
      this.EnemyTween();
  },
    MoveWall1: function()
    {
        if(checkifWallisOpen1==false)
        {
            tweenWall = game.add.tween(movingwall1).to({y: 650}, 1000, Phaser.Easing.Linear.None,true, 0,0, false);
            checkifWallisOpen1=true;
        }
    },
};
