var PreloadState = {
    preload: function() {
        game.time.advancedTiming.enable = true;
        //MENU
        game.load.image('logo', 'assets/logo.png');
        game.load.image('instructions', 'assets/instructions.png');
        game.load.image('play','assets/play.png');
        game.load.image('back','assets/back.png');
        game.load.image('what','assets/what.png');

        //OBJECTS
        game.load.image('bg', 'assets/bg.jpg');
        game.load.image('tileset','assets/tileset.png');
        game.load.image("bal", "assets/bal.png");
        game.load.image('hole','assets/hole.png');
        game.load.image('arrow','assets/arrow.png');    //UNUSED
        game.load.image('winningHole','assets/winningHole.png');
        game.load.image('enemy','assets/enemy.png');
        game.load.spritesheet("harts","assets/life.png",180,50,4);
        game.load.spritesheet("laser","assets/laser.png",50,20,2);

        //CREDITS
        game.load.image('credits', 'assets/credits.png');
        game.load.image('menuBtn','assets/menu_btn.png');

        //LEVEL 1
        game.load.tilemap('level1', 'assets/level1.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('intro_level2', 'assets/intro_lvl2.png');

        //LEVEL 2
        game.load.tilemap('level2', 'assets/level2.json', null, Phaser.Tilemap.TILED_JSON);
        // game.load.image('intro_level2', 'assets/intro_lvl3.png');

        //LEVEL 3
        game.load.tilemap('level3', 'assets/level3.json', null, Phaser.Tilemap.TILED_JSON);

        //LEVEL 4
        game.load.tilemap('level4', 'assets/level4.json', null, Phaser.Tilemap.TILED_JSON);

        //LEVEL 5
        game.load.tilemap('level5', 'assets/level5.json', null, Phaser.Tilemap.TILED_JSON);

    },
    create: function() {
        game.state.start("menu");
    }
};
