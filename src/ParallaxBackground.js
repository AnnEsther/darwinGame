import ParallaxObject from "./ParallaxObject";


export default class ParallaxBackground {
    constructor(scene, speed = 200) {
        this.scene = scene;
        this.speed = speed;
        this.physicsGroup = scene.physics.add.group({ allowGravity: false, immovable: true });

        const sceneWidth = this.scene.scale.width;
        const sceneHeight = this.scene.scale.height;

        // Background Blue ------------------------

        this.background = this.physicsGroup.create(0, 0, 'Sky');
        this.background.setOrigin(0,0);
        this.background.setImmovable(true);
        this.background.body.allowGravity = false;


        // Cloud ----------------------------------------

        var cloudConfig ={
            x : 0,
            y : 0,
            texture: 'Cloud0',
            origin : [0,0],
            displaySize : [sceneWidth, sceneHeight],
            velocity: speed * 0.2,
            immovable: true,
            allowGravity : false,
            sceneWidth: sceneWidth,
            
        };
        this.cloud = new ParallaxObject(this.physicsGroup, cloudConfig);

        // Ground ----------------------------------------

        var groundConfig ={
            x : 0,
            y : sceneHeight,
            texture: 'Ground',
            origin : [0,1],
            displaySize : [sceneWidth, sceneHeight],
            velocity: speed,
            immovable: true,
            allowGravity : false,
            sceneWidth: sceneWidth
        };
        this.ground = new ParallaxObject(this.physicsGroup, groundConfig);

        // Grass ----------------------------------------

        var grassConfig ={
            x : 0,
            y : sceneHeight,
            texture: 'Grass',
            origin : [0,1],
            displaySize : [sceneWidth, sceneHeight],
            velocity: speed * 1.2,
            immovable: true,
            allowGravity : false,
            sceneWidth: sceneWidth
        };
        this.grass = new ParallaxObject(this.physicsGroup, grassConfig);

    }

    update() {

        const width = this.scene.scale.width;

        this.cloud.update();
        this.ground.update();
        this.grass.update();

    }

    setSpeed(newSpeed) {
        this.speed = newSpeed;

        this.cloud.setSpeed(newSpeed * 0.2);
        this.ground.setSpeed(newSpeed);
        this.grass.setSpeed(newSpeed * 1.2);

    }
}
