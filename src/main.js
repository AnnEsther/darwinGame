import LandingScene from './scenes/landingScene';
import GameScene from './scenes/gameScene';
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
    scene: [LandingScene, GameScene, LeaderboardScene],
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
ui
Fit to screen
center game to the screen
sfx
play dead
updated ground sprite
start up pop up - coin updated
start screen logo added
------------------------------------*/

/* ------------ TODO --------------
api


evolve fall down

fonts
leaderboard popup
orstrich animation falling off ?
fossil file is oversized
updated ground without fossil
updated sprite animations
7. Transformation from Lizard to Ostrich isn’t celebrated ??


------------TO CHECK------------
jump animation
content font error, just pngs will do
couldnt find updated ground files

------------------------------------*/