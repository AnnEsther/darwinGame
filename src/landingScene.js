// Landing Page
export default class LandingScene extends Phaser.Scene {
    constructor() { super('LandingScene'); }
    create() {
        const logo = this.add.text(300, 250, 'Company Logo', { fontSize: '32px', fill: '#fff' });
        const startText = this.add.text(280, 300, 'Loading...', { fontSize: '24px', fill: '#fff' });

        this.time.delayedCall(2000, () => {
            this.scene.start('GameScene');
        });
    }
}