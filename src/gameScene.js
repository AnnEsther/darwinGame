// [GameScene remains unchanged, omitted for brevity]
export default class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }

    init(data) {
        this.playerName = data.playerName || 'Anonymous';
    }

    preload() {
        this.load.image('coin', 'assets/coin.png');
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
        this.levelColors = [0x0000ff, 0x00ffff, 0x00ff00, 0xffff00, 0xff00ff];

        this.ground = this.add.rectangle(400, 550, 800, 100, 0x00ff00);
        this.physics.add.existing(this.ground, true);

        this.player = this.add.rectangle(100, 300, 40, 40, this.levelColors[this.level]);
        this.physics.add.existing(this.player);
        this.player.body.setCollideWorldBounds(true);
        this.player.body.setVelocityX(200);

        this.physics.add.collider(this.player, this.ground, () => {
            this.jumpCount = 0;
        });

        this.rock = this.add.rectangle(850, 480, 40, 40, 0xff0000);
        this.physics.add.existing(this.rock);
        this.rock.body.setVelocityX(this.rockSpeed);
        this.rock.body.setImmovable(true);
        this.rock.body.setAllowGravity(false);
        this.physics.add.collider(this.rock, this.ground);

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

    update() {
        // console.log(this.coins.x, this.coins.body.velocity.x);

        if (!this.reachedCenter) {
            if (this.player.x >= 400) {
                this.player.x = 400;
                this.player.body.setVelocityX(0);
                this.reachedCenter = true;
            }
        } 
        else {
            if (Phaser.Input.Keyboard.JustDown(this.spaceKey) && this.jumpCount < 2) {
                this.player.body.setVelocityY(-400);
                this.jumpCount++;
            }
        }

        if (this.rock.x < -this.rock.width) {
            this.rock.x = 850;
            this.rock.body.setVelocityX(this.rockSpeed);
            this.spawnCoinNearRock();

            this.rocksPassed++;
            this.rocksText.setText(`Rocks Passed: ${this.rocksPassed}`);

            if (this.rocksPassed > this.rocksPassedPrev) {
                this.rockSpeed -= 5;
                this.rocksPassedPrev = this.rocksPassed;
            }

            if (this.rocksPassed % 10 === 0) {

                const newLevel = Math.floor(this.rocksPassed / 100);
                if (newLevel !== this.level && newLevel < this.levelColors.length) {
                    this.level = newLevel;
                    this.player.fillColor = this.levelColors[this.level];
                }
                if (this.level >= this.levelColors.length - 1) {
                    this.scene.start('LeaderboardScene', {
                        playerName: this.playerName,
                        coins: this.coinsCollected
                    });
                }
            }
        }
    }

    handleHit(player, rock) {
        this.lives--;
        this.livesText.setText(`Lives: ${this.lives}`);
        this.rock.x = 850;
        this.rock.body.setVelocityX(this.rockSpeed);
        this.spawnCoinNearRock();

        if (this.lives <= 0) {
            this.scene.start('GameOverScene');
        }
    }

    collectCoin(player, coin) {
        coin.destroy();
        this.coinsCollected++;
        this.coinsText.setText(`Coins: ${this.coinsCollected}`);
    }

    spawnCoinNearRock() {
        this.coins.clear(true, true);

        const offsetY = Phaser.Math.Between(-150, -50);

        // const coin = this.physics.add.sprite(this.rock.x, this.rock.y + offsetY, 'coin');
        const coin = this.coins.create(this.rock.x, this.rock.y + offsetY, 'coin');

        coin.displayWidth = 20;
        coin.displayHeight = 20;

        coin.body.setSize(20, 20, true);       // Resizes the physics body
        coin.body.setAllowGravity(false);          // Prevent falling
        coin.body.setImmovable(false);             // Make sure it's a dynamic body
        coin.body.setVelocityX(this.rockSpeed);    // Set horizontal movement


    }
}
