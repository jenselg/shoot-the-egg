var preload = function(game){}

preload.prototype = {

	init: function(){
        this.game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
        this.game.scale.pageAlignHorizontally = true;
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
	},

	preload: function(){
		// ASSETS
		this.game.load.spritesheet('sky', 'assets/plainsky.png', 320, 480);
		this.game.load.spritesheet('bluesky', 'assets/bluesky.png', 320, 480);
		this.game.load.spritesheet('duck', 'assets/flyingduck.png', 64, 64);
		this.game.load.spritesheet('gun', 'assets/doublebarrelshotgun.png', 64, 96);
		this.game.load.spritesheet('shell', 'assets/shotgunshell.png', 32, 64);
		this.game.load.spritesheet('egg', 'assets/egg.png', 32, 32);
		this.game.load.spritesheet('grass', 'assets/plaingrass.png', 320, 120);
		this.game.load.spritesheet('bigegg','assets/bigegg.png', 1024, 1024);
		this.game.load.spritesheet('cookedegg', 'assets/cookedegg.png', 256, 256);


		// SOUND ASSETS
		this.game.load.audio('duckcry', 'assets/duckcry.m4a');
		this.game.load.audio('eggcrack', 'assets/eggcrack.m4a');
		this.game.load.audio('fire', 'assets/fire.m4a');
		this.game.load.audio('reload', 'assets/reload.m4a');
		this.game.load.audio('splat', 'assets/splat.m4a');

		// FONT
		this.game.load.bitmapFont('04b', 'assets/04b-hd.png', 'assets/04b-hd.xml');
		this.game.load.bitmapFont('pixelf', 'assets/font.png', 'assets/font.xml');
		this.game.load.bitmapFont('pixelf-gold', 'assets/font-gold.png', 'assets/font-gold.xml');

		// HIGH SCORE
		if(window.localStorage.getItem('highscore') == null){
			window.localStorage.setItem('highscore', 0);
		}


		// SOUND
        if(window.localStorage.getItem('sound') == null) {
            window.localStorage.setItem('sound', 'on');
            soundText = "Sound ON";
        } else if(window.localStorage.getItem('sound') == 'on') {
            soundText = "Sound ON";
        } else if(window.localStorage.getItem('sound') == 'off') {
            soundText = "Sound OFF";
        } else {
            soundText = "Error!";
            console.log(window.localStorage.getItem('sound'));
        }

	},

	create: function(){
		this.game.state.start('mainscreen');
	}

}