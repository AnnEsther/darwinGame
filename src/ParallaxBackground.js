import ParallaxObject from "./ParallaxObject";

const groundTopBuffer = -80;
const groundBottomBuffer = -75;

export default class ParallaxBackground {
    constructor(scene, speed = 200) {
        this.scene = scene;
        this.speed = speed;
        this.physicsGroup = scene.physics.add.group({ allowGravity: false, immovable: true });

        const sceneWidth = this.scene.scale.width;
        const sceneHeight = this.scene.scale.height;

        // Background Blue ------------------------

        this.background = this.physicsGroup.create(0, 0, 'background');
        this.background.setOrigin(0,0);
        this.background.setImmovable(true);
        this.background.body.allowGravity = false;

        // Ground ----------------------------------------

        var groundConfig ={
            x : 0,
            y : sceneHeight + groundBottomBuffer,
            texture0: 'ground_0',
            // texture1: null,
            texture1: 'ground_1',
            origin : [0,1],
            displaySize : [sceneWidth, sceneHeight],
            velocity: speed,
            immovable: true,
            allowGravity : false,
            sceneWidth: sceneWidth
        };
        this.ground = new ParallaxObject(this.physicsGroup, groundConfig);

        // Cloud ----------------------------------------

        var cloudConfig ={
            x : 0,
            y : this.ground._0.y - this.ground.getHeight() - groundTopBuffer,
            texture0: 'cloud_big',
            texture1: null,
            origin : [0,0],
            displaySize : [sceneWidth, sceneHeight],
            velocity: speed * 0.2,
            immovable: true,
            allowGravity : false,
            sceneWidth: sceneWidth
        };
        this.cloud = new ParallaxObject(this.physicsGroup, cloudConfig);
        this.cloud._0.setY(this.cloud._0.y - (this.cloud._0.displayHeight));
        this.cloud._1.setY(this.cloud._1.y - (this.cloud._1.displayHeight));
        this.cloud._1.flipX = true; // Flip horizontally

        // Background items ----------------------------------------

        var backgroundItemConfig ={
            x : 0,
            y : this.ground._0.y - this.ground.getHeight() - groundTopBuffer,
            texture0: 'background_item',
            texture1: null,
            origin : [0,0],
            displaySize : [sceneWidth, sceneHeight],
            velocity: speed * 0.8,
            immovable: true,
            allowGravity : false,
            sceneWidth: sceneWidth
            
        };
        this.backgroundItem = new ParallaxObject(this.physicsGroup, backgroundItemConfig);
        this.backgroundItem._0.setY(this.backgroundItem._0.y - (this.backgroundItem._0.displayHeight));
        this.backgroundItem._1.setY(this.backgroundItem._1.y - (this.backgroundItem._1.displayHeight));


        // Grass ----------------------------------------

        var grassConfig ={
            x : 0,
            y : sceneHeight,
            texture0: 'Grass',
            texture1: null,
            origin : [0,1],
            displaySize : [sceneWidth, sceneHeight],
            velocity: speed * 1.2,
            immovable: true,
            allowGravity : false,
            sceneWidth: sceneWidth
        };
        this.grass = new ParallaxObject(this.physicsGroup, grassConfig);
        this.grass._1.flipX = true; // Flip horizontally


        this.ground.setZIndex(5);
        this.grass.setZIndex(6);

    }

    update() {

        const width = this.scene.scale.width;

        this.cloud.update();
        this.backgroundItem.update();
        this.ground.update();
        this.grass.update();

    }

    setSpeed(newSpeed) {
        this.speed = newSpeed;

        this.cloud.setSpeed(newSpeed * 0.2);
        this.backgroundItem.setSpeed(newSpeed * 0.8);
        this.ground.setSpeed(newSpeed);
        this.grass.setSpeed(newSpeed * 1.2);

    }
}
