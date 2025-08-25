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
        this.load.image('bg', 'assetsL/leaderboard_bg.png');
        this.load.image('item_bg', 'assetsL/leaderboard_item.png');
        this.load.image('slide', 'assetsL/leaderboard_slider.png');
        this.load.image('slider', 'assetsL/leaderboard_slide.png');
        

    }

    create() {

        this.time.delayedCall(2000, () => {
            this.scene.start('LeaderboardScene', {getInfo:true, name: '', company: '', email: ''});
        });
    }
}