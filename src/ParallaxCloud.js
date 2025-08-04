export default class ParallaxClouds {
    constructor(scene, textureKey = 'clouds', speed = 200) {
        this.scene = scene;
        this.speed = speed;
        this.layers = scene.physics.add.group({ allowGravity: false, immovable: true });

        const { width, height } = scene.scale;

        // Get the original image dimensions to calculate scale
        const texture = scene.textures.get(textureKey);
        const imgWidth = texture.getSourceImage().width;
        const imgHeight = texture.getSourceImage().height;

        const scaleY = height / imgHeight;
        const scaledWidth = imgWidth * scaleY;

        for (let i = 0; i < 2; i++) {

            const cloud = this.layers.create(i * width, 0, textureKey);
            cloud.setOrigin(0, 0);
            cloud.setVelocityX(speed); // move left
            cloud.setImmovable(true);
            cloud.body.allowGravity = false;

            cloud.displayWidth = width;
            cloud.displayHeight = height;

        }

        this.scaledWidth = scaledWidth;

    }

    update() {

        const clouds = this.layers.getChildren(); // returns array

        const { width, height } = this.scene.scale;
        
        if(clouds[0].x + width <= 0){
            clouds[0].x = clouds[1].x + width;
        }
        else if(clouds[1].x + width <= 0){
            clouds[1].x = clouds[0].x + width;
        }
    }

    setSpeed(newSpeed) {
        this.speed = newSpeed;
    }
}
