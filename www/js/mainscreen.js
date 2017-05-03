var mainscreen = function(game){}

mainscreen.prototype = {

	create: function(){

		this.game.add.sprite(0, 0, 'bluesky');
		bigegg = this.game.add.sprite(this.game.world.centerX, 108, 'bigegg');
		bigegg.anchor.set(0.5);
		bigegg.scale.setTo(0.1, 0.1);

        headerText = this.game.add.bitmapText(
        	this.game.world.centerX,
        	200,
        	'pixelf-gold',
        	"SHOOT",
        	45
        );
        headerText.anchor.setTo(0.5, 0.5);
        header2Text = this.game.add.bitmapText(
        	this.game.world.centerX,
        	235,
        	'pixelf',
        	"THE EGG",
        	35
        );
        header2Text.anchor.setTo(0.5, 0.5);

        playText = this.game.add.bitmapText(
        	this.game.world.centerX,
        	310,
        	'pixelf-gold',
        	'PLAY!',
        	50
        );
        playText.anchor.setTo(0.5, 0.5);
        playText.inputEnabled = true;
        playText.events.onInputDown.add(this.startGame, this);

        highScoreText = this.game.add.bitmapText(
        	this.game.world.centerX,
        	360,
        	'pixelf',
        	'HIGH SCORE',
        	30
        );
        highScoreText.anchor.setTo(0.5, 0.5);
        highScoreText.inputEnabled = true;
        highScoreText.events.onInputDown.add(this.highScore, this);

        instructionsText = this.game.add.bitmapText(
        	this.game.world.centerX,
        	400,
        	'pixelf',
        	'INSTRUCTIONS',
        	30
        );
        instructionsText.anchor.setTo(0.5, 0.5); 
        instructionsText.inputEnabled = true;
        instructionsText.events.onInputDown.add(this.instructions, this);

        soundSwitchText = this.game.add.bitmapText(
        	this.game.world.centerX,
        	440,
        	'pixelf',
        	soundText,
        	30
        );
        soundSwitchText.anchor.setTo(0.5, 0.5);  
        soundSwitchText.inputEnabled = true;
        soundSwitchText.events.onInputDown.add(this.soundSwitch, this);

	},

	startGame: function(){
		this.game.state.start('startgame');
	},
	highScore: function(){
		this.game.state.start('highscore');
	},
	soundSwitch: function(){
                if(window.localStorage.getItem('sound') == 'on') {
                    window.localStorage.setItem('sound', 'off');
                    soundSwitchText.setText("Sound OFF");
                } else if (window.localStorage.getItem('sound') == 'off') {
                    window.localStorage.setItem('sound', 'on');
                    soundSwitchText.setText("Sound ON");
                }                
        },
	instructions: function(){
		this.game.state.start('instructions');
	}

}