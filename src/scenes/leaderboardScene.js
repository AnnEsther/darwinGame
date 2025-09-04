import LeaderboardPopup from "../popups/LeaderboardPopup";
import ParallaxBackground from '../ParallaxBackground.js';

// Leaderboard Scene
export default class LeaderboardScene extends Phaser.Scene {
    constructor() {
        super('LeaderboardScene');
    }

    init(data) {
        this.playerName = data.playerName;
        this.coins = data.coins;
        this.highScores = [];
    }

    async create() {

        this.background = new ParallaxBackground(this, () => { });
        this.background.setVelocityX(-700);

        const scores = await this.fetchLeaderboard();

        this.leaderboard = new LeaderboardPopup(
            this,
            this.cameras.main.centerX,
            this.cameras.main.centerY,
            this.highScores,
            this.scale.width / 2, this.scale.height / 2,
            { overlay: true } // dims the scene & blocks input behind
        );

        this.leaderboard.setDepth(10);

        // (optional) open via a key
        // this.input.keyboard.on('keydown-L', () => {
        //     if (!this.leaderboard || !this.leaderboard.scene) {
        //         this.leaderboard = new LeaderboardPopup(this, this.cameras.main.centerX, this.cameras.main.centerY, scores, 360, 320, { overlay: true });
        //     }
        // });

        this.updateScore(scores); // e.g., popup.setScores(scores)


        this.polling = this.startLeaderboardPolling(this.updateScore.bind(this));


    }

    updateScore(scores) {
        this.leaderboard.setScores(scores);
    }

    startLeaderboardPolling(callback) {
        const interval = setInterval(async () => {
            try {
                const scores = await this.fetchLeaderboard();
                callback(scores); // e.g., popup.setScores(scores)
            } catch (err) {
                console.error('Failed to fetch leaderboard:', err);
            }
        }, 10000);
        return interval; // use clearInterval(interval) to stop
    }

    async fetchLeaderboard() {
        const res = await fetch('https://darwinbox.com/api/videoGame/leaderboard', {
            method: 'GET',
            headers: { 'Accept': 'application/json' }
        });
        if (!res.ok) throw new Error(`Leaderboard failed: ${res.status}`);
        const data = await res.json();
        return (data.leaderboard || []).map(item => ({
            name: item.userName,
            score: Number(item.userScore) || 0
        }));
    }
}