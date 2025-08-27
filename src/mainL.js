import LeaderboardScene from './scenes/leaderboardScene';
import LandingSceneL from './scenes/landingSceneL';

const config = {
    type: Phaser.AUTO,
    width: 1920,
    height: 1080,
    parent: 'game-holder',
    dom: {
        createContainer: true
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 700 },
            debug: false,
        }
    },
    scene: [LandingSceneL, LeaderboardScene],
};

new Phaser.Game(config);