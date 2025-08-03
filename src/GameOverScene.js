// Game Over Scene
export default class GameOverScene extends Phaser.Scene {
    constructor() {
        super('GameOverScene');
    }
    create() {
        this.add.text(280, 250, 'Game Over', { fontSize: '48px', fill: '#ff0000' });
        this.time.delayedCall(5000, () => {
            this.scene.start('LandingScene');
        });
    }
}