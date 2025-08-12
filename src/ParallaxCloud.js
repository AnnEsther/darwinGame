export default class ParallaxClouds {
    constructor(scene, textureKey = 'clouds', speed = 200) {
        this.scene = scene;
        this.speed = speed;
        this.layers = scene.physics.add.group({ allowGravity: false, immovable: true });

        const sceneWidth = this.scene.scale.width;
        const sceneHeight = this.scene.scale.height;

        // Background Blue ------------------------

        this.bg_0 = this.layers.create(0, 0, 'Sky');
        this.bg_0.setOrigin(0, 0);
        this.bg_0.setDisplaySize(sceneWidth, sceneHeight);
        this.bg_0.setVelocityX(speed); // move left
        this.bg_0.setImmovable(true);
        this.bg_0.body.allowGravity = false;

        this.bg_1 = this.layers.create(sceneWidth, 0, 'Sky');
        this.bg_1.setOrigin(0, 0);
        this.bg_1.setDisplaySize(sceneWidth, sceneHeight);
        this.bg_1.setVelocityX(speed); // move left
        this.bg_1.setImmovable(true);
        this.bg_1.body.allowGravity = false;


        // Background cloud ------------------------

        this.cloud0_0 = this.layers.create(0, 0, 'Cloud0');
        this.cloud0_0.setOrigin(0, 0);
        this.cloud0_0.setDisplaySize(sceneWidth, sceneHeight);
        this.cloud0_0.setVelocityX(speed); // move left
        this.cloud0_0.setImmovable(true);
        this.cloud0_0.body.allowGravity = false;

        this.cloud0_1 = this.layers.create(sceneWidth, 0, 'Cloud0');
        this.cloud0_1.setOrigin(0, 0);
        this.cloud0_1.setDisplaySize(sceneWidth, sceneHeight);
        this.cloud0_1.setVelocityX(speed); // move left
        this.cloud0_1.setImmovable(true);
        this.cloud0_1.body.allowGravity = false;

        //Cloud ---------------------------------

        // this.cloud1_0 = this.layers.create(0, 0, 'Cloud1');
        // this.cloud1_0.setOrigin(0, 0);
        // // Scale only width, keep aspect ratio
        // var scaleFactor = sceneWidth / this.cloud1_0.width;
        // this.cloud1_0.setScale(scaleFactor);
        // this.cloud1_0.setVelocityX(speed * 1.3); // move left
        // this.cloud1_0.setImmovable(true);
        // this.cloud1_0.body.allowGravity = false;

        // this.cloud1_1 = this.layers.create(sceneWidth, 0, 'Cloud1');
        // this.cloud1_1.setOrigin(0, 0);
        // // Scale only width, keep aspect ratio
        // scaleFactor = sceneWidth / this.cloud1_1.width;
        // this.cloud1_1.setScale(scaleFactor);
        // this.cloud1_1.setVelocityX(speed * 1.3); // move left
        // this.cloud1_1.setImmovable(true);
        // this.cloud1_1.body.allowGravity = false;

        // Ground ----------------------------------------

        // Scale only width, keep aspect ratio

        this.ground_0 = this.layers.create(0, sceneHeight, 'Ground');
        this.ground_0.setOrigin(0, 1);
        var scaleFactor = sceneWidth / this.ground_0.width;
        this.ground_0.setScale(scaleFactor);
        this.ground_0.setVelocityX(speed); // move left
        this.ground_0.setImmovable(true);
        this.ground_0.body.allowGravity = false;

        this.ground_1 = this.layers.create(sceneWidth, sceneHeight, 'Ground');
        this.ground_1.setOrigin(0, 1);
        this.ground_1.setScale(scaleFactor);
        this.ground_1.setVelocityX(speed); // move left
        this.ground_1.setImmovable(true);
        this.ground_1.body.allowGravity = false;




    }

    update() {

        const width = this.scene.scale.width;

        if (this.bg_0.x + width <= 0) { this.bg_0.x = this.bg_1.x + width; }
        else if (this.bg_1.x + width <= 0) { this.bg_1.x = this.bg_0.x + width; }

        if (this.cloud0_0.x + width <= 0) { this.cloud0_0.x = this.cloud0_1.x + width; }
        else if (this.cloud0_1.x + width <= 0) { this.cloud0_1.x = this.cloud0_0.x + width; }

        // if (this.cloud1_0.x + width <= 0) { this.cloud1_0.x = this.cloud1_1.x + width; }
        // else if (this.cloud1_1.x + width <= 0) { this.cloud1_1.x = this.cloud1_0.x + width; }

        if (this.ground_0.x + width <= 0) { this.ground_0.x = this.ground_1.x + width; }
        else if (this.ground_1.x + width <= 0) { this.ground_1.x = this.ground_0.x + width; }



    }

    setSpeed(newSpeed) {
        this.speed = newSpeed;

        this.bg_0.setVelocityX(this.speed);
        this.bg_1.setVelocityX(this.speed);

        this.cloud0_0.setVelocityX(this.speed);
        this.cloud0_1.setVelocityX(this.speed);

        this.ground_0.setVelocityX(this.speed);
        this.ground_1.setVelocityX(this.speed);

        // this.cloud1_0.setVelocityX(this.speed * 1.3);
        // this.cloud1_1.setVelocityX(this.speed * 1.3);
    }
}
