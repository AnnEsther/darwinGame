
// Landing Page
class LandingScene extends Phaser.Scene {
    constructor() { super('LandingScene'); }
    create() {
        const logo = this.add.text(300, 250, 'Company Logo', { fontSize: '32px', fill: '#fff' });
        const startText = this.add.text(280, 300, 'Loading...', { fontSize: '24px', fill: '#fff' });

        this.time.delayedCall(2000, () => {
            this.scene.start('GameScene');
        });
    }
}

// Form Page
class FormScene extends Phaser.Scene {
    constructor() { super('FormScene'); }
    create() {
        let formHtml = `
            <div id="form" style="background: white; padding: 20px; border-radius: 10px; text-align: center;">
                <input type='text' id='name' placeholder='Name' style='margin: 5px'/><br/>
                <input type='text' id='company' placeholder='Company' style='margin: 5px'/><br/>
                <input type='email' id='email' placeholder='Email' style='margin: 5px'/><br/>
                <button id='submit' style='margin: 10px'>Start Game</button>
            </div>`;

        const formElement = this.add.dom(400, 300).createFromHTML(formHtml);
        formElement.setOrigin(0.5);
        formElement.addListener('click');
        formElement.on('click', (event) => {
            if (event.target.id === 'submit') {
                const name = document.getElementById('name')?.value || 'Anonymous';
                this.scene.start('GameScene', { playerName: name });
                formElement.removeListener('click');
                formElement.destroy();
            }
        });
    }
}

// [GameScene remains unchanged, omitted for brevity]
class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }

    init(data) {
        this.playerName = data.playerName || 'Anonymous';
    }

    create() {
        this.reachedCenter = false;
        this.jumpCount = 0;
        this.lives = 3;
        this.coinsCollected = 0;
        this.level = 0;
        this.rocksPassed = 0;
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

        this.coins = this.physics.add.group();
        this.spawnCoinNearRock();

        this.physics.add.overlap(this.player, this.rock, this.handleHit, null, this);
        this.physics.add.overlap(this.player, this.coins, this.collectCoin, null, this);

        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.livesText = this.add.text(10, 10, 'Lives: 3', { fontSize: '20px', fill: '#fff' });
        this.coinsText = this.add.text(10, 35, 'Coins: 0', { fontSize: '20px', fill: '#fff' });
        this.rocksText = this.add.text(10, 60, 'Rocks Passed: 0', { fontSize: '20px', fill: '#fff' });
    }

    update() {
        if (!this.reachedCenter) {
            if (this.player.x >= 400) {
                this.player.x = 400;
                this.player.body.setVelocityX(0);
                this.reachedCenter = true;
            }
        } else {
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

            if (this.rocksPassed % 10 === 0) {
                this.rockSpeed -= 20;
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

        const offsetY = Phaser.Math.Between(-60, -20);
        const coin = this.add.rectangle(this.rock.x, this.rock.y + offsetY, 20, 20, 0xffff00);
        this.physics.add.existing(coin);
        coin.body.setVelocityX(this.rockSpeed);
        coin.body.setAllowGravity(false);
        this.coins.add(coin);
    }
}

// Win Scene
class WinScene extends Phaser.Scene {
    constructor() { super('WinScene'); }
    init(data) {
        this.timeTaken = data.time;
    }
    create() {
        this.add.text(250, 250, 'You Win!', { fontSize: '48px', fill: '#fff' });
        this.add.text(250, 320, `Time: ${this.timeTaken} seconds`, { fontSize: '24px', fill: '#fff' });
    }
}

// Game Over Scene
class GameOverScene extends Phaser.Scene {
    constructor() {
        super('GameOverScene');
    }
    create() {
        this.add.text(280, 250, 'Game Over', { fontSize: '48px', fill: '#ff0000' });
        this.time.delayedCall(5000, () => {
            this.scene.start('LandingScene');
        });
    }
}

// Leaderboard Scene
class LeaderboardScene extends Phaser.Scene {
    constructor() {
        super('LeaderboardScene');
    }

    init(data) {
        this.playerName = data.playerName;
        this.coins = data.coins;
    }

    create() {
        // Update and store high scores
        highScores.push({ name: this.playerName, coins: this.coins });
        highScores.sort((a, b) => b.coins - a.coins);
        highScores = highScores.slice(0, 5);
        localStorage.setItem('highScores', JSON.stringify(highScores));

        this.add.text(250, 150, 'Leaderboard', { fontSize: '40px', fill: '#fff' });

        highScores.forEach((entry, index) => {
            this.add.text(220, 220 + index * 30, `${index + 1}. ${entry.name} - ${entry.coins} coins`, {
                fontSize: '24px',
                fill: '#ffff00'
            });
        });
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    dom: {
        createContainer: true
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 600 },
            debug: true,
        }
    },
    scene: [LandingScene, FormScene, GameScene, WinScene, GameOverScene, LeaderboardScene],
};

let game = new Phaser.Game(config);
let highScores = JSON.parse(localStorage.getItem('highScores') || '[]');
