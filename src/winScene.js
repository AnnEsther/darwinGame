// Win Scene
export default class WinScene extends Phaser.Scene {
    constructor() { super('WinScene'); }
    init(data) {
        this.timeTaken = data.time;
    }
    create() {
        this.add.text(250, 250, 'You Win!', { fontSize: '48px', fill: '#fff' });
        this.add.text(250, 320, `Time: ${this.timeTaken} seconds`, { fontSize: '24px', fill: '#fff' });
    }
}


