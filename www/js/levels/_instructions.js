var instructionState = {
    create: function() {
        game.add.image(0, 0, 'instructions');

        /*
        var playerLabel = game.add.text(game.world.centerX, game.world.centerY, "Player = ", {font: '3em Arial', fill: '#ffffff'});
        playerLabel.anchor.x=1;
        playerLabel.anchor.y=0.1;
        game.add.image(game.world.centerX, game.world.centerY, 'bal');

        var enemyLabel = game.add.text(game.world.centerX, game.world.centerY+40, "Enemy = ", {font: '3em Arial', fill: '#ffffff'});
        enemyLabel.anchor.x=1;
        enemyLabel.anchor.y=0.1;
        game.add.image(game.world.centerX, game.world.centerY+40, 'enemy');

        var cameraLabel = game.add.text(game.world.centerX, game.world.centerY+80, "Camera = ", {font: '3em Arial', fill: '#ffffff'});
        cameraLabel.anchor.x=1;
        cameraLabel.anchor.y=0.1;
        game.add.image(game.world.centerX, game.world.centerY+80, 'camera');

        var laserLabel = game.add.text(game.world.centerX, game.world.centerY+120, "Laser = ", {font: '3em Arial', fill: '#ffffff'});
        laserLabel.anchor.x=1;
        laserLabel.anchor.y=0.1;
        laser = game.add.sprite(game.world.centerX, game.world.centerY+125,"laser");
        laser.animations.add("blink",[0,1],4,true);
        laser.animations.play("blink");

        var holeLabel = game.add.text(game.world.centerX, game.world.centerY+160, "Label = ", {font: '3em Arial', fill: '#ffffff'});
        holeLabel.anchor.x=1;
        holeLabel.anchor.y=0.1;
        game.add.image(game.world.centerX, game.world.centerY+150, 'hole');

        var finishLabel = game.add.text(game.world.centerX, game.world.centerY+210, "Finish = ", {font: '3em Arial', fill: '#ffffff'});
        finishLabel.anchor.x=1;
        finishLabel.anchor.y=0.1;
        finish = game.add.image(game.world.centerX, game.world.centerY+200, 'winningHole');
        game.add.image(game.world.centerX, game.world.centerY+200, 'arrow');
        finish.anchor.x=-0.5;
        */

        startBtn = game.add.button(game.world.width/5*4, game.world.centerY+300, 'play', this.start, this);
        startBtn.anchor.x=0.5;
        startBtn.anchor.y=0.5;
        startBtn.scale.setTo(0.3,0.3);
        backBtn = game.add.button(game.world.width/5, game.world.centerY+300, 'back', this.menu, this);
        backBtn.anchor.x=0.5;
        backBtn.anchor.y=0.5;
        backBtn.scale.setTo(0.3,0.3);
    },
    start: function() {
        game.state.start('level1');
    },
    menu: function() {
        game.state.start('menu');
    }
};
