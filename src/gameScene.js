// [GameScene remains unchanged, omitted for brevity]
import ParallaxBackground from './ParallaxBackground.js';
import Rock from './Rock.js';
import ScoreHUD from './ScoreHUD.js';
// import Player from './player.js';

export default class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }

    init(data) {
        this.playerName = data.playerName || 'Anonymous';
    }

    preload() {
        this.load.image('coin', 'assets/coin.png');

        this.load.image('background', 'assets/Enviornment/background.png');
        this.load.image('background_item', 'assets/Enviornment/background_item.png');
        this.load.image('cloud_big', 'assets/Enviornment/cloud_big.png');
        this.load.image('cloud_small_0', 'assets/Enviornment/cloud_small_0.png');
        this.load.image('ground_0', 'assets/Enviornment/ground_0.png');
        this.load.image('ground_1', 'assets/Enviornment/ground_1.png');
        this.load.image('grass_0', 'assets/Enviornment/grass_0.png');
        this.load.image('grass_1', 'assets/Enviornment/grass_1.png');

        this.load.image('rock1', 'assets/Rock/rock1.png');
        this.load.image('rock2', 'assets/Rock/rock2.png');
        this.load.image('rock3', 'assets/Rock/rock3.png');
        this.load.image('rock4', 'assets/Rock/rock4.png');

        // player animations
        //monkey run
        this.load.image('monkey_1', 'assets/monkey/run/MONKEY_RUN_TK020001 Background Removed.png');
        this.load.image('monkey_2', 'assets/monkey/run/MONKEY_RUN_TK020002 Background Removed.png');
        this.load.image('monkey_3', 'assets/monkey/run/MONKEY_RUN_TK020003 Background Removed.png');
        this.load.image('monkey_4', 'assets/monkey/run/MONKEY_RUN_TK020004 Background Removed.png');
        this.load.image('monkey_5', 'assets/monkey/run/MONKEY_RUN_TK020005 Background Removed.png');
        this.load.image('monkey_6', 'assets/monkey/run/MONKEY_RUN_TK020006 Background Removed.png');
        this.load.image('monkey_7', 'assets/monkey/run/MONKEY_RUN_TK020007 Background Removed.png');
        this.load.image('monkey_8', 'assets/monkey/run/MONKEY_RUN_TK020008 Background Removed.png');
        this.load.image('monkey_9', 'assets/monkey/run/MONKEY_RUN_TK020009 Background Removed.png');
        this.load.image('monkey_10', 'assets/monkey/run/MONKEY_RUN_TK020010 Background Removed.png');
        this.load.image('monkey_11', 'assets/monkey/run/MONKEY_RUN_TK020011 Background Removed.png');
        this.load.image('monkey_12', 'assets/monkey/run/MONKEY_RUN_TK020012 Background Removed.png');
        this.load.image('monkey_13', 'assets/monkey/run/MONKEY_RUN_TK020013 Background Removed.png');
        this.load.image('monkey_14', 'assets/monkey/run/MONKEY_RUN_TK020014 Background Removed.png');
        this.load.image('monkey_15', 'assets/monkey/run/MONKEY_RUN_TK020015 Background Removed.png');
        this.load.image('monkey_16', 'assets/monkey/run/MONKEY_RUN_TK020016 Background Removed.png');
        this.load.image('monkey_17', 'assets/monkey/run/MONKEY_RUN_TK020017 Background Removed.png');
        this.load.image('monkey_18', 'assets/monkey/run/MONKEY_RUN_TK020018 Background Removed.png');
        this.load.image('monkey_19', 'assets/monkey/run/MONKEY_RUN_TK020019 Background Removed.png');
        this.load.image('monkey_20', 'assets/monkey/run/MONKEY_RUN_TK020020 Background Removed.png');
        this.load.image('monkey_21', 'assets/monkey/run/MONKEY_RUN_TK020021 Background Removed.png');
        this.load.image('monkey_22', 'assets/monkey/run/MONKEY_RUN_TK020022 Background Removed.png');
        //monkey jump
        this.load.image('monkeyJump_1', 'assets/monkey/jump/MONKEY_jump_TK010001 Background Removed.png');
        this.load.image('monkeyJump_2', 'assets/monkey/jump/MONKEY_jump_TK010002 Background Removed.png');
        this.load.image('monkeyJump_3', 'assets/monkey/jump/MONKEY_jump_TK010003 Background Removed.png');
        this.load.image('monkeyJump_4', 'assets/monkey/jump/MONKEY_jump_TK010004 Background Removed.png');
        this.load.image('monkeyJump_5', 'assets/monkey/jump/MONKEY_jump_TK010005 Background Removed.png');
        this.load.image('monkeyJump_6', 'assets/monkey/jump/MONKEY_jump_TK010006 Background Removed.png');
        this.load.image('monkeyJump_7', 'assets/monkey/jump/MONKEY_jump_TK010007 Background Removed.png');
        this.load.image('monkeyJump_8', 'assets/monkey/jump/MONKEY_jump_TK010008 Background Removed.png');
        this.load.image('monkeyJump_9', 'assets/monkey/jump/MONKEY_jump_TK010009 Background Removed.png');
        this.load.image('monkeyJump_10', 'assets/monkey/jump/MONKEY_jump_TK010010 Background Removed.png');
        this.load.image('monkeyJump_11', 'assets/monkey/jump/MONKEY_jump_TK010011 Background Removed.png');
        this.load.image('monkeyJump_12', 'assets/monkey/jump/MONKEY_jump_TK010012 Background Removed.png');
        this.load.image('monkeyJump_13', 'assets/monkey/jump/MONKEY_jump_TK010013 Background Removed.png');
        this.load.image('monkeyJump_14', 'assets/monkey/jump/MONKEY_jump_TK010014 Background Removed.png');
        this.load.image('monkeyJump_15', 'assets/monkey/jump/MONKEY_jump_TK010015 Background Removed.png');
        this.load.image('monkeyJump_16', 'assets/monkey/jump/MONKEY_jump_TK010016 Background Removed.png');
        this.load.image('monkeyJump_17', 'assets/monkey/jump/MONKEY_jump_TK010017 Background Removed.png');
        this.load.image('monkeyJump_18', 'assets/monkey/jump/MONKEY_jump_TK010018 Background Removed.png');
        this.load.image('monkeyJump_19', 'assets/monkey/jump/MONKEY_jump_TK010019 Background Removed.png');
        this.load.image('monkeyJump_20', 'assets/monkey/jump/MONKEY_jump_TK010020 Background Removed.png');
        this.load.image('monkeyJump_21', 'assets/monkey/jump/MONKEY_jump_TK010021 Background Removed.png');
        this.load.image('monkeyJump_22', 'assets/monkey/jump/MONKEY_jump_TK010022 Background Removed.png');
        this.load.image('monkeyJump_23', 'assets/monkey/jump/MONKEY_jump_TK010023 Background Removed.png');
        this.load.image('monkeyJump_24', 'assets/monkey/jump/MONKEY_jump_TK010024 Background Removed.png');
        this.load.image('monkeyJump_25', 'assets/monkey/jump/MONKEY_jump_TK010025 Background Removed.png');
        this.load.image('monkeyJump_26', 'assets/monkey/jump/MONKEY_jump_TK010026 Background Removed.png');



        this.load.image('lizard', 'assets/lizard.png');
        // this.load.image('monkey', 'assets/monkey.png');
        this.load.image('ostrich', 'assets/ostrich.png');
        this.load.image('man', 'assets/man.png');
    }

    create() {
        this.reachedCenter = false;
        this.jumpCount = 0;
        this.lives = 3;
        this.coinsCollected = 0;
        this.level = 0;
        this.rocksPassed = 0;
        this.rocksPassedPrev = -1;
        this.levelSprites = ['lizard', 'monkey_1', 'ostrich', 'man'];
        this.gravityY = 0;

        this.rockSpeed = -200;
        this.baseSpeed = -200;
        this.rockStepSpeed = 25;
        this.maxRockSpeed = -700;
        this.jumpVelocity = -800;
        this.jumpBaseVelocity = -800;
        this.jumpStepVelocity = 15;
        this.maxJumpVelocity = -1000;

        // Distance-based ramp
        this.distance = 0;      // total distance "run" in pixels
        this.speedEveryPixels = 2500;   // threshold to increase speed
        this._nextSpeedAt = this.speedEveryPixels;


        this.background = new ParallaxBackground(this, this.rockSpeed);

        this.ground = this.add.rectangle(this.scale.width / 2, this.background.ground._0.y - this.background.ground._0.height + 25, this.scale.width, 2, 0x00000000);
        this.ground.alpha = 0;
        this.physics.add.existing(this.ground, true);


        // Create the animation using the loaded images
        this.anims.create({
            key: 'monkey_run', // Animation name
            frames: [
                { key: 'monkey_1' }, { key: 'monkey_2' }, { key: 'monkey_3' },
                { key: 'monkey_4' }, { key: 'monkey_5' }, { key: 'monkey_6' },
                { key: 'monkey_7' }, { key: 'monkey_8' }, { key: 'monkey_9' },
                { key: 'monkey_10' }, { key: 'monkey_11' }, { key: 'monkey_12' },
                { key: 'monkey_13' }, { key: 'monkey_14' }, { key: 'monkey_15' },
                { key: 'monkey_16' }, { key: 'monkey_17' }, { key: 'monkey_18' },
                { key: 'monkey_19' }, { key: 'monkey_20' }, { key: 'monkey_21' },
                { key: 'monkey_22' },
            ],
            frameRate: 14, // 10 frames per second (adjust as needed)
            repeat: -1 // Loop infinitely
        });
        this.anims.create({
            key: 'monkey_jump', // Animation name
            frames: [
                { key: 'monkeyJump_1' }, { key: 'monkeyJump_2' }, { key: 'monkeyJump_3' },
                { key: 'monkeyJump_4' }, { key: 'monkeyJump_5' }, { key: 'monkeyJump_6' },
                { key: 'monkeyJump_7' }, { key: 'monkeyJump_8' }, { key: 'monkeyJump_9' },
                { key: 'monkeyJump_10' }, { key: 'monkeyJump_11' }, { key: 'monkeyJump_12' },
                { key: 'monkeyJump_13' }, { key: 'monkeyJump_14' }, { key: 'monkeyJump_15' },
                { key: 'monkeyJump_16' }, { key: 'monkeyJump_17' }, { key: 'monkeyJump_18' },
                { key: 'monkeyJump_19' }, { key: 'monkeyJump_20' }, { key: 'monkeyJump_21' },
                { key: 'monkeyJump_22' }, { key: 'monkeyJump_23' }, { key: 'monkeyJump_24' },
                { key: 'monkeyJump_25' }, { key: 'monkeyJump_26' }
            ],
            frameRate: 14, // 10 frames per second (adjust as needed)
            repeat: 0 // Loop infinitely
        });


        // this.player = new Player(this,);
        this.player = this.physics.add.sprite(this.scale.height / 2, this.ground.y - 100, this.levelSprites[this.level]);
        this.player.setVelocityX(200); // Initial movement (if needed)
        this.player.setScale(0.5);
        this.player.setCollideWorldBounds(true); // Enable world bounds collision
        this.player.body.setGravityY(this.gravityY);

        // Listen for animation complete event
        this.player.on('animationcomplete-monkey_jump', () => {
            // console.log('Run animation completed!');
            // Your custom code here - switch to jump
            this.player.play('monkey_run');
        });


        this.physics.add.collider(this.player, this.ground, () => {
            this.jumpCount = 0;
        });

        this.rock = new Rock(this, this.scale.width + (Math.random() * this.scale.width) + 100, this.background.ground._0.y - this.background.ground._0.height - 10, this.rockSpeed);
        this.rock._sprite.setDepth(6);
        this.player.setDepth(7);

        // this.coins = this.physics.add.group();
        this.coins = this.physics.add.group({ allowGravity: false, immovable: true });

        this.spawnCoinNearRock();

        this.physics.add.overlap(this.player, [this.rock.rockRect, this, this.rock.rockCircle], this.handleHit, null, this);
        this.physics.add.overlap(this.player, this.coins, this.collectCoin, null, this);



        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.OneKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
        this.TwoKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
        this.ThreeKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE);

        this.livesText = this.add.text(10, 10, 'Lives: 3', { fontSize: '20px', fill: '#fff' });
        this.coinsText = this.add.text(10, 35, 'Coins: 0', { fontSize: '20px', fill: '#fff' });
        this.rocksText = this.add.text(10, 60, 'Rocks Passed: 0', { fontSize: '20px', fill: '#fff' });


        this.applySpeed = (s) => {
            this.rockSpeed = s;//Phaser.Math.Clamp(s, 50, this.maxRockSpeed);

            // Example: single rock
            this.rock.setVelocityX(this.rockSpeed);
            this.background.setSpeed(this.rockSpeed);

            // Example: coins group
            if (this.coins) {
                this.coins.children.iterate(c => c?.body?.setVelocityX(this.rockSpeed));
            }

            // Optional: scale gravity with speed so jumps feel consistent
            if (this.player?.body) {
                const gBase = 600;
                this.player.body.setGravityY(gBase * (this.rockSpeed / this.baseSpeed));
            }

            // HUD update
            if (this.speedText) this.speedText.setText(`Speed: ${Math.round(this.currentSpeed)} px/s`);
        };
        // HUD texts
        this.speedText = this.add.text(10, 80, `Speed: ${Math.round(this.rockSpeed)} px/s`, { fontSize: '16px', fill: '#fff' });
        this.jumpText = this.add.text(10, 100, `Jump: ${Math.round(this.jumpVelocity)} px/s`, { fontSize: '16px', fill: '#fff' });
        this.distText = this.add.text(10, 120, `Dist: 0 px`, { fontSize: '16px', fill: '#fff' });

        // Sliders (only width: adjust positions as you like)
        this.makeSlider(this, 200, 80, 240, this.maxRockSpeed, 150, this.rockSpeed, 'Speed',
            (val) => this.applySpeed(val)
        );

        this.makeSlider(this, 200, 110, 240, -800, 200, this.jumpVelocity, 'Jump',
            (val) => {
                this.jumpVelocity = val;
                this.jumpText.setText(`Jump: ${Math.round(this.jumpBaseVelocity)} px/s`);
            }
        );

        // Create the HUD at top-left; 1 px = 1 cm default (0.01 m/px)
        this.scoreHUD = new ScoreHUD(this, {
            x: this.scale.width -  150, y: 10,
            label: 'Score',
            minDigits: 5,
            maxDigits: 10,
            metersPerPixel: 0.01,  // tweak as you like
            fontSize: 18
        });
    }

    update(time, delta) {

        this.background.update();
        this.scoreHUD.addBySpeedAndDelta(this.rockSpeed, delta);

        if (!this.reachedCenter) {
            if (this.player.x >= this.scale.width / 2) {
                this.player.x = this.scale.width / 2;
                this.player.body.setVelocityX(0);
                this.reachedCenter = true;
            }
        }
        else {
            if (Phaser.Input.Keyboard.JustDown(this.spaceKey) && this.jumpCount < 2) {
                this.player.body.setVelocityY(this.jumpVelocity);
                this.jumpCount++;
                if (this.level == 1) {
                    this.player.setScale(0.15);
                    this.player.play('monkey_jump');
                }
            }
        }


        //rocks passed
        if (!this.rock.playerPassed && this.rock._sprite.x + this.rock._sprite.width < this.player.x) {
            this.rock.playerPassed = true;
            this.rocksPassed++;
            this.rocksText.setText(`Rocks Passed: ${this.rocksPassed}`);

            if (this.level != this.levelSprites.length - 1 && this.rocksPassed > this.rocksPassedPrev) {
                this.rockSpeed -= this.rockStepSpeed;
                this.gravityY = this.gravityY + 10;
                this.jumpVelocity -= this.jumpStepVelocity;
                this.player.body.setGravityY(this.gravityY); // Faster fall
                this.rocksPassedPrev = this.rocksPassed;
                this.background.setSpeed(this.rockSpeed);
            }
        }

        //rock left screen
        if (this.rock.playerPassed && this.rock.leftScreen()) {
            this.rock.resetRockPos(this.rockSpeed);
            this.spawnCoinNearRock();
        }

        //level up
        if (this.rocksPassed % 10 === 0) {

            const newLevel = Math.floor(this.rocksPassed / 10);
            if (newLevel !== this.level && newLevel < this.levelSprites.length) {
                this.level = newLevel;
                console.log(this.level);
                // this.player.fillColor = this.levelColors[this.level];
                this.player.setTexture(this.levelSprites[this.level]);
                this.player.setScale(1 / 2);
                this.player.body.setSize(this.player.width, this.player.height, true);
                if (this.level == 1) {
                    this.player.setScale(0.15);
                    this.player.play('monkey_run');
                }
            }
            if (this.level >= this.levelSprites.length) {
                this.scene.start('LeaderboardScene', {
                    playerName: this.playerName,
                    coins: this.coinsCollected
                });
            }
        }
    }

    handleHit(player, rock) {
        this.lives--;
        this.livesText.setText(`Lives: ${this.lives}`);
        this.rock.resetRockPos(this.rockSpeed);
        // this.rock.setX(this.scale.width + 100); //TODO : Make it random
        // this.rock.setVelocityX(this.rockSpeed);
        this.spawnCoinNearRock();

        if (this.lives <= 0) {
            if (this.level == this.levelSprites.length - 1) {
                this.scene.start('LeaderboardScene', {
                    playerName: this.playerName,
                    coins: this.coinsCollected
                });
            }
            else {
                this.scene.start('GameOverScene');
            }
        }
    }

    collectCoin(player, coin) {
        coin.destroy();
        this.coinsCollected++;
        this.coinsText.setText(`Coins: ${this.coinsCollected}`);
    }

    spawnCoinNearRock() {
        this.coins.clear(true, true);

        const offsetY = Phaser.Math.Between(-250, -50);

        // const coin = this.physics.add.sprite(this.rock.x, this.rock.y + offsetY, 'coin');
        const coin = this.coins.create(this.rock._sprite.x, this.rock._sprite.y + offsetY, 'coin');

        coin.displayWidth = 40;
        coin.displayHeight = 40;

        coin.body.setSize(20, 20, true);       // Resizes the physics body
        coin.body.setAllowGravity(false);          // Prevent falling
        coin.body.setImmovable(false);             // Make sure it's a dynamic body
        coin.body.setVelocityX(this.rockSpeed);    // Set horizontal movement


    }

    makeSlider(scene, x, y, width, min, max, initial, label, onChange) {
        const track = scene.add.rectangle(x, y, width, 6, 0x666666).setOrigin(0, 0.5).setInteractive();
        const knobX = x + ((initial - min) / (max - min)) * width;
        const knob = scene.add.circle(knobX, y, 10, 0xffffff).setInteractive({ draggable: true });
        const text = scene.add.text(x, y - 24, `${label}: ${Math.round(initial)}`, { fontSize: '16px', fill: '#fff' });

        // Drag logic
        scene.input.setDraggable(knob, true);
        knob.on('drag', (_pointer, dragX) => {
            // clamp to track
            const clamped = Phaser.Math.Clamp(dragX, x, x + width);
            knob.x = clamped;

            // normalize: fraction along the track (0..1)
            const t = (clamped - x) / width;

            // safe interpolation between min and max
            const value = Phaser.Math.Linear(min, max, t);

            text.setText(`${label}: ${Math.round(value)}`);
            onChange(value);
        });

        // Click on track jumps knob
        track.on('pointerdown', (pointer) => {
            const clamped = Phaser.Math.Clamp(pointer.x, x, x + width);
            knob.x = clamped;

            const t = (clamped - x) / width;
            const value = Phaser.Math.Linear(min, max, t);

            text.setText(`${label}: ${Math.round(value)}`);
            onChange(value);
        });

        return { track, knob, text };
    }

}
