var instructionState = {
    create: function() {
        game.add.image(0, 0, 'instructions');

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
