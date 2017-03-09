// INTRO STATES
var intro_lvl2State = {
    create: function() {
      game.add.button(0, 0, 'intro_lvl2', this.nextLevel, this);
    },
    nextLevel: function() {
      game.state.start('level2');
    }
};

var intro_lvl3State = {
    create: function() {
      game.add.button(0, 0, 'intro_lvl3', this.nextLevel, this);
    },
    nextLevel: function() {
      game.state.start('level3');
    }
};

var intro_lvl4State = {
    create: function() {
      game.add.button(0, 0, 'intro_lvl4', this.nextLevel, this);
    },
    nextLevel: function() {
      game.state.start('level4');
    }
};

var intro_lvl5State = {
    create: function() {
      game.add.button(0, 0, 'intro_lvl5', this.nextLevel, this);
    },
    nextLevel: function() {
      game.state.start('level5');
    }
};
