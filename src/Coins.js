
export default class Coins {

    constructor(scene) {
        this.scene = scene;

        this.scene.anims.create({
            key: 'coinSpin', // Animation name
            frames: [
                { key: 'coin0000' }, { key: 'coin0001' }, { key: 'coin0002' },
                { key: 'coin0003' }, { key: 'coin0004' }, { key: 'coin0005' }
            ],
            frameRate: 14, // 10 frames per second (adjust as needed)
            repeat: -1 // Loop infinitely
        });

        this._activeCoins = [];
    }

    getColliders() {
        return this._activeCoins;
    }

    spawnCoin(x, y) {

    }

    setVelocityX(speed) {
        this._activeCoins.forEach(c => c?.setVelocityX(speed))
    }

    // Spawns N coins along an upward-opening ellipse arc
    spawnCoinsArc(cx, cy,
        {
            minCount = 1,
            maxCount = 6,
            arcWidth = 300,   // ellipse width (diameter) in px
            arcHeight = 200,  // ellipse height (diameter) in px
            startDeg = -30,   // arc start angle (degrees)
            endDeg = 30,      // arc end angle (degrees)
            speedX = -200,    // leftward speed
            scale = 0.5       // coin visual scale
        } = {}) {

        const rx = arcWidth / 2;   // ellipse radius X
        const ry = arcHeight / 2;  // ellipse radius Y

        // Build an ellipse curve centered at (cx, cy)
        const ellipse = new Phaser.Curves.Ellipse(cx, cy, arcWidth, arcHeight);
        ellipse.setStartAngle(startDeg);
        ellipse.setEndAngle(endDeg);
        ellipse.setClockwise(false); // flip if you want the other direction

        // Get ~evenly spaced points along the arc
        var randomCount = minCount + Math.floor(Math.random() * (maxCount-1))
        const pts = ellipse.getSpacedPoints(randomCount); // includes endpoints

        for (let i = 0; i < randomCount; i++) {
            const p = pts[i];
            
            const coin = this.scene.physics.add.sprite(p.x, p.y, 'coin0000');
            coin.play('coinSpin');

            coin.setScale(scale);
            coin.body.setAllowGravity(false);
            coin.body.setVelocityX(speedX);
            // keep collider in sync with visual size
            coin.body.setSize(coin.displayWidth, coin.displayHeight, true);
            coin.setCollideWorldBounds(false);
            coin.setBounce(0);

            this._activeCoins.push(coin);


        }
    }
}