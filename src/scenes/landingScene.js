import LoadingOverlay from "../LoadingOverlay";

export default class LandingScene extends Phaser.Scene {
    constructor() { super('LandingScene'); }

    preload() {
        // Create overlay early (before files start)
        this.overlay = new LoadingOverlay(this, { label: 'Loading…' });

        // wire loader events
        this.load.on('progress', (v) => this.overlay.setProgress(v));
        this.load.once('complete', () => {
            this.overlay.setProgress(1);
            this.overlay.close();
            this.scene.start('GameScene', {getInfo:true, name: '', company: '', email: ''});
            
        });

        // === LOAD EVERYTHING GAME SCENE NEEDS HERE ===
        //START POPUP
        this.load.image('Logo', 'assets/ui/logo.png');
        this.load.image('nameLabel', 'assets/ui/nameLabel.png');
        this.load.image('companyLabel', 'assets/ui/companyLabel.png');
        this.load.image('emailLabel', 'assets/ui/mailLabel.png');
        this.load.image('startBtn', 'assets/ui/startBtn.png');
        this.load.image('coin1', 'assets/ui/coin/coin_1.png');
        this.load.image('coin2', 'assets/ui/coin/coin_2.png');
        this.load.image('coin3', 'assets/ui/coin/coin_3.png');
        this.load.image('coin4', 'assets/ui/coin/coin_4.png');
        this.load.image('coin5', 'assets/ui/coin/coin_5.png');
        this.load.image('coin6', 'assets/ui/coin/coin_6.png');
        //UI
        this.load.image('scoreLabel', 'assets/ui/scoreLabel.png');
        this.load.image('coinLabel', 'assets/ui/coinLabel.png');
        this.load.image('instructionBox', 'assets/ui/instructionBox.png');
        //GAME OVER POPUP
        this.load.image('popup_bg', 'assets/ui/popup_bg.png');
        this.load.image('gameOverTitle', 'assets/ui/Game_over_title.png');
        this.load.image('wayToGoTitle', 'assets/ui/Way_to_go.png');
        this.load.image('scorebox', 'assets/ui/scorebox.png');
        this.load.image('lizardFossil', 'assets/ui/lizardFossil.png');
        this.load.image('birdFossil', 'assets/ui/birdFossil.png');
        this.load.image('monkeyFossil', 'assets/ui/monkeyFossil.png');
        this.load.image('Retry', 'assets/ui/Retry.png');
        this.load.image('Close', 'assets/ui/Close.png');

        //SFX
        this.load.audio('click', 'assets/audio/click.wav');
        this.load.audio('collect', 'assets/audio/coinCollect.wav');
        this.load.audio('evolve', 'assets/audio/Evolution.mp3');
        this.load.audio('gameOver', 'assets/audio/GameOver.wav');
        this.load.audio('8BitSpring', 'assets/audio/8BitSpring.mp3');
        this.load.audio('getClappy', 'assets/audio/GetClappy.mp3');
        this.load.audio('jump', 'assets/audio/jump.mp3');
        //COINS
        this.load.image('coin0000', 'assets/Coin/coin0000.png');
        this.load.image('coin0001', 'assets/Coin/coin0001.png');
        this.load.image('coin0002', 'assets/Coin/coin0002.png');
        this.load.image('coin0003', 'assets/Coin/coin0003.png');
        this.load.image('coin0004', 'assets/Coin/coin0004.png');
        this.load.image('coin0005', 'assets/Coin/coin0005.png');
        //BACKGROUND
        this.load.image('background', 'assets/Enviornment/background.png');
        this.load.image('background_item', 'assets/Enviornment/background_item.png');
        this.load.image('cloud_big', 'assets/Enviornment/cloud_big.png');
        this.load.image('cloud_small_0', 'assets/Enviornment/cloud_small_0.png');
        this.load.image('ground_0', 'assets/Enviornment/ground_0.png');
        this.load.image('ground_1', 'assets/Enviornment/ground_1.png');
        this.load.image('grass_0', 'assets/Enviornment/grass_0.png');
        this.load.image('grass_1', 'assets/Enviornment/grass_1.png');
        //FOSSILS
        this.load.image('rock1', 'assets/Fossil/rock1.png');
        this.load.image('rock2', 'assets/Fossil/rock2.png');
        this.load.image('rock3', 'assets/Fossil/rock3.png');
        this.load.image('rock4', 'assets/Fossil/rock4.png');
        this.load.image('rock5', 'assets/Fossil/rock5.png');
        this.load.image('rock6', 'assets/Fossil/rock6.png');
        this.load.image('rock7', 'assets/Fossil/rock7.png');
        this.load.image('rock8', 'assets/Fossil/rock8.png');
        //LIZARD_JUMP
        this.load.image('LizardJump_000001', 'assets/lizard/jump/Lizard_jumpo_000001.png');
        this.load.image('LizardJump_000002', 'assets/lizard/jump/Lizard_jumpo_000003.png');
        this.load.image('LizardJump_000003', 'assets/lizard/jump/Lizard_jumpo_000005.png');
        this.load.image('LizardJump_000004', 'assets/lizard/jump/Lizard_jumpo_000007.png');
        this.load.image('LizardJump_000005', 'assets/lizard/jump/Lizard_jumpo_000009.png');
        this.load.image('LizardJump_000006', 'assets/lizard/jump/Lizard_jumpo_000011.png');
        this.load.image('LizardJump_000007', 'assets/lizard/jump/Lizard_jumpo_000013.png');
        this.load.image('LizardJump_000008', 'assets/lizard/jump/Lizard_jumpo_000015.png');
        //LIZARD_RUN
        this.load.image('LizardRun_000001', 'assets/lizard/run/Lizard_run_000001.png');
        this.load.image('LizardRun_000002', 'assets/lizard/run/Lizard_run_000002.png');
        this.load.image('LizardRun_000003', 'assets/lizard/run/Lizard_run_000003.png');
        this.load.image('LizardRun_000004', 'assets/lizard/run/Lizard_run_000004.png');
        this.load.image('LizardRun_000005', 'assets/lizard/run/Lizard_run_000005.png');
        this.load.image('LizardRun_000006', 'assets/lizard/run/Lizard_run_000006.png');
        this.load.image('LizardRun_000007', 'assets/lizard/run/Lizard_run_000007.png');
        this.load.image('LizardRun_000008', 'assets/lizard/run/Lizard_run_000008.png');
        this.load.image('LizardRun_000009', 'assets/lizard/run/Lizard_run_000009.png');
        this.load.image('LizardRun_000010', 'assets/lizard/run/Lizard_run_000010.png');
        // MONKEY_RUN
        this.load.image('monkey_1', 'assets/monkey/run/mONKEY_RUN_000002.png');
        this.load.image('monkey_2', 'assets/monkey/run/mONKEY_RUN_000004.png');
        this.load.image('monkey_3', 'assets/monkey/run/mONKEY_RUN_000006.png');
        this.load.image('monkey_4', 'assets/monkey/run/mONKEY_RUN_000008.png');
        this.load.image('monkey_5', 'assets/monkey/run/mONKEY_RUN_000010.png');
        this.load.image('monkey_6', 'assets/monkey/run/mONKEY_RUN_000012.png');
        this.load.image('monkey_7', 'assets/monkey/run/mONKEY_RUN_000014.png');
        this.load.image('monkey_8', 'assets/monkey/run/mONKEY_RUN_000016.png');
        this.load.image('monkey_9', 'assets/monkey/run/mONKEY_RUN_000018.png');
        this.load.image('monkey_10', 'assets/monkey/run/mONKEY_RUN_000020.png');
        this.load.image('monkey_11', 'assets/monkey/run/mONKEY_RUN_000021.png');
        //MONKEY_JUMP
        this.load.image('monkeyJump_1', 'assets/monkey/jump/alpha canvas0005.png');
        this.load.image('monkeyJump_2', 'assets/monkey/jump/alpha canvas0007.png');
        this.load.image('monkeyJump_3', 'assets/monkey/jump/alpha canvas0009.png');
        this.load.image('monkeyJump_4', 'assets/monkey/jump/alpha canvas0011.png');
        this.load.image('monkeyJump_5', 'assets/monkey/jump/alpha canvas0013.png');
        this.load.image('monkeyJump_6', 'assets/monkey/jump/alpha canvas0015.png');
        this.load.image('monkeyJump_7', 'assets/monkey/jump/alpha canvas0017.png');
        this.load.image('monkeyJump_8', 'assets/monkey/jump/alpha canvas0019.png');
        //BIRD_RUN
        this.load.image('ostrichRun_1', 'assets/bird/run/ostrich_run(1).png');
        this.load.image('ostrichRun_2', 'assets/bird/run/ostrich_run(2).png');
        this.load.image('ostrichRun_3', 'assets/bird/run/ostrich_run(3).png');
        this.load.image('ostrichRun_4', 'assets/bird/run/ostrich_run(4).png');
        this.load.image('ostrichRun_5', 'assets/bird/run/ostrich_run(5).png');
        this.load.image('ostrichRun_6', 'assets/bird/run/ostrich_run(6).png');
        this.load.image('ostrichRun_7', 'assets/bird/run/ostrich_run(7).png');
        this.load.image('ostrichRun_8', 'assets/bird/run/ostrich_run(8).png');
        this.load.image('ostrichRun_9', 'assets/bird/run/ostrich_run(9).png');
        this.load.image('ostrichRun_10', 'assets/bird/run/ostrich_run(10).png');
        //BIRD_JUMP
        this.load.image('ostrichJump_0', 'assets/bird/jump/ostrich-jump-(1)_0000_Layer-1.png');
        this.load.image('ostrichJump_1', 'assets/bird/jump/ostrich-jump-(1)_0001_ostrich-jump-(2).png');
        this.load.image('ostrichJump_2', 'assets/bird/jump/ostrich-jump-(1)_0002_ostrich-jump-(3).png');
        this.load.image('ostrichJump_3', 'assets/bird/jump/ostrich-jump-(1)_0003_ostrich-jump-(4).png');
        this.load.image('ostrichJump_4', 'assets/bird/jump/ostrich-jump-(1)_0003_ostrich-jump-(5).png');
        this.load.image('ostrichJump_5', 'assets/bird/jump/ostrich-jump-(1)_0003_ostrich-jump-(6).png');
        this.load.image('ostrichJump_6', 'assets/bird/jump/ostrich-jump-(1)_0006_ostrich-jump-(7).png');
        //HUMAN_RUN
        this.load.image('humanRun_0', 'assets/human/run/Man_RUn_00001.png');
        this.load.image('humanRun_1', 'assets/human/run/Man_RUn_00002.png');
        this.load.image('humanRun_2', 'assets/human/run/Man_RUn_00003.png');
        this.load.image('humanRun_3', 'assets/human/run/Man_RUn_00004.png');
        this.load.image('humanRun_4', 'assets/human/run/Man_RUn_00005.png');
        this.load.image('humanRun_5', 'assets/human/run/Man_RUn_00006.png');
        this.load.image('humanRun_6', 'assets/human/run/Man_RUn_00007.png');
        this.load.image('humanRun_7', 'assets/human/run/Man_RUn_00008.png');
        this.load.image('humanRun_8', 'assets/human/run/Man_RUn_00009.png');
        this.load.image('humanRun_9', 'assets/human/run/Man_RUn_00010.png');
        this.load.image('humanRun_10', 'assets/human/run/Man_RUn_00011.png');
        //HUMAN_JUMP        
        this.load.image('humanJump_0', 'assets/human/jump/man_Jump_tk010002.png');
        this.load.image('humanJump_1', 'assets/human/jump/man_Jump_tk010006.png');
        this.load.image('humanJump_2', 'assets/human/jump/man_Jump_tk010008.png');
        this.load.image('humanJump_3', 'assets/human/jump/man_Jump_tk010010.png');
        this.load.image('humanJump_4', 'assets/human/jump/man_Jump_tk010012.png');
        this.load.image('humanJump_5', 'assets/human/jump/man_Jump_tk010014.png');



        this.load.image('explosionSmall_0', 'assets/explosion/small/explosion0000.png');
        this.load.image('explosionSmall_1', 'assets/explosion/small/explosion0001.png');
        this.load.image('explosionSmall_2', 'assets/explosion/small/explosion0002.png');
        this.load.image('explosionSmall_3', 'assets/explosion/small/explosion0003.png');
        this.load.image('explosionSmall_4', 'assets/explosion/small/explosion0004.png');
        this.load.image('explosionSmall_5', 'assets/explosion/small/explosion0005.png');
        this.load.image('explosionSmall_6', 'assets/explosion/small/explosion0006.png');
        this.load.image('explosionSmall_7', 'assets/explosion/small/explosion0007.png');
        this.load.image('explosionSmall_8', 'assets/explosion/small/explosion0008.png');

        this.load.image('explosionLarge_0', 'assets/explosion/large/explosion0000.png');
        this.load.image('explosionLarge_1', 'assets/explosion/large/explosion0001.png');
        this.load.image('explosionLarge_2', 'assets/explosion/large/explosion0002.png');
        this.load.image('explosionLarge_3', 'assets/explosion/large/explosion0003.png');
        this.load.image('explosionLarge_4', 'assets/explosion/large/explosion0004.png');
        this.load.image('explosionLarge_5', 'assets/explosion/large/explosion0005.png');
        this.load.image('explosionLarge_6', 'assets/explosion/large/explosion0006.png');
        this.load.image('explosionLarge_7', 'assets/explosion/large/explosion0007.png');
        this.load.image('explosionLarge_8', 'assets/explosion/large/explosion0008.png');
        
        this.load.image('evolveTite', 'assets/ui/Evolve_title.png');
        

    }

    create() {

        this.time.delayedCall(2000, () => {
            this.scene.start('GameScene', {getInfo:true, name: '', company: '', email: ''});
        });
    }
}