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
        game.load.image('extralife','assets/extralife.png');
        game.load.spritesheet("harts","assets/life.png",180,50,4);
        game.load.spritesheet("laser","assets/laser.png",50,20,2);

        // EXTRA LIFE - Image has to be changed :)
        game.load.image('extraLife','assets/hole.png');

        //MUSIC
        game.load.audio('win', ['assets/win.wav']);

        //INTROS
        game.load.image("intro_lvl2", "assets/intros/intro_lvl2.png");
        game.load.image("intro_lvl3", "assets/intros/intro_lvl3.png");
        game.load.image("intro_lvl4", "assets/intros/intro_lvl4.png");
        game.load.image("intro_lvl5", "assets/intros/intro_lvl5.png");

        //CREDITS
        game.load.image('credits', 'assets/credits.png');
        game.load.image('menuBtn','assets/menu_btn.png');

        //LEVEL 1
        game.load.tilemap('level1', 'assets/json/level1.json', null, Phaser.Tilemap.TILED_JSON);

        //LEVEL 2
        game.load.tilemap('level2', 'assets/json/level2.json', null, Phaser.Tilemap.TILED_JSON);

        //LEVEL 3
        game.load.tilemap('level3', 'assets/json/level3.json', null, Phaser.Tilemap.TILED_JSON);

        //LEVEL 4
        game.load.tilemap('level4', 'assets/json/level4.json', null, Phaser.Tilemap.TILED_JSON);

        //LEVEL 5
        game.load.tilemap('level5', 'assets/json/level5.json', null, Phaser.Tilemap.TILED_JSON);

    },
    create: function() {
        game.state.start("menu");
    }
};
