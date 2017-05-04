var highscore = function(game){}

highscore.prototype = {

	create: function(){

		this.game.add.sprite(0, 0, 'bluesky');
                shell1 = this.game.add.sprite(this.game.world.centerX-32, 108, 'shell');
                shell1.anchor.setTo(0.5, 0.5);
                shell2 = this.game.add.sprite(this.game.world.centerX, 108, 'shell');
                shell2.anchor.setTo(0.5, 0.5);
                shell3 = this.game.add.sprite(this.game.world.centerX+32, 108, 'shell');
                shell3.anchor.setTo(0.5, 0.5);

        highScoreHeaderText = this.game.add.bitmapText(
        	this.game.world.centerX,
        	180,
        	'pixelf-gold',
        	'HIGH SCORE',
        	40
        );
        highScoreHeaderText.anchor.setTo(0.5, 0.5);


	var score = window.localStorage.getItem('highscore')
        highScoreText = this.game.add.bitmapText(
        	this.game.world.centerX,
        	250,
        	'pixelf',
        	score,
        	80
        );
        highScoreText.anchor.setTo(0.5, 0.5);

        playText = this.game.add.bitmapText(
        	this.game.world.centerX,
        	320,
        	'pixelf-gold',
        	'PLAY!',
        	50
        );
        playText.anchor.setTo(0.5, 0.5);
        playText.inputEnabled = true;
        playText.events.onInputDown.add(this.playGame, this);

        mainMenuText = this.game.add.bitmapText(
        	this.game.world.centerX,
        	360,
        	'pixelf',
        	'MAIN MENU',
        	30
        );
        mainMenuText.anchor.setTo(0.5, 0.5);
        mainMenuText.inputEnabled = true;
        mainMenuText.events.onInputDown.add(this.mainMenu, this);


	},

	playGame: function(){
		this.game.state.start('startgame');
	},
	mainMenu: function(){
		this.game.state.start('mainscreen');
	}

}