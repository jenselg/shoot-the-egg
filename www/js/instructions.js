var instructions = function(game){}

instructions.prototype = {

	create: function(){
		this.game.add.sprite(0, 0, 'bluesky');

		instructionHeaderText = this.game.add.bitmapText(
        	this.game.world.centerX,
        	32,
        	'pixelf-gold',
        	'INSTRUCTIONS!',
        	35
        );
        instructionHeaderText.anchor.setTo(0.5, 0.5);

        instructionText = this.game.add.bitmapText(
        	this.game.world.centerX,
        	184,
        	'pixelf',
        	"1. SHOOT THE EGG\n\n2. DON'T SHOOT THE\nDUCK! EVER! OR ELSE!\n\n3. DON'T SPAM SHOOT\n...OR ELSE!\n\n4. PRESS THE GUN TO\nRELOAD...YOUR GUN",
        	25
        );
        instructionText.anchor.setTo(0.5, 0.5);

        playText = this.game.add.bitmapText(
        	this.game.world.centerX,
        	380,
        	'pixelf-gold',
        	'PLAY!',
        	50
        );        playText.anchor.setTo(0.5, 0.5);
        playText.inputEnabled = true;
        playText.events.onInputDown.add(this.playGame, this);

        mainMenuText = this.game.add.bitmapText(
        	this.game.world.centerX,
        	420,
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