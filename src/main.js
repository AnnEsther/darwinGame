import LandingScene from './scenes/landingScene';
import GameScene from './scenes/gameScene';
import GameOverScene from './GameOverScene';
import LeaderboardScene from './leaderboardScene';

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
    scene: [LandingScene, GameScene, GameOverScene, LeaderboardScene],
    // scene: [LandingScene, FormScene, GameScene, WinScene, GameOverScene, LeaderboardScene],
};

new Phaser.Game(config);


/* ------------ DONE --------------
coin anim | FIXED
lizard - bird - monkey - human || FIXED
loading screen || FIXED [maybe change colors]
added start pop up
added form logic
set up play
start popup
fix coin spawn location
added bump animation to score update
------------8/23------------
coin spawining
jump logic updated
update jump animation
deadth popup
max number of digits in ui
Fit to screen
center game to the screen
ui

------------------------------------*/

/* ------------ TODO --------------
sfx
api
play dead
nautilus fossil only in the bottom
evolve fall down
another coin sprite for start up pop up?
MISSING : fonts for start screen
fonts
leaderboard popup
orstrich animation falling off ?
fossil file is oversized
updated ground without fossil
updated sprite animations
7. Transformation from Lizard to Ostrich isn’t celebrated ??

jump
------------TO CHECK------------
jump animation
content font error, just pngs will do

------------------------------------*/