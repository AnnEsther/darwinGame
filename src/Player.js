import AudioManager from './AudioManager.js';

// const levelSprites = ['LizardRun_000001', 'monkey_1', 'ostrich', 'man'];
const levelSprites = ['LizardRun_000001', 'ostrichRun_1', 'monkey_1', 'humanRun_0'];
const levelRunAnims = ['lizard_run', 'ostrich_run', 'monkey_run', 'human_run'];
const levelJumpAnims = ['lizard_jump', 'ostrich_jump', 'monkey_jump', 'human_jump'];
export default class Player {
    constructor(scene, config) {
        this.scene = scene;

        this._currPlayer = this.scene.physics.add.sprite(config.x, config.y, levelSprites[config.level]);

        this._evolve = this.scene.add.sprite(config.x, scene.scale.height * 0.25, 'evolveTite');
        this._evolve.setVisible(false);

        this.createAnims();

        this.setVelocityX(config.initialVelocity); // Initial movement (if needed)

        // this.updateLevel(config.level);
        this.level = config.level;
        this._currPlayer.setTexture(levelSprites[this.level]);
        this._currPlayer.play(levelRunAnims[this.level]);


        this._currPlayer.body.setGravityY(config.gravityY);


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
                { key: 'ostrichRun_10' },
                { key: 'ostrichRun_9' },
                { key: 'ostrichRun_8' },
                { key: 'ostrichRun_7' },
                { key: 'ostrichRun_6' },
                { key: 'ostrichRun_5' },
                { key: 'ostrichRun_4' },
                { key: 'ostrichRun_3' },
                { key: 'ostrichRun_2' },
                { key: 'ostrichRun_1' }
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

        let x = this._currPlayer.x;

        const holdMs = 1000;            // use 500000 for 500 seconds
        this._evolve.setScale(0);
        this._evolve.setAlpha(1);
        this._evolve.setVisible(true);

        const pinFeet = () => {
            const s = this._evolve;
            if (!s.body) return;
            s.body.setSize(s.width, s.height, true);
            s.setY(ground.y - s.height);
            s.refreshBody();
        };

        // timeline
        const tl = this.scene.tweens.createTimeline({ loop: 0 });

        // 1) 0 -> 1 (grow in)
        tl.add({
            targets: this._evolve,
            scaleX: 1, scaleY: 1,
            duration: 500,
            ease: 'Back.Out',   // snappy grow-in
            onUpdate: pinFeet
        });

        // 2) bounce to 1.2 and back, twice
        tl.add({
            targets: this._evolve,
            scaleX: 1.2, scaleY: 1.2,
            duration: 300,
            ease: 'Bounce.Out',
            yoyo: true,         // go back to 1
            repeat: 1,          // do the (up->down) cycle twice
            onUpdate: pinFeet
        });

        // 3) hold at 1 for 500 ms (or 500000 ms for 500 sec)
        tl.add({
            targets: this._evolve,
            alpha: 1,           // noop prop → acts as a timed hold
            duration: holdMs,
            onUpdate: pinFeet
        });

        // 4) fade out and hide
        tl.add({
            targets: this._evolve,
            alpha: 0,
            duration: 300,
            ease: 'Sine.In',
            onUpdate: pinFeet,
            onComplete: () => {
                this._evolve.setVisible(false);
                this._evolve.setAlpha(1);   // reset for next time
                this._evolve.setScale(1);   // end state at scale 1
            }
        });

        tl.play();

        AudioManager.getInstance(this.scene).playSFX('evolve', { loop: false, volume: 1 });
        // Timer event for flickering
        const flickerEvent = this.scene.time.addEvent({
            delay: flickerInterval,
            loop: true,
            callback: () => {

                if (elapsed < 400) {
                    this._currPlayer.setVisible(!this._currPlayer.visible);
                }
                else if(elapsed < 800){
                    this._currPlayer.setTexture(levelSprites[level]);
                    this._currPlayer.setVisible(!this._currPlayer.visible);
                }
                else{
                    flickerEvent.remove();
                    this._currPlayer.setVisible(true); // ensure visible
                    this._currPlayer.setTexture(levelSprites[level]); // switch sprite
                    // this._currPlayer.play(levelRunAnims[level]);

                    // stop the zoom effect and restore base scale
                    this._evolve.setVisible(false);
                }

                elapsed += flickerInterval;

                this._currPlayer.body.setSize(this._currPlayer.width, this._currPlayer.height, true);
                // this._currPlayer.setY(ground.y - this._currPlayer.height);
                this._currPlayer.refreshBody();
                this._currPlayer.setCollideWorldBounds(true); // Enable world bounds collision

                _callback();
            }
        });
    }

    deadth(exit) {
        // this._currPlayer.setVisible(false);
        this._explosion.setVisible(true);
        AudioManager.getInstance(this).stopMusic();
        AudioManager.getInstance(this).playSFX('gameOver', { loop: false, volume: 1 });
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