import LandingScene from './landingScene';
import FormScene from './formScene';
import GameScene from './gameScene';
import GameOverScene from './GameOverScene';
import LeaderboardScene from './leaderboardScene';
import WinScene from './winScene';

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    dom: {
        createContainer: true
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 600 },
            debug: true,
        }
    },
    scene: [LandingScene, FormScene, GameScene, WinScene, GameOverScene, LeaderboardScene],
};

new Phaser.Game(config);
// let highScores = JSON.parse(localStorage.getItem('highScores') || '[]');
