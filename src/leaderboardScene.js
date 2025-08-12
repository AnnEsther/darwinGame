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

    create() {
        // Update and store high scores
        this.highScores.push({ name: this.playerName, coins: this.coins });
        this.highScores.sort((a, b) => b.coins - a.coins);
        this.highScores = this.highScores.slice(0, 5);

        this.add.text(250, 150, 'Leaderboard', { fontSize: '40px', fill: '#fff' });

        this.highScores.forEach((entry, index) => {
            this.add.text(220, 220 + index * 30, `${index + 1}. ${entry.name} - ${entry.coins} coins`, {
                fontSize: '24px',
                fill: '#ffff00'
            });
        });

        this.time.delayedCall(2000, () => {
            this.scene.start('LandingScene');
        });
    }
}