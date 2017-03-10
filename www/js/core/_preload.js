var PreloadState = {
    preload: function() {
        game.time.advancedTiming.enable = true;

        game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        game.scale.parentIsWindow = true;
        game.scale.refresh();

        //MENU
        game.load.image('logo', 'assets/logo/logo.png');
        game.load.image('instructions', 'assets/menu/instructions.png');
        game.load.image('play', 'assets/menu/play.png');
        game.load.image('back', 'assets/menu/back.png');
        game.load.image('what', 'assets/menu/what.png');

        //CREDITS
        game.load.image('credits', 'assets/menu/credits.png');
        game.load.image('menuBtn', 'assets/menu/menu_btn.png');

        //OBJECTS
        game.load.image('bg', 'assets/game/bg.jpg');
        game.load.image('tileset', 'assets/game/tileset.png');
        game.load.image("bal", "assets/game/bal.png");
        game.load.image('hole', 'assets/game/hole.png');
        game.load.image('winningHole', 'assets/game/winningHole.png');
        game.load.image('activateWall', 'assets/game/activateWall.png');
        game.load.image('movingWall', 'assets/game/movingWall.png');
        game.load.spritesheet('enemy', 'assets/game/enemySpritesheet.png', 50, 50, 32);
        game.load.image('extraLife', 'assets/game/extralife.png');
        game.load.spritesheet("harts", "assets/game/life.png", 180, 50, 4);
        game.load.spritesheet("laser", "assets/game/laser.png", 50, 20, 2);
        game.load.spritesheet("laserv", "assets/game/laserv.png", 18, 50, 2);

        //MUSIC
        game.load.audio('win', ['assets/music/win.wav']);

        //INTROS
        game.load.image("intro_lvl2", "assets/intros/intro_lvl2.png");
        game.load.image("intro_lvl3", "assets/intros/intro_lvl3.png");
        game.load.image("intro_lvl4", "assets/intros/intro_lvl4.png");
        game.load.image("intro_lvl5", "assets/intros/intro_lvl5.png");

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
