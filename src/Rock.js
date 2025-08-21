import next from "next";

export default class Rock {
    constructor(scene, config) {
        this.scene = scene;
        this.rockBase = config.rockBase;

        this._colliders = [];
        this._sprite = this.scene.physics.add.sprite(config.x, config.y, 'rock1');

        this._sprite.body.setAllowGravity(false); // Disable gravity so it never falls
        this._sprite.setVelocityX(config.speed); // Keep horizontal movement
        this._sprite.setImmovable(true);  // Make sure other objects don't push it
        this._sprite.setBounce(0);// Optional: prevent bouncing on collisions

        this._sprite.playerPassed = false;// Flag for tracking pass

        this.updateSprite(config.x, config.y, config.speed);

    }

    updateSprite(x, y, speed) {

        if (!this.rockRect1) {
            this.rockRect1 = this.scene.physics.add.sprite(x, y + this._sprite.height / 4, null).setOrigin(0.5, 0.5).setVisible(false);
            this.rockRect1.setVelocityX(speed); // Keep horizontal movement
            this.rockRect1.body.setAllowGravity(false);
        }

        if (!this.rockCircle1) {
            this.rockCircle1 = this.scene.physics.add.sprite(x, y - this._sprite.height / 4, null).setOrigin(0.5, 0.5).setVisible(false);
            this.rockCircle1.body.setCircle(10);
            this.rockCircle1.body.setAllowGravity(false);
            this.rockCircle1.setVelocityX(speed); // Keep horizontal movement
        }

        if (!this.rockCircle2) {
            this.rockCircle2 = this.scene.physics.add.sprite(x, y, null).setOrigin(0.5, 0.5).setVisible(false);
            this.rockCircle2.body.setCircle(10);
            this.rockCircle2.body.setAllowGravity(false);
            this.rockCircle2.setVelocityX(speed); // Keep horizontal movement
        }

        if (!this.rockCircle3) {
            this.rockCircle3 = this.scene.physics.add.sprite(x, y, null).setOrigin(0.5, 0.5).setVisible(false);
            this.rockCircle3.body.setCircle(10);
            this.rockCircle3.body.setAllowGravity(false);
            this.rockCircle3.setVelocityX(speed); // Keep horizontal movement
        }

        var nextRock = Math.floor(Math.random() * 3) + 1;
        this._sprite.setTexture('rock' + nextRock);

        switch (nextRock) {
            case 1:
                this.rockRect1.setSize(this._sprite.width * 0.84, this._sprite.height / 3, true);
                this.rockCircle1.body.setCircle(this._sprite.width * 0.3);
                this.rockCircle1.body.setOffset(-15, -8);
                this.rockCircle2.body.setCircle(20);
                this.rockCircle2.body.setOffset(-33, 5);
                this.rockCircle3.body.setCircle(20);
                this.rockCircle3.body.setOffset(40, -78);
                break;
            case 2:
                this.rockRect1.setSize(this._sprite.width * 0.95, this._sprite.height / 2, true);
                this.rockCircle1.body.setCircle((this._sprite.height / 2) * 0.8);
                this.rockCircle1.body.setOffset(-50, -20);
                this.rockCircle2.body.setCircle(20);
                this.rockCircle2.body.setOffset(-70, -10);

                this.rockCircle3.body.setCircle(20);
                this.rockCircle3.body.setOffset(-70, -10);
                break;
            case 3:
                this.rockRect1.setSize(this._sprite.width * 0.95, this._sprite.height * 0.6, true);
                this.rockRect1.setOffset(-60, -40);
                this.rockCircle1.body.setCircle((this._sprite.height / 2) * 0.72);
                this.rockCircle1.body.setOffset(-30, -10);
                this.rockCircle2.body.setCircle(20);
                this.rockCircle2.body.setOffset(-50, -10);

                this.rockCircle3.body.setCircle(20);
                this.rockCircle3.body.setOffset(-50, -10);
                break;
            case 4:
                this.rockRect1.setSize(this._sprite.width * 0.9, this._sprite.height * 0.4, true);
                this.rockRect1.setOffset(-60, -40);
                this.rockCircle1.body.setCircle((this._sprite.height / 2) * 0.74);
                this.rockCircle1.body.setOffset(-48, -10);
                this.rockCircle2.body.setCircle(20);
                this.rockCircle2.body.setOffset(-15, -70);
                
                this.rockCircle3.body.setCircle(20);
                this.rockCircle3.body.setOffset(-15, -70);
                break;
        }

        this._colliders = [this.rockRect1, this.rockCircle1, this.rockCircle2, this.rockCircle3];
    }

    setVelocityX(speed) {
        this._sprite.setVelocityX(speed);
        this.rockCircle1.setVelocityX(speed);
        this.rockCircle2.setVelocityX(speed);
        this.rockCircle3.setVelocityX(speed);
        this.rockRect1.setVelocityX(speed);
    }

    setX(x) {
        this._sprite.setX(x);//(speed);
        this.rockCircle1.x = x;//(speed);
        this.rockCircle2.x = x;//(speed);
        this.rockCircle3.x = x;//(speed);
        this.rockRect1.x = x;//setVelocityX(speed);
    }

    resetRockPos(speed) {
        this.setVelocityX(0)
        this.updateSprite();
        var nextPos = this.rockBase.x + (Math.random() * this.rockBase.width);
        // console.log("Next Pos : ", nextPos);
        this.setX(nextPos);
        this.playerPassed = false;
        this.setVelocityX(speed);
    }


    getColliders() {
        return this._colliders;
    }

    getX(){
        return this._sprite.x;
    }

    getY(){
        return this._sprite.y;
    }
}