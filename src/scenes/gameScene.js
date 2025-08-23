// [GameScene remains unchanged, omitted for brevity]
import ParallaxBackground from '../ParallaxBackground.js';
import Rock from '../Rock.js';
import Coins from '../Coins.js';
import Player from '../Player.js';
import StartPopup from '../startPopup.js';
import GameUI from '../gameUI.js';
import AudioManager from '../AudioManager.js';
import GameOverPopup from '../gameOverPopup.js'

export default class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
        this.gameStart = false;
        this.distance = 0;
    }

    init(data) {
        this.playerName = data.playerName || 'Anonymous';
        this.gameStart = false;
        this.getInfo = data.getInfo;
        this.name = data.name;
        this.company = data.company;
        this.email = data.email;
    }

    create() {

        // ??AUDIO MANAGER
        this.audio = AudioManager.getInstance(this);
        // audio.playMusic('bgMusic', { loop: true, volume: 0.3 });

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


        this.background = new ParallaxBackground(this, this.onGroundReset.bind(this));
        this.background.setVelocityX(this.rockSpeed);

        this.ground = this.add.rectangle(this.scale.width / 2, this.background.ground._0.y - this.background.ground._0.height + 25, this.scale.width, 2, 0x00000000);
        this.ground.alpha = 0;
        this.physics.add.existing(this.ground, true);



        var playerConfig = {
            x: this.scale.width / 2,
            y: this.ground.y - 100,
            level: this.level,
            scale: 1,
            initialVelocity: 0,
            gravityY: this.gravityY,
            groundY: this.ground.y
        };
        this.player = new Player(this, playerConfig);
        this.player.setVisible(false);

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

        // HUD texts

        if (this.getInfo) {
            this.startPopup = new StartPopup(this, this.beginGameplay.bind(this));
            this.startPopup.setDepth(10);
        }
        else {
            const name = this.name;
            const company = this.company;
            const email = this.email;
            this.beginGameplay({ name, company, email });
        }


        this.gameOverPopup = new GameOverPopup(this, this.reloadGame.bind(this));
        this.gameOverPopup.setDepth(10);
        this.gameOverPopup.setVisible(false);


    }

    update(time, delta) {

        this.background.update();
        // this.ui.updateDistance(this.rockSpeed);
        // this.ui.updateCoin(100);

        if (!this.gameStart) {
            return;
        }

        if (this.distance <= 100) {
            this.distance++;
        }
        else {
            this.distance = 0;
            this.ui.updateDistance(1);
        }

        if (Phaser.Input.Keyboard.JustDown(this.spaceKey) && this.jumpCount < 1) {
            this.player._currPlayer.setVelocityY(this.jumpVelocity);
            this.jumpCount++;
            this.player.jump();
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
            // if (this.level >= this.levelSprites.length) {
            //     this.scene.start('LeaderboardScene', {
            //         playerName: this.playerName,
            //         coins: this.coinsCollected
            //     });
            // }
        }
    }

    beginGameplay({ name, company, email }) {

        this.name = name;
        this.company = company;
        this.email = email;

        console.log(name);
        console.log(company);
        console.log(email);
        this.startPopup.setVisible(false);

        this.gameStart = true;
        this.background.gameStart = true;

        this.player.setVisible(true);
        this.spawnCoins(this.rock.getX(), this.rock.getY());

        this.rock.setVelocityX(this.rockSpeed);
        this.background.setVelocityX(this.rockSpeed);
        this.coins.setVelocityX(this.rockSpeed);
    }

    reloadGame() {
        this.scene.start('GameScene', { getInfo: false, name: this.name, company: this.company, email: this.email });
    }

    handleHit(player, rock) {

        if (this.level == this.levelSprites.length - 1) {
            this.player.deadth(() => {
                this.scene.start('LeaderboardScene', { playerName: this.playerName, coins: this.coinsCollected });
            });
        }
        else {
            this.player.deadth(this.showGameOver.bind(this));
        }
        this.rockSpeed = 0;
        this.rock.setVelocityX(this.rockSpeed);
        this.background.setVelocityX(this.rockSpeed);
        this.coins.setVelocityX(this.rockSpeed);
    }

    showGameOver() {
        this.gameOverPopup.setLevel(this.level);
        console.log(this.ui.getScore());
        this.gameOverPopup.setScore(this.ui.getScore());
        this.gameOverPopup.setVisible(true);
        this.gameStart = false;

    }

    onGroundReset(isReset) {
        if (isReset[0]) {
            this.rock.resetRockPos(this.rockSpeed);
            this.spawnCoins(this.rock.getX(), this.rock.getY() - 100);
        }
        else if (isReset[1]) {
            var spawnCoin = Math.floor(Math.random() * 10);
            const padding = 200;
            if (spawnCoin > 2 && spawnCoin < 8) {
                this.spawnCoins(
                    this.background.ground._1.x + (this.background.ground._1.width * spawnCoin * 0.1),
                    this.rock.getY() - 200);
            }
        }
    }


    collectCoin(player, coin) {
        coin.destroy();
        this.coinsCollected += 100;
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


}
