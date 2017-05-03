var startgame = function(game){}

startgame.prototype = {

	create: function(){

		// CURRENT GAME SCORE
		score = 0;

		// SKY
		sky = this.game.add.sprite(0, 0, 'sky');
		sky.inputEnabled = true;
		sky.animations.add('windy');
		sky.animations.play('windy', 0.2, true);

		// GRASS
		grass = this.game.add.sprite(0, this.game.world.height - 80, 'grass');
		this.game.physics.arcade.enable(grass);
		grass.body.immovable = true;

		// OVERLAY TEXT
    	scoreText = this.game.add.bitmapText(
            64, 
            this.game.world.height - 58,
            'pixelf',
            'Score',
            30
        );
        scoreText.anchor.setTo(0.5, 0.5);

        scoreCountText = this.game.add.bitmapText(
        	64,
        	this.game.world.height - 24,
        	'pixelf-gold',
        	"" + score,
        	40
        );
        scoreCountText.anchor.setTo(0.5, 0.5);

        ammoText = this.game.add.bitmapText(
        	this.game.world.width - 64,
        	this.game.world.height - 58,
        	'pixelf',
        	'Ammo',
        	30
        );
        ammoText.anchor.setTo(0.5, 0.5);

		// DUCK
		duck = this.game.add.sprite(16, 32, 'duck');
		duck.inputEnabled = true;
		duck.anchor.set(0.5);
		this.game.physics.arcade.enable(duck);
		duck.animations.add('fly');
		duck.animations.play('fly', 15, true);
		duck.body.velocity.x = 200; // Initial duck movement

		// GUN
		gun = this.game.add.sprite(this.game.world.centerX, this.game.world.height - 48, 'gun');
		gun.inputEnabled = true;
		gun.anchor.set(0.5);
		gun.animations.add('shoot-left', [0,1,2,3,4]);
		gun.animations.add('shoot-right', [4,5,6,7,0]);

		// SHOTGUN SHELL
		// 1
		shell1 = this.game.add.sprite(this.game.world.width - 75, this.game.world.height - 24, 'shell');
		shell1.anchor.set(0.5);
		shell1.scale.setTo(0.5, 0.5);
		// 2
		shell2 = this.game.add.sprite(this.game.world.width - 55, this.game.world.height - 24, 'shell');
		shell2.anchor.set(0.5);
		shell2.scale.setTo(0.5, 0.5);

		// EGG
		eggs = this.game.add.group();
		this.game.physics.arcade.enable(eggs);
		eggs.enableBody = true;
		eggs.physicsBodyType = Phaser.Physics.ARCADE;

		// INITIAL DIFFICULTY
		difficulty = 95;

		// PREPARE GUN
		ammo = 2;
		fireSwitch = true;
		reloadText = this.game.add.bitmapText(
	        	this.game.world.width - 64,
	        	this.game.world.height - 26,
	        	'pixelf-gold',
	        	'',
	        	25
    	);
    	reloadText.anchor.setTo(0.5, 0.5);



	},

	update: function(){

		// MOVE DUCK
		duckPosition = duck.world
		if (Math.round(duckPosition.x) > 320) {
			duck.kill();
			duck.scale.x *= -1;
			duck.reset(
				320, 
				Math.floor(Math.random() * (160 - 32 + 1)) + 32
				);
			duck.body.velocity.x = -200;
		} else if (Math.round(duckPosition.x) < 0) {
			duck.kill();
			duck.scale.x *= -1;
			duck.reset(
				0, 
				Math.floor(Math.random() * (160 - 32 + 1)) + 32
				);
			duck.body.velocity.x = 200;
		}

		// DROP EGG
		if(((Math.random() * (99 - 2 + 1)) + 2) > difficulty && ((Math.random() * (99 - 2 + 1)) + 2) > difficulty) {
			var egg = eggs.create(duckPosition.x, duckPosition.y + 40, 'egg');
			egg.body.gravity.y = ((Math.random() * (100 - 50 + 1)) + 50);
			egg.body.velocity.x = duck.body.velocity.x - 150;
			egg.anchor.set(0.5);
			egg.animations.add('crack');
			egg.inputEnabled = true;
			egg.body.collideWorldBounds = true;
			egg.body.bounce.setTo(0.9, 0.9);
		}

		// EGG ITERATOR
		eggs.forEach(function(eggInstance){
			eggInstance.events.onInputDown.add(this.shoot, eggInstance);
		}, this);

		// SHOTGUN SHELL GFX CONTROL
		if (ammo == 1) {
			shell1.kill();
		} else if (ammo == 0) {
			shell2.kill();
			reloadText.setText("Reload!");
		} 

		// RELOAD
		gun.events.onInputDown.add(this.reload, this);

		// ANTI SPAM
		sky.events.onInputDown.add(this.antiSpam, this);

		// DUCK FIRE
		duck.events.onInputDown.add(this.shotDuck, this);

		// COLLISIONS CHECK
		if(this.game.physics.arcade.collide(eggs, grass)){
			this.game.state.start('gameover');
		}

	},

	reload: function () {
		ammo = 2;
		reloadText.setText("");
		console.log("reloaded!");
		shell1.reset(this.game.world.width - 75, this.game.world.height - 24);
		shell2.reset(this.game.world.width - 55, this.game.world.height - 24);
	},

	shoot: function (eggInstance){

		if (ammo > 0) {

			if (fireSwitch == true) {
				gun.animations.play('shoot-left', 10, false);
				fireSwitch = false;
			} else {
				gun.animations.play('shoot-right', 10, false);
				fireSwitch = true;
			}

			ammo--;
			console.log("good shot! ammo left: " + ammo);
			eggInstance.animations.play('crack', 70, false, true);
			difficulty -= 0.0001;
			score++;
			scoreCountText.setText(score);
			console.log(difficulty);
		}

	},

	shotDuck: function(){
		console.log("duck shot!");
		difficulty -= 10;
		console.log(difficulty);
	},

	antiSpam: function () {

		if (ammo > 0) {

			if (fireSwitch == true) {
				gun.animations.play('shoot-left', 10, false);
				fireSwitch = false;
			} else {
				gun.animations.play('shoot-right', 10, false);
				fireSwitch = true;
			}

			ammo--;
			console.log("spam shot! ammo left: " + ammo);
			difficulty -= 0.5;
			console.log(difficulty);
		}

	}

}