// Leaderboard Scene
export default class LeaderboardScene extends Phaser.Scene {
    constructor() {
        super('LeaderboardScene');
    }

    init(data) {
        this.playerName = data.playerName;
        this.coins = data.coins;
    }

    create() {
        // Update and store high scores
        highScores.push({ name: this.playerName, coins: this.coins });
        highScores.sort((a, b) => b.coins - a.coins);
        highScores = highScores.slice(0, 5);
        localStorage.setItem('highScores', JSON.stringify(highScores));

        this.add.text(250, 150, 'Leaderboard', { fontSize: '40px', fill: '#fff' });

        highScores.forEach((entry, index) => {
            this.add.text(220, 220 + index * 30, `${index + 1}. ${entry.name} - ${entry.coins} coins`, {
                fontSize: '24px',
                fill: '#ffff00'
            });
        });
    }
}