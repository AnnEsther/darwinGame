import AudioManager from './AudioManager.js';

// const levelSprites = ['LizardRun_000001', 'monkey_1', 'ostrich', 'man'];
const levelSprites = ['LizardRun_000001', 'ostrichRun_1', 'monkey_1', 'man'];
const levelRunAnims = ['lizard_run', 'ostrich_run', 'monkey_run', 'human_run'];
const levelJumpAnims = ['lizard_jump', 'ostrich_jump', 'monkey_jump', 'human_jump'];
export default class Player {
    constructor(scene, config) {
        this.scene = scene;

        this._currPlayer = this.scene.physics.add.sprite(config.x, config.y, levelSprites[config.level]);


        this.createAnims();

        this.setVelocityX(config.initialVelocity); // Initial movement (if needed)

        // this.updateLevel(config.level);
        this.level = config.level;
        this._currPlayer.setTexture(levelSprites[this.level]);
        this._currPlayer.play(levelRunAnims[this.level]);


        this._currPlayer.body.setGravityY(config.gravityY);
        this._currPlayer.body.setAllowGravity(false);


        this._explosion = this.scene.add.sprite(this.scene.scale.width / 2, config.groundY, 'explosion_small');
        // this._explosion.setScale(0.25);
        // this._explosion.setY(this._explosion.y - this._explosion.height / 2 + 20);
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

    setVisible(flag) {
        this._currPlayer.setVisible(flag);
    }

    updateGravity(gBase, currSpeed, baseSpeed) {
        this._currPlayer.body.setGravityY(gBase * (currSpeed / baseSpeed));
    }

    createAnims() {
        //EXPLOSION
        this.scene.anims.create({
            key: 'explosion_small',
            frames: [
                { key: 'explosionSmall_0' },
                { key: 'explosionSmall_1' },
                { key: 'explosionSmall_2' },
                { key: 'explosionSmall_3' },
                { key: 'explosionSmall_4' },
                { key: 'explosionSmall_5' },
                { key: 'explosionSmall_6' },
                { key: 'explosionSmall_7' },
                { key: 'explosionSmall_8' }
            ], frameRate: 7, repeat: 0
        });

        this.scene.anims.create({
            key: 'explosion_large',
            frames: [
                { key: 'explosionLarge_0' },
                { key: 'explosionLarge_1' },
                { key: 'explosionLarge_2' },
                { key: 'explosionLarge_3' },
                { key: 'explosionLarge_4' },
                { key: 'explosionLarge_5' },
                { key: 'explosionLarge_6' },
                { key: 'explosionLarge_7' },
                { key: 'explosionLarge_8' }
            ], frameRate: 7, repeat: 0
        });

        //LIZARD
        this.scene.anims.create({
            key: 'lizard_run',
            frames: [{ key: 'LizardRun_000001' }, { key: 'LizardRun_000002' }, { key: 'LizardRun_000003' }, { key: 'LizardRun_000004' }, { key: 'LizardRun_000005' }, { key: 'LizardRun_000006' },
            { key: 'LizardRun_000007' }, { key: 'LizardRun_000008' }, { key: 'LizardRun_000009' }, { key: 'LizardRun_000010' }
            ], frameRate: 20, repeat: -1
        });
        this.scene.anims.create({
            key: 'lizard_jump',
            frames: [{ key: 'LizardJump_000001' }, { key: 'LizardJump_000002' }, { key: 'LizardJump_000003' }, { key: 'LizardJump_000004' }, { key: 'LizardJump_000005' }, { key: 'LizardJump_000006' },
            { key: 'LizardJump_000007' }, { key: 'LizardJump_000008' }
            ], frameRate: 2, repeat: 0
        });

        //MONKEY
        this.scene.anims.create({
            key: 'monkey_run',
            frames: [{ key: 'monkey_1' }, { key: 'monkey_2' }, { key: 'monkey_3' }, { key: 'monkey_4' }, { key: 'monkey_5' }, { key: 'monkey_6' },
            { key: 'monkey_7' }, { key: 'monkey_8' }, { key: 'monkey_9' }, { key: 'monkey_10' }, { key: 'monkey_11' }
            ], frameRate: 14, repeat: -1
        });
        this.scene.anims.create({
            key: 'monkey_jump',
            frames: [{ key: 'monkeyJump_1' }, { key: 'monkeyJump_2' }, { key: 'monkeyJump_3' }, { key: 'monkeyJump_4' }, { key: 'monkeyJump_5' }, { key: 'monkeyJump_6' },
            { key: 'monkeyJump_7' }, { key: 'monkeyJump_8' }
            ], frameRate: 14, repeat: 0
        });

        //BIRD
        this.scene.anims.create({
            key: 'ostrich_run',
            frames: [
                { key: 'ostrichRun_1' },
                { key: 'ostrichRun_2' },
                { key: 'ostrichRun_3' },
                { key: 'ostrichRun_4' },
                { key: 'ostrichRun_5' },
                { key: 'ostrichRun_6' },
                { key: 'ostrichRun_7' },
                { key: 'ostrichRun_8' },
                { key: 'ostrichRun_9' },
                { key: 'ostrichRun_10' }
            ], frameRate: 14, repeat: -1
        });
        this.scene.anims.create({
            key: 'ostrich_jump',
            frames: [
                { key: 'ostrichJump_0' },
                { key: 'ostrichJump_1' },
                { key: 'ostrichJump_2' },
                { key: 'ostrichJump_3' },
                { key: 'ostrichJump_4' },
                { key: 'ostrichJump_5' },
                { key: 'ostrichJump_6' }
            ], frameRate: 14, repeat: -1
        });


        //HUMAN
        this.scene.anims.create({
            key: 'human_run',
            frames: [
                { key: 'humanRun_1' },
                { key: 'humanRun_2' },
                { key: 'humanRun_3' },
                { key: 'humanRun_4' },
                { key: 'humanRun_5' },
                { key: 'humanRun_6' },
                { key: 'humanRun_7' },
                { key: 'humanRun_8' },
                { key: 'humanRun_9' },
                { key: 'humanRun_10' }
            ], frameRate: 14, repeat: -1
        });
        this.scene.anims.create({
            key: 'human_jump',
            frames: [
                { key: 'humanJump_0' },
                { key: 'humanJump_1' },
                { key: 'humanJump_2' },
                { key: 'humanJump_3' },
                { key: 'humanJump_4' },
                { key: 'humanJump_5' }
            ], frameRate: 14, repeat: -1
        });

    }

    updateLevel(level, callback, ground) {
        this.level = level;
        this._currPlayer.setTexture(levelSprites[level]);
        this._currPlayer.play(levelRunAnims[level]);

        this.evolvePlayer(level, callback, ground);
    }

    evolvePlayer(level, _callback, ground) {
        const flickerDuration = 2000; // 2 seconds
        const flickerInterval = 100;  // toggle every 100ms

        let elapsed = 0;

        AudioManager.getInstance(this).playSFX('evolve', { loop: false, volume: 1 });
        let currLevel = level - 1;
        let nextLevel = level;

        var x = this._currPlayer.x;

        // Timer event for flickering
        const flickerEvent = this.scene.time.addEvent({
            delay: flickerInterval,
            loop: true,
            callback: () => {
                this._currPlayer.setY(ground.y - this._currPlayer.height);


                if (elapsed < 600) {
                    this._currPlayer.setVisible(!this._currPlayer.visible);
                }
                else if (elapsed < 1200) {
                    level = (level == currLevel) ? nextLevel : currLevel;
                    this._currPlayer.setTexture(levelSprites[level]);
                    this._currPlayer.setY(ground.y - this._currPlayer.height);
                }
                else {
                    this._currPlayer.setTexture(levelSprites[nextLevel]);
                    this._currPlayer.setY(ground.y - this._currPlayer.height);
                    this._currPlayer.setVisible(!this._currPlayer.visible);
                }


                elapsed += flickerInterval;
                // Stop after flickerDuration
                if (elapsed >= flickerDuration) {
                    flickerEvent.remove();
                    this._currPlayer.setVisible(true); // ensure visible

                    this._currPlayer.setTexture(levelSprites[nextLevel]); // switch sprite
                    this._currPlayer.play(levelRunAnims[nextLevel]);


                }

                this._currPlayer.body.setSize(this._currPlayer.width, this._currPlayer.height, true);
                this._currPlayer.setCollideWorldBounds(true); // Enable world bounds collision

                _callback();
            }
        });
    }

    deadth(exit) {
        // this._currPlayer.setVisible(false);
        this._explosion.setVisible(true);
        AudioManager.getInstance(this).playSFX('gameOver', { loop: false, volume: 1 });
        AudioManager.getInstance(this).stopMusic();
        this._currPlayer.anims.stop();
        this._currPlayer.setVisible(false);
        if (this.level == 0 || this.level == 1) {
            this._explosion.anims.play('explosion_small', true);
            this._explosion.once(`animationcomplete-explosion_small`, () => {
                exit();
            });
        }
        else {
            this._explosion.anims.play('explosion_large', true);
            this._explosion.once(`animationcomplete-explosion_large`, () => {
                exit();
            });
        }

    }

    jumpStart() {
        this._currPlayer.play(levelJumpAnims[this.level]);
        this._currPlayer.refreshBody();
    }
    jumpOver() {
        this._currPlayer.play(levelRunAnims[this.level]);
        this._currPlayer.refreshBody();
    }
}