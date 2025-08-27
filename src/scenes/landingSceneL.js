import LoadingOverlay from "../LoadingOverlay";

export default class LandingSceneL extends Phaser.Scene {
    constructor() { super('landingSceneL'); }

    preload() {
        // Create overlay early (before files start)
        this.overlay = new LoadingOverlay(this, { label: 'Loading…' });

        // wire loader events
        this.load.on('progress', (v) => this.overlay.setProgress(v));
        this.load.once('complete', () => {
            this.overlay.setProgress(1);
            this.overlay.close();
            this.scene.start('LeaderboardScene', {getInfo:true, name: '', company: '', email: ''});
            
        });

        // === LOAD EVERYTHING GAME SCENE NEEDS HERE ===
        //BACKGROUND
        this.load.image('background', 'assetsL/Enviornment/background.png');
        this.load.image('background_item', 'assetsL/Enviornment/background_item.png');
        this.load.image('cloud_big', 'assetsL/Enviornment/cloud_big.png');
        this.load.image('cloud_small_0', 'assetsL/Enviornment/cloud_small_0.png');
        this.load.image('ground_0', 'assetsL/Enviornment/ground_0.png');
        this.load.image('ground_1', 'assetsL/Enviornment/ground_1.png');
        this.load.image('grass_0', 'assetsL/Enviornment/grass_0.png');
        this.load.image('grass_1', 'assetsL/Enviornment/grass_1.png');
        //POPUP
        this.load.image('bg', 'assetsL/leaderboard_bg.png');
        this.load.image('item_bg', 'assetsL/leaderboard_item.png');
        this.load.image('slider', 'assetsL/leaderboard_slider.png');
        this.load.image('slide', 'assetsL/leaderboard_slide.png');
        

    }

    create() {

        this.time.delayedCall(2000, () => {
            this.scene.start('LeaderboardScene', {getInfo:true, name: '', company: '', email: ''});
        });
    }
}