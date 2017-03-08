var menuState = {
    create: function() {
      //
      game.add.image(0, 0, 'bg');
      game.add.image(0, 0, 'logo');

      startBtn = game.add.button(game.world.centerX , game.world.centerY+50, 'play', this.start, this);
      startBtn.scale.setTo(0.4,0.4);
      startBtn.anchor.x=0.5;

      instrBtn = game.add.button(game.world.centerX , game.world.centerY+250, 'what', this.instruction, this);
      instrBtn.scale.setTo(0.3,0.3);
      instrBtn.anchor.x=0.5;
    },
    start: function() {
        game.state.start('level1');
    },
    instruction: function() {
        game.state.start('instructions');
    }
};
