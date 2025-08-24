// RunnerJumpTuner.js
export default class RunnerJumpTuner {
    constructor(scene, player, jumpKey, getSpeed) {
        this.scene = scene;
        this.player = player;                    // your sprite (Arcade)
        this.jumpKey = jumpKey;                  // e.g., this.spaceKey
        this.getSpeed = getSpeed;                // () => Math.abs(rockSpeed)
        this.jumpCount= 0;

        // Tunables
        this.baseGravity = 1500;                 // good starting point
        this.baseJump = -720;                    // base jump impulse
        this.baseMaxFall = 1300;                 // terminal velocity (Y)

        // How strongly to scale with speed (tweak these 3)
        this.kGravity = 1.0;     // gravity += k * speed
        this.kJump = 0.55;       // jump more negative as speed rises
        this.kMaxFall = 0.6;     // faster terminal fall with speed

        // Variable jump & fall feel
        this.lowJumpMult = 2.4;  // when releasing jump early
        this.fallMult = 2.0;     // stronger gravity when falling
        this.apexVelEps = 40;    // soften gravity near apex
        this.apexScale = 0.9;

        this.currentG = this.baseGravity;
        this.currentJump = this.baseJump;

        player.setMaxVelocity(Number.MAX_SAFE_INTEGER, this.baseMaxFall);
    }

    // call whenever speed changes (or every level up)
    retune() {
        const speed = Math.abs(this.getSpeed()); // rockSpeed is negative
        this.currentG = this.baseGravity + this.kGravity * speed;
        this.currentJump = this.baseJump - this.kJump * speed;
        const maxFall = this.baseMaxFall + this.kMaxFall * speed;

        this.player.setGravityY(this.currentG);
        this.player.setMaxVelocity(Number.MAX_SAFE_INTEGER, maxFall);
    }

    // call each frame in update()
    update() {
        const body = this.player.body;
        if (!body) return;

        // Handle jump press with your existing "JustDown"
        if (Phaser.Input.Keyboard.JustDown(this.jumpKey) && this.jumpCount < 1) {
            body.velocity.y = this.currentJump;
            this.jumpCount++;
            this.scene.player.jumpStart();
        }

        // Variable jump (key released while going up) + fall multiplier
        const dt = this.scene.game.loop.delta / 1000; // seconds
        let gScale = 1.0;

        const jumpHeld = this.jumpKey.isDown === true;

        // If going up and player released jump -> cut height by increasing gravity
        if (body.velocity.y < 0 && !jumpHeld) gScale *= this.lowJumpMult;

        // If falling -> apply fall multiplier
        if (body.velocity.y > 0) gScale *= this.fallMult;

        // Slight apex hang
        if (Math.abs(body.velocity.y) <= this.apexVelEps) gScale *= this.apexScale;

        // Apply extra gravity this frame (over Arcade’s per-body gravity)
        const extra = (this.currentG * (gScale - 1)) * dt;
        body.velocity.y = Math.min(body.velocity.y + extra, this.player.body.maxVelocity.y);
    }
}
