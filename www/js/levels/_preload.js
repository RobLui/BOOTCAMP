var PreloadState = {
    preload: function() {
        game.load.image('tileset','assets/tileset.png');
        game.load.image("bal", "assets/bal.png");
        game.load.image('hole','assets/hole.png');
        game.load.image('logo', 'assets/logo.png');
        game.load.image('bg', 'assets/bg.jpg');
        game.load.image('play','assets/play.png');
        game.load.image('what','assets/what.png');
        game.load.image('winningHole','assets/winningHole.png');
        game.load.image('enemy','assets/enemy.png');

        game.load.tilemap('map', 'assets/level1.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.spritesheet("laser","assets/laser.png",50,20,2);
        game.time.advancedTiming.enable = true;
    },
    create: function() {
        game.state.start("menu");
    }
};
