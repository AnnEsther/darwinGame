// [GameScene remains unchanged, omitted for brevity]
import ParallaxBackground from './ParallaxBackground.js';
import Rock from './Rock.js';
import ScoreHUD from './ScoreHUD.js';
import Coins from './Coins.js';
import Player from './Player.js';

export default class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }

    init(data) {
        this.playerName = data.playerName || 'Anonymous';
    }

    preload() {
        //COINS
        this.load.image('coin0000', 'assets/Coin/coin0000.png');
        this.load.image('coin0001', 'assets/Coin/coin0001.png');
        this.load.image('coin0002', 'assets/Coin/coin0002.png');
        this.load.image('coin0003', 'assets/Coin/coin0003.png');
        this.load.image('coin0004', 'assets/Coin/coin0004.png');
        this.load.image('coin0005', 'assets/Coin/coin0005.png');
        //BACKGROUND
        this.load.image('background', 'assets/Enviornment/background.png');
        this.load.image('background_item', 'assets/Enviornment/background_item.png');
        this.load.image('cloud_big', 'assets/Enviornment/cloud_big.png');
        this.load.image('cloud_small_0', 'assets/Enviornment/cloud_small_0.png');
        this.load.image('ground_0', 'assets/Enviornment/ground_0.png');
        this.load.image('ground_1', 'assets/Enviornment/ground_1.png');
        this.load.image('grass_0', 'assets/Enviornment/grass_0.png');
        this.load.image('grass_1', 'assets/Enviornment/grass_1.png');
        //FOSSILS
        this.load.image('rock1', 'assets/Rock/rock1.png');
        this.load.image('rock2', 'assets/Rock/rock2.png');
        this.load.image('rock3', 'assets/Rock/rock3.png');
        this.load.image('rock4', 'assets/Rock/rock4.png');

        // player animations
        // //monkey run
        this.load.image('monkey_1', 'assets/monkey/run/MONKEY_RUN_TK020001 Background Removed.png');
        // this.load.image('monkey_2', 'assets/monkey/run/MONKEY_RUN_TK020002 Background Removed.png');
        // this.load.image('monkey_3', 'assets/monkey/run/MONKEY_RUN_TK020003 Background Removed.png');
        // this.load.image('monkey_4', 'assets/monkey/run/MONKEY_RUN_TK020004 Background Removed.png');
        // this.load.image('monkey_5', 'assets/monkey/run/MONKEY_RUN_TK020005 Background Removed.png');
        // this.load.image('monkey_6', 'assets/monkey/run/MONKEY_RUN_TK020006 Background Removed.png');
        // this.load.image('monkey_7', 'assets/monkey/run/MONKEY_RUN_TK020007 Background Removed.png');
        // this.load.image('monkey_8', 'assets/monkey/run/MONKEY_RUN_TK020008 Background Removed.png');
        // this.load.image('monkey_9', 'assets/monkey/run/MONKEY_RUN_TK020009 Background Removed.png');
        // this.load.image('monkey_10', 'assets/monkey/run/MONKEY_RUN_TK020010 Background Removed.png');
        // this.load.image('monkey_11', 'assets/monkey/run/MONKEY_RUN_TK020011 Background Removed.png');
        // this.load.image('monkey_12', 'assets/monkey/run/MONKEY_RUN_TK020012 Background Removed.png');
        // this.load.image('monkey_13', 'assets/monkey/run/MONKEY_RUN_TK020013 Background Removed.png');
        // this.load.image('monkey_14', 'assets/monkey/run/MONKEY_RUN_TK020014 Background Removed.png');
        // this.load.image('monkey_15', 'assets/monkey/run/MONKEY_RUN_TK020015 Background Removed.png');
        // this.load.image('monkey_16', 'assets/monkey/run/MONKEY_RUN_TK020016 Background Removed.png');
        // this.load.image('monkey_17', 'assets/monkey/run/MONKEY_RUN_TK020017 Background Removed.png');
        // this.load.image('monkey_18', 'assets/monkey/run/MONKEY_RUN_TK020018 Background Removed.png');
        // this.load.image('monkey_19', 'assets/monkey/run/MONKEY_RUN_TK020019 Background Removed.png');
        // this.load.image('monkey_20', 'assets/monkey/run/MONKEY_RUN_TK020020 Background Removed.png');
        // this.load.image('monkey_21', 'assets/monkey/run/MONKEY_RUN_TK020021 Background Removed.png');
        // this.load.image('monkey_22', 'assets/monkey/run/MONKEY_RUN_TK020022 Background Removed.png');
        // //monkey jump
        // this.load.image('monkeyJump_1', 'assets/monkey/jump/MONKEY_jump_TK010001 Background Removed.png');
        // this.load.image('monkeyJump_2', 'assets/monkey/jump/MONKEY_jump_TK010002 Background Removed.png');
        // this.load.image('monkeyJump_3', 'assets/monkey/jump/MONKEY_jump_TK010003 Background Removed.png');
        // this.load.image('monkeyJump_4', 'assets/monkey/jump/MONKEY_jump_TK010004 Background Removed.png');
        // this.load.image('monkeyJump_5', 'assets/monkey/jump/MONKEY_jump_TK010005 Background Removed.png');
        // this.load.image('monkeyJump_6', 'assets/monkey/jump/MONKEY_jump_TK010006 Background Removed.png');
        // this.load.image('monkeyJump_7', 'assets/monkey/jump/MONKEY_jump_TK010007 Background Removed.png');
        // this.load.image('monkeyJump_8', 'assets/monkey/jump/MONKEY_jump_TK010008 Background Removed.png');
        // this.load.image('monkeyJump_9', 'assets/monkey/jump/MONKEY_jump_TK010009 Background Removed.png');
        // this.load.image('monkeyJump_10', 'assets/monkey/jump/MONKEY_jump_TK010010 Background Removed.png');
        // this.load.image('monkeyJump_11', 'assets/monkey/jump/MONKEY_jump_TK010011 Background Removed.png');
        // this.load.image('monkeyJump_12', 'assets/monkey/jump/MONKEY_jump_TK010012 Background Removed.png');
        // this.load.image('monkeyJump_13', 'assets/monkey/jump/MONKEY_jump_TK010013 Background Removed.png');
        // this.load.image('monkeyJump_14', 'assets/monkey/jump/MONKEY_jump_TK010014 Background Removed.png');
        // this.load.image('monkeyJump_15', 'assets/monkey/jump/MONKEY_jump_TK010015 Background Removed.png');
        // this.load.image('monkeyJump_16', 'assets/monkey/jump/MONKEY_jump_TK010016 Background Removed.png');
        // this.load.image('monkeyJump_17', 'assets/monkey/jump/MONKEY_jump_TK010017 Background Removed.png');
        // this.load.image('monkeyJump_18', 'assets/monkey/jump/MONKEY_jump_TK010018 Background Removed.png');
        // this.load.image('monkeyJump_19', 'assets/monkey/jump/MONKEY_jump_TK010019 Background Removed.png');
        // this.load.image('monkeyJump_20', 'assets/monkey/jump/MONKEY_jump_TK010020 Background Removed.png');
        // this.load.image('monkeyJump_21', 'assets/monkey/jump/MONKEY_jump_TK010021 Background Removed.png');
        // this.load.image('monkeyJump_22', 'assets/monkey/jump/MONKEY_jump_TK010022 Background Removed.png');
        // this.load.image('monkeyJump_23', 'assets/monkey/jump/MONKEY_jump_TK010023 Background Removed.png');
        // this.load.image('monkeyJump_24', 'assets/monkey/jump/MONKEY_jump_TK010024 Background Removed.png');
        // this.load.image('monkeyJump_25', 'assets/monkey/jump/MONKEY_jump_TK010025 Background Removed.png');
        // this.load.image('monkeyJump_26', 'assets/monkey/jump/MONKEY_jump_TK010026 Background Removed.png');


        // this.load.image('LizardJump_000001', 'assets/lizard/LizardJump_000001.png');
        // this.load.image('LizardJump_000002', 'assets/lizard/LizardJump_000002.png');
        // this.load.image('LizardJump_000003', 'assets/lizard/LizardJump_000003.png');
        // this.load.image('LizardJump_000004', 'assets/lizard/LizardJump_000004.png');
        // this.load.image('LizardJump_000005', 'assets/lizard/LizardJump_000005.png');
        // this.load.image('LizardJump_000006', 'assets/lizard/LizardJump_000006.png');
        // this.load.image('LizardJump_000007', 'assets/lizard/LizardJump_000007.png');
        // this.load.image('LizardJump_000008', 'assets/lizard/LizardJump_000008.png');
        // this.load.image('LizardJump_000009', 'assets/lizard/LizardJump_000009.png');
        // this.load.image('LizardJump_000010', 'assets/lizard/LizardJump_000010.png');
        // this.load.image('LizardJump_000011', 'assets/lizard/LizardJump_000011.png');
        // this.load.image('LizardJump_000012', 'assets/lizard/LizardJump_000012.png');
        // this.load.image('LizardJump_000013', 'assets/lizard/LizardJump_000013.png');
        // this.load.image('LizardJump_000014', 'assets/lizard/LizardJump_000014.png');
        // this.load.image('LizardJump_000015', 'assets/lizard/LizardJump_000015.png');
        // this.load.image('LizardJump_000016', 'assets/lizard/LizardJump_000016.png');
        // this.load.image('LizardJump_000017', 'assets/lizard/LizardJump_000017.png');
        // this.load.image('LizardJump_000018', 'assets/lizard/LizardJump_000018.png');

        // this.load.image('LizardRun_000001', 'assets/lizard/LizardRun_000001.png');
        // this.load.image('LizardRun_000002', 'assets/lizard/LizardRun_000002.png');
        // this.load.image('LizardRun_000003', 'assets/lizard/LizardRun_000003.png');
        // this.load.image('LizardRun_000004', 'assets/lizard/LizardRun_000004.png');
        // this.load.image('LizardRun_000005', 'assets/lizard/LizardRun_000005.png');
        // this.load.image('LizardRun_000006', 'assets/lizard/LizardRun_000006.png');
        // this.load.image('LizardRun_000007', 'assets/lizard/LizardRun_000007.png');
        // this.load.image('LizardRun_000008', 'assets/lizard/LizardRun_000008.png');
        // this.load.image('LizardRun_000009', 'assets/lizard/LizardRun_000009.png');
        // this.load.image('LizardRun_000010', 'assets/lizard/LizardRun_000010.png');


        this.load.image('lizard', 'assets/lizard.png');
        this.load.image('ostrich', 'assets/ostrich.png');
        this.load.image('man', 'assets/man.png');

        this.load.image('explosion0000', 'assets/explosion/explosion0000.png');
        this.load.image('explosion0001', 'assets/explosion/explosion0001.png');
        this.load.image('explosion0002', 'assets/explosion/explosion0002.png');
        this.load.image('explosion0003', 'assets/explosion/explosion0003.png');
        this.load.image('explosion0004', 'assets/explosion/explosion0004.png');
        this.load.image('explosion0005', 'assets/explosion/explosion0005.png');
        this.load.image('explosion0006', 'assets/explosion/explosion0006.png');
        this.load.image('explosion0007', 'assets/explosion/explosion0007.png');
        this.load.image('explosion0008', 'assets/explosion/explosion0008.png');

    }

    create() {
        this.reachedCenter = false;
        this.jumpCount = 0;
        this.lives = 1;
        this.coinsCollected = 0;
        this.level = 0;
        this.rocksPassed = 0;
        this.rocksPassedPrev = -1;
        this.levelSprites = ['lizard', 'monkey_1', 'ostrich', 'man'];
        this.gravityY = 0;

        this.rockSpeed = -400;
        this.baseSpeed = -200;
        this.rockStepSpeed = 25;
        this.maxRockSpeed = -700;
        this.jumpVelocity = -800;
        this.jumpBaseVelocity = -600;
        this.jumpStepVelocity = 15;
        this.maxJumpVelocity = -1000;

        // Distance-based ramp
        this.distance = 0;      // total distance "run" in pixels
        this.speedEveryPixels = 2500;   // threshold to increase speed
        this._nextSpeedAt = this.speedEveryPixels;


        this.background = new ParallaxBackground(this, this.rockSpeed, this.onGround0Reset.bind(this));

        this.ground = this.add.rectangle(this.scale.width / 2, this.background.ground._0.y - this.background.ground._0.height + 25, this.scale.width, 2, 0x00000000);
        this.ground.alpha = 0;
        this.physics.add.existing(this.ground, true);



        var playerConfig = {
            x: this.scale.height / 2,
            y: this.ground.y - 100,
            level: this.level,
            scale: 0.5,
            initialVelocity: 200,
            gravityY: this.gravityY, 
            groundY: this.ground.y
        };
        this.player = new Player(this, playerConfig);



        this.physics.add.collider(this.player.getColliders(), this.ground, () => { this.jumpCount = 0; });

        var rockConfig = {
            x :  this.scale.width + (Math.random() * this.scale.width) + 100,
            y : this.background.ground._0.y - this.background.ground._0.height - 10,
            speed : this.rockSpeed,
            rockBase : this.background.ground._0
        };
        this.rock = new Rock(this, rockConfig);
        this.rock._sprite.setDepth(6);
        this.player._currPlayer.setDepth(7);

        // this.coins = this.physics.add.group();
        this.coins = new Coins(this);


        this.spawnCoinNearRock();

        this.physics.add.overlap(this.player.getColliders(), this.rock.getColliders(), this.handleHit, null, this);
        this.physics.add.overlap(this.player.getColliders(), this.coins.getColliders(), this.collectCoin, null, this);



        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.OneKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
        this.TwoKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
        this.ThreeKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE);

        this.livesText = this.add.text(10, 10, 'Lives: 3', { fontSize: '20px', fill: '#fff' });
        this.coinsText = this.add.text(10, 35, 'Coins: 0', { fontSize: '20px', fill: '#fff' });
        this.rocksText = this.add.text(10, 60, 'Rocks Passed: 0', { fontSize: '20px', fill: '#fff' });


        this.applySpeed = (s) => {
            this.rockSpeed = s;//Phaser.Math.Clamp(s, 50, this.maxRockSpeed);

            this.rock.setVelocityX(this.rockSpeed);
            this.background.setSpeed(this.rockSpeed);
            this.coins.setVelocityX(this.rockSpeed);

            // Optional: scale gravity with speed so jumps feel consistent
            const gBase = 600;
            this.player.updateGravity(gBase, this.rockSpeed, this.baseSpeed);

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
            x: this.scale.width - 150, y: 10,
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
            if (this.player.getX() >= this.scale.width / 2) {
                this.player.setX(this.scale.width / 2);
                this.player.setVelocityX(0);
                this.reachedCenter = true;
            }
        }
        else {
            if (Phaser.Input.Keyboard.JustDown(this.spaceKey) && this.jumpCount < 2) {
                this.player._currPlayer.setVelocityY(this.jumpVelocity);
                this.jumpCount++;
                if (this.level == 1) {
                    this.player._currPlayer.setScale(0.15);
                    this.player._currPlayer.play('monkey_jump');
                }
            }
        }


        //rocks passed
        if (!this.rock.playerPassed && this.rock._sprite.x + this.rock._sprite.width < this.player._currPlayer.x) {
            this.rock.playerPassed = true;
            this.rocksPassed++;
            this.rocksText.setText(`Rocks Passed: ${this.rocksPassed}`);

            if (this.level != this.levelSprites.length - 1 && this.rocksPassed > this.rocksPassedPrev) {
                this.rockSpeed -= this.rockStepSpeed;
                this.gravityY = this.gravityY + 10;
                this.jumpVelocity -= this.jumpStepVelocity;
                this.player._currPlayer.setGravityY(this.gravityY); // Faster fall
                this.rocksPassedPrev = this.rocksPassed;
                this.background.setVelocityX(this.rockSpeed);
            }
        }

        //level up

        if (this.rocksPassed % 10 === 0) {

            const newLevel = Math.floor(this.rocksPassed / 10);
            if (newLevel !== this.level && newLevel < this.levelSprites.length) {
                this.level = newLevel;
                this.player.updateLevel(this.level);
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

        if (this.lives <= 0) {
            if (this.level == this.levelSprites.length - 1) {
                this.scene.start('LeaderboardScene', {
                    playerName: this.playerName,
                    coins: this.coinsCollected
                });
            }
            else {

                this.player.deadth();
                this.rockSpeed = 0;
                this.rock.setVelocityX(this.rockSpeed);
                this.background.setVelocityX(this.rockSpeed);
                this.coins.setVelocityX(this.rockSpeed);
                
            }
        }
        else {
            this.rock.resetRockPos(this.rockSpeed);
            this.spawnCoinNearRock();

        }
    }

    onGround0Reset(){
        this.rock.resetRockPos(this.rockSpeed);
        this.spawnCoinNearRock();
    }


    collectCoin(player, coin) {
        coin.destroy();
        this.coinsCollected++;
        this.coinsText.setText(`Coins: ${this.coinsCollected}`);
    }

    spawnCoinNearRock() {

        // this.coins.clear(true, true);

        const offsetY = Phaser.Math.Between(-250, -100);
        // const offsetX = Phaser.Math.Between(-250, -100);
        var config = {
            maxCount: 6,
            minCount: 1,
            arcWidth: 150,   // ellipse width (diameter) in px
            arcHeight: 150,  // ellipse height (diameter) in px
            startDeg: -180,   // arc start angle (degrees)
            endDeg: 0,      // arc end angle (degrees)
            speedX: this.rockSpeed,    // leftward speed
            scale: 0.2       // coin visual scale
        }
        this.coins.spawnCoinsArc(this.rock._sprite.x, this.rock._sprite.y - 100, config);

        // const coin = this.physics.add.sprite(this.rock.x, this.rock.y + offsetY, 'coin');




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
