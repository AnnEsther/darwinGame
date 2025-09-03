import next from "next";

export default class Rock {
    constructor(scene, config) {
        this.scene = scene;
        this.rockBase = config.rockBase;
        this.level = 0;

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

        var nextRock = 1;
        // this.level = 3;
        switch (this.level) {
            case 0:
                nextRock = 1 + Math.floor(Math.random() * 3);
                break;
            case 1:
            case 2:
                if (Math.random() > 0.75) {
                    nextRock = 1;
                }
                else {
                    nextRock = 5 + Math.floor(Math.random() * 4);
                }
                break;
            case 3:
            default:
                nextRock = 10 + Math.floor(Math.random() * 2);
                break;
        }

        this._sprite.setTexture('rock' + nextRock);
        // console.log("rock: ", nextRock);

        switch (nextRock) {

            case 2:
                this.rockRect1.setSize(this._sprite.width * 0.95, this._sprite.height / 2, true);
                this.rockCircle1.body.setCircle((this._sprite.height / 2) * 0.8);
                this.rockCircle1.body.setOffset(-30, -0);
                this.rockCircle2.body.setCircle(20);
                this.rockCircle2.body.setOffset(-30, -10);
                this.rockCircle3.body.setCircle(20);
                this.rockCircle3.body.setOffset(-30, -10);
                break;
            case 3:
                this.rockRect1.setSize(this._sprite.width * 0.9, this._sprite.height * 0.6, true);
                this.rockRect1.setOffset(-40, -40);
                this.rockCircle1.body.setCircle(30);
                this.rockCircle1.body.setOffset(-10, 0);
                this.rockCircle2.body.setCircle(20);
                this.rockCircle2.body.setOffset(-40, -10);
                this.rockCircle3.body.setCircle(20);
                this.rockCircle3.body.setOffset(-30, -10);
                break;
            case 4:
                this.rockRect1.setSize(this._sprite.width * 0.9, this._sprite.height * 0.4, true);
                this.rockRect1.setOffset(-40, -40);
                this.rockCircle1.body.setCircle(30);
                this.rockCircle1.body.setOffset(-20, 0);
                this.rockCircle2.body.setCircle(10);
                this.rockCircle2.body.setOffset(-30, -10);
                this.rockCircle3.body.setCircle(20);
                this.rockCircle3.body.setOffset(25, -15);
                break;
            case 5:
                this.rockRect1.setSize(100, 130, true);
                this.rockRect1.setOffset(-30, -90);
                this.rockCircle1.body.setCircle(30);
                this.rockCircle1.body.setOffset(-80, 70);
                this.rockCircle2.body.setCircle(40);
                this.rockCircle2.body.setOffset(20, -20);
                this.rockCircle3.body.setCircle(20);
                this.rockCircle3.body.setOffset(80, 40);
                break;
            case 6:
                this.rockRect1.setSize(120, 50, true);
                this.rockRect1.setOffset(-40, -20);
                this.rockCircle1.body.setCircle(30);
                this.rockCircle1.body.setOffset(-30, 30);
                this.rockCircle2.body.setCircle(40);
                this.rockCircle2.body.setOffset(-10, -50);
                this.rockCircle3.body.setCircle(20);
                this.rockCircle3.body.setOffset(39, -49);
                break;
            case 7:
                this.rockRect1.setSize(140, 50, true);
                this.rockRect1.setOffset(-55, -30);
                this.rockCircle1.body.setCircle(30);
                this.rockCircle1.body.setOffset(-50, 30);
                this.rockCircle2.body.setCircle(40);
                this.rockCircle2.body.setOffset(-20, -60);
                this.rockCircle3.body.setCircle(40);
                this.rockCircle3.body.setOffset(0, -49);
                break;
            case 8:
                this.rockRect1.setSize(190, 50, true);
                this.rockRect1.setOffset(-80, -30);
                this.rockCircle1.body.setCircle(40);
                this.rockCircle1.body.setOffset(-70, 30);
                this.rockCircle2.body.setCircle(40);
                this.rockCircle2.body.setOffset(10, -60);
                this.rockCircle3.body.setCircle(20);
                this.rockCircle3.body.setOffset(60, 0);
                break;
            case 9:
                this.rockRect1.setSize(this._sprite.width * 0.84, this._sprite.height / 3, true);
                this.rockCircle1.body.setCircle(this._sprite.width * 0.3);
                this.rockCircle1.body.setOffset(-45, -10);
                break;
            case 10:
                this.rockRect1.setSize(this._sprite.width, this._sprite.height / 2, true);
                this.rockRect1.body.setOffset(-this._sprite.width/2 + 20, -50);
                this.rockCircle1.body.setCircle(40);
                this.rockCircle1.body.setOffset(-90,-20);
                this.rockCircle2.body.setCircle(80);
                this.rockCircle2.body.setOffset(-30,-40);
                this.rockCircle3.body.setCircle(40);
                this.rockCircle3.body.setOffset(120,-40);
                break;
            case 11:
                this.rockRect1.setSize(this._sprite.width * 0.95, this._sprite.height / 2, true);
                this.rockRect1.body.setOffset(-this._sprite.width/2 + 30, -50);
                this.rockCircle1.body.setCircle(40);
                this.rockCircle1.body.setOffset(-130,0);
                this.rockCircle3.body.setCircle(40);
                this.rockCircle3.body.setOffset(100,-50);
                break;
            case 12:
                this.rockRect1.setSize(this._sprite.width, this._sprite.height / 3, true);
                this.rockCircle1.body.setCircle(50);
                this.rockCircle1.body.setOffset(30, -10);
                this.rockCircle2.body.setCircle(30);
                this.rockCircle2.body.setOffset(-120, 20);
                break;
            case 1:
            default:
                this.rockRect1.setSize(this._sprite.width * 0.84, this._sprite.height / 3, true);
                this.rockCircle1.body.setCircle(this._sprite.width * 0.3);
                this.rockCircle1.body.setOffset(-15, -8);
                this.rockCircle2.body.setCircle(20);
                this.rockCircle2.body.setOffset(-33, 5);
                this.rockCircle3.body.setCircle(20);
                this.rockCircle3.body.setOffset(40, -78);
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
        var nextPos = this.scene.scale.width + (this._sprite.width * (1 + (Math.random() * 2)));
        this.setX(nextPos);
        this.playerPassed = false;
        this.setVelocityX(speed);
    }


    getColliders() {
        return this._colliders;
    }

    getX() {
        return this._sprite.x;
    }

    getY() {
        return this._sprite.y;
    }

    updateLevel(val) {
        this.level = val;
    }
}