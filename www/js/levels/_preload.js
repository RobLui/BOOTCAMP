var PreloadState = {
    preload: function() {
        game.load.image('tileset','assets/tileset.png');
        game.load.image("bal", "assets/bal.png");
        game.load.image('hole','assets/hole.png');
        game.load.image('logo', 'assets/logo.png');
        game.load.image('instructions', 'assets/instructions.png');
        game.load.image('bg', 'assets/bg.jpg');
        game.load.image('play','assets/play.png');
        game.load.image('back','assets/back.png');
        game.load.image('arrow','assets/arrow.png');
        game.load.image('what','assets/what.png');
        game.load.image('winningHole','assets/winningHole.png');
        game.load.image('enemy','assets/enemy.png');

        game.load.tilemap('level1', 'assets/level2.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.tilemap('level2', 'assets/level1.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.spritesheet("laser","assets/laser.png",50,20,2);
        game.time.advancedTiming.enable = true;
    },
    create: function() {
        game.state.start("menu");
    }
};
