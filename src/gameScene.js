// [GameScene remains unchanged, omitted for brevity]
import ParallaxBackground from './ParallaxBackground.js';
import Rock from './Rock.js';
import Coins from './Coins.js';
import Player from './Player.js';
import StartPopup from './startPopup.js';
import GameUI from './gameUI.js';

export default class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }

    init(data) {
        this.playerName = data.playerName || 'Anonymous';
    }

    create() {

        this.ui = new GameUI(this, {
            leftBgKey: 'coinLabel',
            rightBgKey: 'scoreLabel',
            boxWidth: 0,
            boxHeight: 0,
            fontFamily: 'Press Start 2P', // ensure loaded via CSS/WebFont
            fontSize: 44,
            textColor: '#000000ff',
            margin: 16,
            pad: 14,
            depth: 9999
        });


        this.reachedCenter = false;
        this.jumpCount = 0;
        this.coinsCollected = 0;
        this.level = 0;
        this.rocksPassed = 0;
        this.rocksPassedPrev = -1;
        this.levelSprites = ['lizard', 'ostrich', 'monkey_1', 'man'];
        this.gravityY = 0;

        this.rockSpeed = -500;
        this.baseSpeed = -200;
        this.rockStepSpeed = 25;
        this.maxRockSpeed = -1000;

        this.jumpVelocity = -800;
        this.jumpBaseVelocity = -600;
        this.jumpStepVelocity = 15;
        this.maxJumpVelocity = -1000;

        // Distance-based ramp
        this.distance = 0;      // total distance "run" in pixels
        this.speedEveryPixels = 2500;   // threshold to increase speed
        this._nextSpeedAt = this.speedEveryPixels;


        this.background = new ParallaxBackground(this, 0, this.onGroundReset.bind(this));

        this.ground = this.add.rectangle(this.scale.width / 2, this.background.ground._0.y - this.background.ground._0.height + 25, this.scale.width, 2, 0x00000000);
        this.ground.alpha = 0;
        this.physics.add.existing(this.ground, true);



        var playerConfig = {
            x: this.scale.height / 2,
            y: this.ground.y - 100,
            level: this.level,
            scale: 1,
            initialVelocity: 200,
            gravityY: this.gravityY,
            groundY: this.ground.y
        };
        this.player = new Player(this, playerConfig);



        this.physics.add.collider(this.player.getColliders(), this.ground, () => { this.jumpCount = 0; });

        var rockConfig = {
            x: this.background.ground._0.width + this.background.ground._1.width + (Math.random() * this.background.ground._0.width),
            y: this.background.ground._0.y - this.background.ground._0.height - 10,
            speed: 0,
            rockBase: this.background.ground._0
        };
        this.rock = new Rock(this, rockConfig);
        this.rock._sprite.setDepth(6);
        this.player._currPlayer.setDepth(7);

        // this.coins = this.physics.add.group();
        this.coins = new Coins(this);




        this.physics.add.overlap(this.player.getColliders(), this.rock.getColliders(), this.handleHit, null, this);
        this.physics.add.overlap(this.player.getColliders(), this.coins.getColliders(), this.collectCoin, null, this);



        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);



        this.applySpeed = (s) => {
            this.rockSpeed = s;//Phaser.Math.Clamp(s, 50, this.maxRockSpeed);

            this.rock.setVelocityX(this.rockSpeed);
            this.background.setVelocityX(this.rockSpeed);
            this.coins.setVelocityX(this.rockSpeed);

            // Optional: scale gravity with speed so jumps feel consistent
            const gBase = 600;
            this.player.updateGravity(gBase, this.rockSpeed, this.baseSpeed);

        };
        // HUD texts

        this.startPopup = new StartPopup(this, (playerName) => {
            console.log(`Game started for: ${playerName}`);
            this.beginGameplay();
        });
        this.startPopup.setDepth(10);


    }

    update(time, delta) {

        this.background.update();
        this.ui.updateDistance(this.rockSpeed);
        this.ui.updateCoin(100);


        if (!this.reachedCenter) {
            if (this.player.getX() >= this.scale.width / 2) {
                this.player.setX(this.scale.width / 2);
                this.player.setVelocityX(0);
                this.reachedCenter = true;
            }
        }
        else {
            if (Phaser.Input.Keyboard.JustDown(this.spaceKey) && this.jumpCount < 1) {
                this.player._currPlayer.setVelocityY(this.jumpVelocity);
                this.jumpCount++;
                this.player.jump();
            }
        }


        //rocks passed
        if (!this.rock.playerPassed && this.rock._sprite.x + this.rock._sprite.width < this.player._currPlayer.x) {
            this.rock.playerPassed = true;
            this.rocksPassed++;

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

    beginGameplay() {
        this.add.text(400, 300, 'Game Started!', {
            fontSize: '32px',
            color: '#00ff00'
        }).setOrigin(0.5);

        this.spawnCoins(this.rock.getX(), this.rock.getY());
    }

    handleHit(player, rock) {

        if (this.level == this.levelSprites.length - 1) {
            this.player.deadth(() => {
                this.scene.start('LeaderboardScene', { playerName: this.playerName, coins: this.coinsCollected });
            });
        }
        else {
            this.player.deadth(() => { this.scene.start('GameOverScene') });
        }
        this.rockSpeed = 0;
        this.rock.setVelocityX(this.rockSpeed);
        this.background.setVelocityX(this.rockSpeed);
        this.coins.setVelocityX(this.rockSpeed);
    }

    onGroundReset(isReset) {
        if (isReset[0]) {
            this.rock.resetRockPos(this.rockSpeed);
            this.spawnCoins(this.rock.getX(), this.rock.getY() - 100);
        }
        else if (isReset[1]) {
            var spawnCoin = Math.floor(Math.random() * 10);
            const padding = 200;
            if (spawnCoin > 5) {
                this.spawnCoins(
                    this.background.ground._1.x + padding + Math.floor(Math.random() * (this.background.ground._1.width - (2 * padding))),
                    this.rock.getY() - 100);
            }
        }
    }


    collectCoin(player, coin) {
        coin.destroy();
        this.coinsCollected++;
               // Test updates
        this.ui.updateCoin(this.coinsCollected);
    }

    spawnCoins(x, y) {

        var config = {
            maxCount: 6,
            minCount: 1,
            arcWidth: 150,   // ellipse width (diameter) in px
            arcHeight: 150,  // ellipse height (diameter) in px
            startDeg: -180,   // arc start angle (degrees)
            endDeg: 0,      // arc end angle (degrees)
            speedX: this.rockSpeed,    // leftward speed
            scale: 1       // coin visual scale
        }
        this.coins.spawnCoinsArc(x, y, config);


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
