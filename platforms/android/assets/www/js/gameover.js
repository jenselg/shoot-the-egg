var gameover = function(game){}

gameover.prototype = {

	create: function(){
		this.game.add.sprite(0, 0, 'bluesky');
		cookedEgg = this.game.add.sprite(this.game.world.centerX, 98, 'cookedegg');
		cookedEgg.anchor.set(0.5);
		cookedEgg.scale.setTo(0.5, 0.5);

                headerText = this.game.add.bitmapText(
                	this.game.world.centerX,
                	200,
                	'pixelf',
                	'AW, SNAP!',
                	50
                );
                headerText.anchor.setTo(0.5, 0.5);

                scoreHeaderText = this.game.add.bitmapText(
                	this.game.world.centerX,
                	245,
                	'pixelf-gold',
                	'YOUR SCORE:',
                	35
                );
                scoreHeaderText.anchor.setTo(0.5, 0.5);
                scoreCountText = this.game.add.bitmapText(
                	this.game.world.centerX,
                	330,
                	'pixelf',
                	"" + score,
                	80
                );
                scoreCountText.anchor.setTo(0.5, 0.5);

                playText = this.game.add.bitmapText(
                	this.game.world.centerX,
                	415,
                	'pixelf-gold',
                	'RETRY!',
                	40
                );
                playText.anchor.setTo(0.5, 0.5);
                playText.inputEnabled = true;
                playText.events.onInputDown.add(this.retryGame, this);

                mainMenuText = this.game.add.bitmapText(
                	this.game.world.centerX,
                	450,
                	'pixelf',
                	'MAIN MENU',
                	30
                );
                mainMenuText.anchor.setTo(0.5, 0.5);
                mainMenuText.inputEnabled = true;
                mainMenuText.events.onInputDown.add(this.mainMenu, this);

                // SCORE LOGIC
                if(score > window.localStorage.getItem('highscore')){
                	window.localStorage.setItem('highscore', score);
                }
                if(AdMob && Math.random()*100 < 10 && device.platform != 'browser') {
                    AdMob.showInterstitial();
                }

	},

	retryGame: function(){
		this.game.state.start('startgame');
	},
	mainMenu: function(){
		this.game.state.start('mainscreen');
	}

}