var intro_lvl2State = {
    create: function() {
      game.add.button(0, 0, 'intro_lvl2', this.nextLevel, this);
    },
    nextLevel: function() {
      game.state.start('level2');
    }
};
