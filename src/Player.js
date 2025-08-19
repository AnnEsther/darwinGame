
// const levelSprites = ['LizardRun_000001', 'monkey_1', 'ostrich', 'man'];
const levelSprites = ['lizard', 'monkey_1', 'ostrich', 'man'];
const levelAnims = ['LizardRun_000001', 'monkey_run', 'ostrich', 'man'];
export default class Player {
    constructor(scene, config) {
        this.scene = scene;

        this._currPlayer = this.scene.physics.add.sprite(config.x, config.y, levelSprites[config.level]);



        this.setVelocityX(config.initialVelocity); // Initial movement (if needed)

        this.updateLevel(config.level);

        this._currPlayer.setScale(0.5);

        this._currPlayer.body.setGravityY(config.gravityY);

        this.createAnims();

        this._explosion = this.scene.add.sprite(this.scene.scale.width/2, config.groundY, 'explosion');
        this._explosion.setScale(0.25);
        this._explosion.setY(this._explosion.y - this._explosion.height/2 + 20);
        this._explosion.setDepth(8);
        this._explosion.setVisible(false);
    }

    getColliders() {
        return this._currPlayer;
    }

    getX() {
        return this._currPlayer.x;
    }

    setX(x) {
        return this._currPlayer.x = x;
    }

    setVelocityX(velocity) {
        this._currPlayer.setVelocityX(velocity); // Initial movement (if needed)
    }

    updateGravity(gBase, currSpeed, baseSpeed) {
        this._currPlayer.body.setGravityY(gBase * (currSpeed / baseSpeed));
    }

    createAnims() {
        this.scene.anims.create({
            key: 'explosion',
            frames: [{ key: 'explosion0000' }, { key: 'explosion0001' }, { key: 'explosion0002' }, { key: 'explosion0003' }, { key: 'explosion0004' }, { key: 'explosion0005' },
            { key: 'explosion0006' }, { key: 'explosion0007' }, { key: 'explosion0008' }
            ], frameRate: 7, repeat: 1
        });
        return;

        //MONKEY
        this.scene.anims.create({
            key: 'monkey_run',
            frames: [{ key: 'monkey_1' }, { key: 'monkey_2' }, { key: 'monkey_3' }, { key: 'monkey_4' }, { key: 'monkey_5' }, { key: 'monkey_6' },
            { key: 'monkey_7' }, { key: 'monkey_8' }, { key: 'monkey_9' }, { key: 'monkey_10' }, { key: 'monkey_11' }, { key: 'monkey_12' },
            { key: 'monkey_13' }, { key: 'monkey_14' }, { key: 'monkey_15' }, { key: 'monkey_16' }, { key: 'monkey_17' }, { key: 'monkey_18' },
            { key: 'monkey_19' }, { key: 'monkey_20' }, { key: 'monkey_21' }, { key: 'monkey_22' },
            ], frameRate: 14, repeat: -1
        });
        this.scene.anims.create({
            key: 'monkey_jump',
            frames: [{ key: 'monkeyJump_1' }, { key: 'monkeyJump_2' }, { key: 'monkeyJump_3' }, { key: 'monkeyJump_4' }, { key: 'monkeyJump_5' }, { key: 'monkeyJump_6' },
            { key: 'monkeyJump_7' }, { key: 'monkeyJump_8' }, { key: 'monkeyJump_9' }, { key: 'monkeyJump_10' }, { key: 'monkeyJump_11' }, { key: 'monkeyJump_12' },
            { key: 'monkeyJump_13' }, { key: 'monkeyJump_14' }, { key: 'monkeyJump_15' }, { key: 'monkeyJump_16' }, { key: 'monkeyJump_17' }, { key: 'monkeyJump_18' },
            { key: 'monkeyJump_19' }, { key: 'monkeyJump_20' }, { key: 'monkeyJump_21' }, { key: 'monkeyJump_22' }, { key: 'monkeyJump_23' }, { key: 'monkeyJump_24' },
            { key: 'monkeyJump_25' }, { key: 'monkeyJump_26' }
            ], frameRate: 14, repeat: 0
        });
        this._currPlayer.on('animationcomplete-monkey_jump', () => {
            this._currPlayer.play('monkey_run');
        });
        //LIZARD
        this.scene.anims.create({
            key: 'lizard_run',
            frames: [{ key: 'LizardRun_000001' }, { key: 'LizardRun_000002' }, { key: 'LizardRun_000003' }, { key: 'LizardRun_000004' }, { key: 'LizardRun_000005' }, { key: 'LizardRun_000006' },
            { key: 'LizardRun_000007' }, { key: 'LizardRun_000008' }, { key: 'LizardRun_000009' }, { key: 'LizardRun_000010' }
            ], frameRate: 14, repeat: -1
        });
        this.scene.anims.create({
            key: 'lizard_jump',
            frames: [{ key: 'LizardJump_000001' }, { key: 'LizardJump_000002' }, { key: 'LizardJump_000003' }, { key: 'LizardJump_000004' }, { key: 'LizardJump_000005' }, { key: 'LizardJump_000006' },
            { key: 'LizardJump_000007' }, { key: 'LizardJump_000008' }, { key: 'LizardJump_000009' }, { key: 'LizardJump_000010' }, { key: 'LizardJump_000011' }, { key: 'LizardJump_000012' },
            { key: 'LizardJump_000013' }, { key: 'LizardJump_000014' }, { key: 'LizardJump_000015' }, { key: 'LizardJump_000016' }, { key: 'LizardJump_000017' }, { key: 'LizardJump_000018' }
            ], frameRate: 14, repeat: 0
        });
        this._currPlayer.on('animationcomplete-lizard_jump', () => {
            this._currPlayer.play('lizard_run');
        });
    }

    updateLevel(level) {

        this._currPlayer.setTexture(levelSprites[level]);
        if (level == 0) { this._currPlayer.setScale(0.5); }
        else if (level == 1) { this._currPlayer.setScale(0.15); }
        else if (level == 2) { this._currPlayer.setScale(0.5); }
        else if (level == 3) { this._currPlayer.setScale(0.5); }


        this.evolvePlayer(level);


    }

    evolvePlayer(level) {
        const flickerDuration = 2000; // 2 seconds
        const flickerInterval = 200;  // toggle every 100ms

        let elapsed = 0;

        // Timer event for flickering
        const flickerEvent = this.scene.time.addEvent({
            delay: flickerInterval,
            loop: true,
            callback: () => {
                this._currPlayer.setVisible(!this._currPlayer.visible);
                elapsed += flickerInterval;

                // Stop after flickerDuration
                if (elapsed >= flickerDuration) {
                    flickerEvent.remove();
                    this._currPlayer.setVisible(true); // ensure visible

                    this._currPlayer.setTexture(levelSprites[level]); // switch sprite
                    // this._currPlayer.play(levelAnims[level]);

                }

                this._currPlayer.body.setSize(this._currPlayer.width, this._currPlayer.height, true);
                this._currPlayer.setCollideWorldBounds(true); // Enable world bounds collision
            }
        });
    }

    deadth(){
        this._currPlayer.setVisible(false);
        this._explosion.setVisible(true);
        this._explosion.anims.play('explosion', true);

        this._explosion.once(`animationcomplete-explosion`, () => {
            this.scene.scene.start('GameOverScene');
        });
    }
}