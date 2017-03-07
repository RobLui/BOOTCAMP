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
