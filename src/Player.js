
const levelSprites = ['lizard', 'monkey_1', 'ostrich', 'man'];
export default class Player{
    constructor(scene, config){
        this.scene = scene;

        this._currPlayer = this.scene.physics.add.sprite(config.x, config.y, levelSprites[config.level]);

        this.setVelocityX(config.initialVelocity); // Initial movement (if needed)
        this._currPlayer.setScale(config.scale);
        this._currPlayer.setCollideWorldBounds(true); // Enable world bounds collision
        this._currPlayer.body.setGravityY(config.gravityY);

        this.createAnims();
    }

    getColliders(){
        return this._currPlayer;
    }

    getX(){
        return this._currPlayer.x;
    }

    setX(x){
        return this._currPlayer.x = x;
    }

    setVelocityX(velocity){
        this._currPlayer.setVelocityX(velocity); // Initial movement (if needed)
    }

    updateGravity(gBase, currSpeed, baseSpeed){
        this._currPlayer.body.setGravityY(gBase * (currSpeed / baseSpeed));
    }

    createAnims(){
        this.scene.anims.create({ key: 'monkey_run', 
            frames: [   { key: 'monkey_1' }, { key: 'monkey_2' }, { key: 'monkey_3' }, { key: 'monkey_4' }, { key: 'monkey_5' }, { key: 'monkey_6' },
                        { key: 'monkey_7' }, { key: 'monkey_8' }, { key: 'monkey_9' }, { key: 'monkey_10' }, { key: 'monkey_11' }, { key: 'monkey_12' },
                        { key: 'monkey_13' }, { key: 'monkey_14' }, { key: 'monkey_15' }, { key: 'monkey_16' }, { key: 'monkey_17' }, { key: 'monkey_18' },
                        { key: 'monkey_19' }, { key: 'monkey_20' }, { key: 'monkey_21' }, { key: 'monkey_22' },
            ], frameRate: 14, repeat: -1
        });
        this.scene.anims.create({ key: 'monkey_jump',
            frames: [   { key: 'monkeyJump_1' }, { key: 'monkeyJump_2' }, { key: 'monkeyJump_3' }, { key: 'monkeyJump_4' }, { key: 'monkeyJump_5' }, { key: 'monkeyJump_6' },
                        { key: 'monkeyJump_7' }, { key: 'monkeyJump_8' }, { key: 'monkeyJump_9' }, { key: 'monkeyJump_10' }, { key: 'monkeyJump_11' }, { key: 'monkeyJump_12' },
                        { key: 'monkeyJump_13' }, { key: 'monkeyJump_14' }, { key: 'monkeyJump_15' }, { key: 'monkeyJump_16' }, { key: 'monkeyJump_17' }, { key: 'monkeyJump_18' },
                        { key: 'monkeyJump_19' }, { key: 'monkeyJump_20' }, { key: 'monkeyJump_21' }, { key: 'monkeyJump_22' }, { key: 'monkeyJump_23' }, { key: 'monkeyJump_24' },
                        { key: 'monkeyJump_25' }, { key: 'monkeyJump_26' }
            ], frameRate: 14, repeat: 0
        });
        // Listen for animation complete event
        this._currPlayer.on('animationcomplete-monkey_jump', () => {
            // console.log('Run animation completed!');
            // Your custom code here - switch to jump
            this._currPlayer.play('monkey_run');
        });
    }

    updateLevel(level){

        this._currPlayer.setTexture(levelSprites[level]);
        this._currPlayer.setScale(1 / 2);
        this._currPlayer.body.setSize(this._currPlayer.width, this._currPlayer.height, true);
        if (level == 1) {
            this._currPlayer.setScale(0.15);
            this._currPlayer.play('monkey_run');
            }
    }
    
}