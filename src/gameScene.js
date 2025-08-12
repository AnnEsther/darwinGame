// [GameScene remains unchanged, omitted for brevity]
import ParallaxClouds from './ParallaxCloud.js';

export default class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }

    init(data) {
        this.playerName = data.playerName || 'Anonymous';
    }

    preload() {
        this.load.image('coin', 'assets/coin.png');

        this.load.image('Sky', 'assets/Enviornment/SkySmall.jpeg');
        this.load.image('Cloud0', 'assets/Enviornment/cloud_0_medium.png');
        this.load.image('Cloud1', 'assets/Enviornment/cloud_1.png');
        this.load.image('Ground', 'assets/Enviornment/ground_0.png');

        this.load.image('lizard', 'assets/lizard.png');
        this.load.image('monkey', 'assets/monkey.png');
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
        this.rockSpeed = -200;
        this.levelSprites = ['lizard', 'monkey', 'ostrich', 'man'];
        this.gravityY = 0;
        this.jumpVelocity = -400;

        this.clouds = new ParallaxClouds(this, 'cloud', this.rockSpeed);

        this.ground = this.add.rectangle(this.scale.width/2, 550, this.scale.width, 100, 0x00ff00);
        this.physics.add.existing(this.ground, true);

        // this.player = this.add.rectangle(100, 300, 40, 40, this.levelColors[this.level]);
        // this.physics.add.existing(this.player);
        // this.player.body.setCollideWorldBounds(true);
        // this.player.body.setVelocityX(200);

        this.player = this.physics.add.sprite(100, 300, this.levelSprites[this.level]);
        this.player.setVelocityX(200); // Initial movement (if needed)
        this.player.setScale(1 / 2);
        this.player.setCollideWorldBounds(true); // Enable world bounds collision
        this.player.body.setGravityY(this.gravityY);

        this.physics.add.collider(this.player, this.ground, () => {
            this.jumpCount = 0;
        });

        this.rock = this.add.rectangle(this.scale.width+100, 480, 40, 40, 0xff0000);
        this.physics.add.existing(this.rock);
        this.rock.body.setVelocityX(this.rockSpeed);
        this.rock.body.setImmovable(true);
        this.rock.body.setAllowGravity(false);
        this.physics.add.collider(this.rock, this.ground);
        this.rock.playerPassed = false;

        // this.coins = this.physics.add.group();
        this.coins = this.physics.add.group({ allowGravity: false, immovable: true });

        this.spawnCoinNearRock();

        this.physics.add.overlap(this.player, this.rock, this.handleHit, null, this);
        this.physics.add.overlap(this.player, this.coins, this.collectCoin, null, this);

        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.livesText = this.add.text(10, 10, 'Lives: 3', { fontSize: '20px', fill: '#fff' });
        this.coinsText = this.add.text(10, 35, 'Coins: 0', { fontSize: '20px', fill: '#fff' });
        this.rocksText = this.add.text(10, 60, 'Rocks Passed: 0', { fontSize: '20px', fill: '#fff' });
    }

    update(time, delta) {
        // console.log(this.coins.x, this.coins.body.velocity.x);
        // console.log(time);
        // console.log(delta);
        // this.clouds.update(delta);

        this.clouds.update();

        if (!this.reachedCenter) {
            if (this.player.x >= this.scale.width/2) {
                this.player.x = this.scale.width/2;
                this.player.body.setVelocityX(0);
                this.reachedCenter = true;
            }
        }
        else {
            if (Phaser.Input.Keyboard.JustDown(this.spaceKey) && this.jumpCount < 2) {
                this.player.body.setVelocityY(this.jumpVelocity);
                this.jumpCount++;
            }
        }

        //rocks passed
        if (!this.rock.playerPassed && this.rock.x + this.rock.width < this.player.x) {
            this.rock.playerPassed = true;
            this.rocksPassed++;
            this.rocksText.setText(`Rocks Passed: ${this.rocksPassed}`);

            if (this.level != this.levelSprites.length-1 && this.rocksPassed > this.rocksPassedPrev) {
                this.rockSpeed -= 25;
                this.gravityY = this.gravityY + 10;
                this.jumpVelocity -= 15;
                this.player.body.setGravityY(this.gravityY); // Faster fall
                this.rocksPassedPrev = this.rocksPassed;
                this.clouds.setSpeed(this.rockSpeed);
            }
        }

        //rock left screen
        if (this.rock.x < -this.rock.width) {
            this.rock.x = this.scale.width + 100;
            this.rock.playerPassed = false;
            this.rock.body.setVelocityX(this.rockSpeed);
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
        this.rock.x = this.scale.width + 100;
        this.rock.body.setVelocityX(this.rockSpeed);
        this.spawnCoinNearRock();

        if (this.lives <= 0) {
            if(this.level == this.levelSprites.length-1){
                this.scene.start('LeaderboardScene', {
                    playerName: this.playerName,
                    coins: this.coinsCollected
                });
            }
            else{
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
        const coin = this.coins.create(this.rock.x, this.rock.y + offsetY, 'coin');

        coin.displayWidth = 40;
        coin.displayHeight = 40;

        coin.body.setSize(20, 20, true);       // Resizes the physics body
        coin.body.setAllowGravity(false);          // Prevent falling
        coin.body.setImmovable(false);             // Make sure it's a dynamic body
        coin.body.setVelocityX(this.rockSpeed);    // Set horizontal movement


    }
}
