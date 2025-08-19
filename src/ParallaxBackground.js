import ParallaxObject from "./ParallaxObject";

const groundTopBuffer = -25
const groundBottomBuffer = 0;

export default class ParallaxBackground {
    constructor(scene, speed = 200, onGround0Reset) {
        this.scene = scene;
        this.speed = speed;
        this.onGround0Reset = onGround0Reset;
        this.physicsGroup = scene.physics.add.group({ allowGravity: false, immovable: true });

        const sceneWidth = this.scene.scale.width;
        const sceneHeight = this.scene.scale.height;

        // Background Blue ------------------------

        this.background = this.physicsGroup.create(0, 0, 'background');
        this.background.setOrigin(0,0);
        this.background.setScale(1.15,1.15);
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

         var cloudSmallConfig ={
            x : 0,
            y : this.ground._0.y - this.ground.getHeight() - groundTopBuffer,
            texture0: 'cloud_small_0',
            texture1: null,
            origin : [0,0],
            displaySize : [sceneWidth, sceneHeight],
            velocity: speed * 0.4,
            immovable: true,
            allowGravity : false,
            sceneWidth: sceneWidth
        };
        this.cloudSmall = new ParallaxObject(this.physicsGroup, cloudSmallConfig);
        this.cloudSmall._0.setY(this.cloudSmall._0.y - this.cloudSmall._0.height - (Math.random() * (sceneHeight-this.cloudSmall._0.y - this.cloudSmall._0.height - 100)));
        this.cloudSmall._1.setY(this.cloudSmall._1.y - - this.cloudSmall._0.height - (Math.random() * (sceneHeight-this.cloudSmall._1.y - this.cloudSmall._1.height - 100)));
        // this.cloudSmall._1.flipX = true; // Flip horizontally

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
            texture0: 'grass_0',
            texture1: 'grass_1',
            origin : [0,1],
            displaySize : [sceneWidth, sceneHeight],
            velocity: speed * 1.2,
            immovable: true,
            allowGravity : false,
            sceneWidth: sceneWidth
        };
        this.grass = new ParallaxObject(this.physicsGroup, grassConfig);
        // this.grass._1.flipX = true; // Flip horizontally


        this.ground.setZIndex(5);
        this.grass.setZIndex(6);

    }

    update() {

        const width = this.scene.scale.width;

        this.cloud.update();
        this.backgroundItem.update();
        var reset = this.ground.update();
        if(reset[0]){
            this.onGround0Reset();
        }
        this.grass.update();

    }

    setVelocityX(newSpeed) {
        this.speed = newSpeed;

        this.cloud.setVelocityX(newSpeed * 0.2);
        this.backgroundItem.setVelocityX(newSpeed * 0.8);
        this.ground.setVelocityX(newSpeed);
        this.grass.setVelocityX(newSpeed * 1.2);

    }
}
