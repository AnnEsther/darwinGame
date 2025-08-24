import TintButton from "../tintButton";

const padding = 50;

export default class GameOverPopup {
    constructor(scene, onReload) {
        this.scene = scene;
        this.onReload = onReload;
        this.level = 1;

        this.popupBg = this.scene.add.sprite(this.scene.scale.width * 0.5, this.scene.scale.height * 0.5, 'popup_bg').setOrigin(0.5, 0.5);
        this.scoreBox = this.scene.add.sprite(this.scene.scale.width * 0.5, this.popupBg.y - this.popupBg.height / 2, 'scorebox').setOrigin(0.5, 1);

        this.scoreTitle = this.scene.add.text(this.scoreBox.x - (this.scoreBox.width * 0.2), this.scoreBox.y - (this.scoreBox.height * 0.5), 'SCORE', {
            fontSize: '24px', fontFamily: "nokia",
            color: '#000000ff'
        }).setOrigin(0.5);

        this.score = this.scene.add.text(this.scoreBox.x + (this.scoreBox.width * 0.5) - 100, this.scoreTitle.y, '0000', {
            fontSize: '24px', fontFamily: "nokia",
            color: '#000000ff'
        }).setOrigin(0.5);

        this.title = this.scene.add.text(this.scoreBox.x, this.scoreBox.y + 100, 'GAME OVER', {
            fontSize: '36px', fontFamily: "title",
            color: '#ffffffff'
        }).setOrigin(0.5);

        this.fossil_lizard = this.scene.add.sprite(this.title.x, this.title.y + 100, 'lizardFossil').setOrigin(0.5);
        this.fossil_lizard.setScale(0.3);
        this.fossil_lizard.setPosition(this.popupBg.x, this.popupBg.y);
        this.fossil_lizard.setVisible(false);

        this.fossil_bird = this.scene.add.sprite(this.title.x, this.title.y + 100, 'birdFossil').setOrigin(0.5);
        this.fossil_bird.setScale(0.3);
        this.fossil_bird.setPosition(this.popupBg.x, this.popupBg.y);
        this.fossil_bird.setVisible(false);

        this.fossil_monkey = this.scene.add.sprite(this.title.x, this.title.y + 100, 'monkeyFossil').setOrigin(0.5);
        this.fossil_monkey.setScale(0.3);
        this.fossil_monkey.setPosition(this.popupBg.x, this.popupBg.y+ 25);
        this.fossil_monkey.setVisible(false);

        this.fossil_man = this.scene.add.sprite(this.title.x, this.title.y + 100, 'man').setOrigin(0.5, 0.5);
        this.fossil_man.setScale(2);
        this.fossil_man.setPosition(this.popupBg.x, this.popupBg.y);
        this.fossil_man.setVisible(false);

        this.text = this.scene.add.text(this.popupBg.x, this.popupBg.y + 150, 'You fossilized!\nBetter luck next time!', {
            fontSize: '36px', fontFamily: "nokia",
            color: '#ffffffff',
            align: 'center'
        }).setOrigin(0.5);

        this.redoBtn = new TintButton(this.scene,
            this.popupBg.x - (this.popupBg.width * 0.1),
            this.popupBg.y + (this.popupBg.height / 2) + 25,
            'Retry',
            '',
            () => { this.onReload() },
            {
                fontSize: 22,
                hoverTint: 0xe6e6ff,
                downTint: 0xc7c7ff,
                upTint: null,     // clearTint() on idle
                pressScale: 0.98,
                useHand: true,
                labelDy: 0,
                depth: 20
            }
        );

        this.closeBtn = new TintButton(this.scene,
            this.popupBg.x + (this.popupBg.width * 0.1),
            this.popupBg.y + (this.popupBg.height / 2) + 25,
            'Close',
            '',
            () => { this.scene.scene.start('LandingScene'); },
            {
                fontSize: 22,
                hoverTint: 0xe6e6ff,
                downTint: 0xc7c7ff,
                upTint: null,     // clearTint() on idle
                pressScale: 0.98,
                useHand: true,
                labelDy: 0,
                depth: 20
            }
        );
    }

    setLevel(level) {
        this.level = level;
    }

    setScore(score) {
        this.score.setText(score);
    }

    setDepth(depth) {
        this.popupBg.setDepth(depth);
        this.scoreBox.setDepth(depth);
        depth++;
        this.scoreTitle.setDepth(depth);
        this.score.setDepth(depth);
        this.title.setDepth(depth);

        this.fossil_lizard.setDepth(depth);
        this.fossil_bird.setDepth(depth);
        this.fossil_monkey.setDepth(depth);
        this.fossil_man.setDepth(depth);

        this.text.setDepth(depth);
        this.redoBtn.setDepth(depth);
        this.closeBtn.setDepth(depth);

    }

    setVisible(flag) {
        this.popupBg.setVisible(flag);
        this.scoreBox.setVisible(flag);
        this.scoreTitle.setVisible(flag);
        this.score.setVisible(flag);
        this.title.setVisible(flag);

        console.log(this.level);
        if (this.level == 0) {
            this.fossil_lizard.setVisible(flag);
            this.title.setText("GAME OVER");
            this.text.setPosition(this.text.x, this.fossil_lizard.y + (this.fossil_lizard.height * 0.2))
            this.text.setText("You fossilized!\nBetter luck next time!");

        }
        else if (this.level == 1) {
            this.fossil_bird.setVisible(flag);
            this.title.setText("GAME OVER");
            this.text.setPosition(this.text.x, this.fossil_bird.y + (this.fossil_bird.height * 0.2))
            this.text.setText("You fossilized!\nBetter luck next time!");


        }
        else if (this.level == 2) {
            this.fossil_monkey.setVisible(flag);
            this.title.setText("GAME OVER");
            this.text.setPosition(this.text.x, this.fossil_monkey.y + (this.fossil_monkey.height * 0.2))
            this.text.setText("You fossilized!\nBetter luck next time!");
        }
        else {
            this.fossil_man.setVisible(flag);
            this.title.setText("WAY TO GO!");
            this.text.setText("What will you\nevolve into next?");
            this.fossil_man.play('human_run');

        }

        this.text.setVisible(flag);
        this.redoBtn.setVisible(flag);
        this.closeBtn.setVisible(flag);
    }
}
