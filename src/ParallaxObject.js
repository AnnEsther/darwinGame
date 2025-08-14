export default class ParallaxObject {

    constructor(physicsGroup, config) {
        this.physicsGroup = physicsGroup;
        this.sceneWidth = config.sceneWidth;

        var text0 = '';
        var text1 = '';
        if(config.texture1 == null){
            text0 = config.texture0;
            text1 = config.texture0;
        }
        else{
            text0 = config.texture0;
            text1 = config.texture1;
        }
        

        this._0 = this.physicsGroup.create(config.x, config.y, text0);
        this._0.setOrigin(config.origin[0], config.origin[1]);

        // this._0.setDisplaySize(config.displaySize[0]);
        const originalWidth = this._0.width;
        const desiredWidth = config.displaySize[0];
        const scaleRatio = desiredWidth / originalWidth;

        this._0.setScale(scaleRatio);
        this._0.setVelocityX(config.velocity); // move left
        this._0.setImmovable(config.immovable);
        this._0.body.allowGravity = config.allowGravity;



        this._1 = this.physicsGroup.create(this.sceneWidth, config.y, text1);
        this._1.setOrigin(config.origin[0], config.origin[1]);

        // this._1.setDisplaySize(config.displaySize[0]);
        this._1.setScale(scaleRatio);

        this._1.setVelocityX(config.velocity); // move left
        this._1.setImmovable(config.immovable);
        this._1.body.allowGravity = config.allowGravity;
    }

    update() {
        if (this._0.x + this.sceneWidth <= 0) { this._0.x = this._1.x + this.sceneWidth; }
        else if (this._1.x + this.sceneWidth <= 0) { this._1.x = this._0.x + this.sceneWidth; }
    }

    setSpeed(newSpeed) {
        this._0.setVelocityX(newSpeed);
        this._1.setVelocityX(newSpeed);
    }

    getHeight(){
        return this._0.displayHeight;
    }

    setZIndex(zIndex){
        this._0.setDepth(zIndex); // move to front/back inside layer
        this._1.setDepth(zIndex); // move to front/back inside layer
    }

}