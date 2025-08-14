export default class Rock {
    constructor(scene, x, y, speed) {
        this.scene =scene;
        // Create _sprite sprite with physics enabled
        this._sprite = this.scene.physics.add.sprite(x, y, 'rock1');
        
        this._sprite.body.setAllowGravity(false); // Disable gravity so it never falls
        this._sprite.setVelocityX(speed); // Keep horizontal movement
        this._sprite.setImmovable(true);  // Make sure other objects don't push it
        this._sprite.setBounce(0);// Optional: prevent bouncing on collisions
        
        this._sprite.playerPassed = false;// Flag for tracking pass

    }

    updateSprite(){
        var nextRock = Math.floor(Math.random() * 3) + 1;
        this._sprite.setTexture('rock'+nextRock);
        this._sprite.body.setSize( this._sprite.displayWidth, this._sprite.displayHeight, true );

    }
}