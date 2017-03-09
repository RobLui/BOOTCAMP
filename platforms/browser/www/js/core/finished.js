var finishedState = {
    create: function() {
        game.add.image(0, 0, 'credits');

        backBtn = game.add.button(game.world.centerX, game.world.centerY+300, 'menuBtn', this.menu, this);
        backBtn.anchor.x=0.5;
        backBtn.anchor.y=0.5;
        backBtn.scale.setTo(0.3,0.3);
    },
    menu: function() {
        game.state.start('menu');
    }
};
