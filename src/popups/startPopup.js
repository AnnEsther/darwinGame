import TextInputBox from "../textInputBox";
import TintButton from "../tintButton";

const padding = 50;

export default class StartPopup {
    constructor(scene, onStartCallback) {
        this.scene = scene;
        this.onStartCallback = onStartCallback;

        // Semi-transparent overlay

        // DarwinBox presents
        // this.company = scene.add.text(scene.scale.width / 2, 200, 'darwinbox', {
        //     fontSize: '72px',
        //     color: '#ffffff',
        //     fontStyle: 'bold'
        // }).setOrigin(0.5);
        // this.presents = scene.add.text(scene.scale.width / 2, 250, 'PRESENTS', {
        //     fontSize: '48px',
        //     color: '#ffffff',
        //     fontStyle: 'bold'
        // }).setOrigin(0.5);

        // // Title
        // this.title = scene.add.text(scene.scale.width / 2, scene.scale.height * 0.62, 'Evolve or', {
        //     fontSize: '96px',
        //     color: '#ffffff',
        //     fontStyle: 'bold'
        // }).setOrigin(0.5);
        // this.title2 = scene.add.text(scene.scale.width / 2, this.title.y + 50, 'Fossilize', {
        //     fontSize: '96px',
        //     color: '#ffffff',
        //     fontStyle: 'bold'
        // }).setOrigin(0.5);

        this.logo = scene.add.sprite(scene.scale.width/2, scene.scale.height/2 + 70, 'Logo').setOrigin(0.5);
        this.logo.setScale(3);
        // Subtitle
        // this.subtitle = scene.add.text(400, 260, 'Click to continue', {
        //     fontSize: '24px',
        //     color: '#dddddd'
        // }).setOrigin(0.5);

        // Wait for first click
        scene.input.once('pointerdown', () => this.showForm());
        this.scene.time.delayedCall(3000, () => {
            this.showForm();
        });

        //create objects
        this.coin = this.scene.add.sprite(this.scene.scale.width * 0.5, this.scene.scale.height * 0.2, 'coin0000').setOrigin(0.5, 0.5);
        this.coin.setVisible(false);

        this.nameBox = new TextInputBox(this.scene, this.coin.x, this.coin.y + (this.coin.height * 2) + padding, 420, '', {
            placeholder: '_YourName_',
            maxLength: 40,
            onEnter: () => this.companyBox.focus(),
            bgKey: 'nameLabel'
        });
        this.nameBox.setVisible(false);

        this.companyBox = new TextInputBox(this.scene, this.nameBox.x, this.nameBox.y + (this.nameBox.height) + padding, 420, '', {
            placeholder: '_CompanyName_',
            maxLength: 60,
            onEnter: () => this.emailBox.focus(),
            bgKey: 'companyLabel'
        });
        this.companyBox.setVisible(false);

        this.emailBox = new TextInputBox(this.scene, this.nameBox.x, this.companyBox.y + (this.companyBox.height) + padding, 420, '', {
            type: 'email',
            required: true,
            placeholder: "_Email_",
            // basic email-friendly chars
            charPattern: /^[a-zA-Z0-9@._+\-]$/,
            onEnter: () => this.trySubmit(),
            bgKey: 'emailLabel'
        });
        this.emailBox.setVisible(false);

        this.submitBg = new TintButton(this.scene,
            this.nameBox.x,
            this.emailBox.y + (this.emailBox.height / 2) + padding,
            'startBtn',
            '',
            this.trySubmit.bind(this),
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
        this.submitBg.setVisible(false);


        this.instructionBox = this.scene.add.sprite(padding, 0, 'instructionBox').setOrigin(0, 1);
        this.instructionBox.setY(this.scene.scale.height - padding);
        this.instructionBox.setVisible(false);

        this.instructionBox_text = this.scene.add.text(
            this.instructionBox.x + this.instructionBox.width / 2, // X position (center of the camera)
            this.instructionBox.y - this.instructionBox.height / 2, // Y position (center of the camera)
            'Catch the coins!\ndon\'t touch the fossils!', // Text content with new lines
            {
                fontFamily: 'Arial',
                fontSize: '24px',
                fill: '#000000ff',
                align: 'center' // This aligns multi-line text horizontally
            }
        );
        this.instructionBox_text.setOrigin(0.5, 0.5);
        this.instructionBox_text.setVisible(false);

    }

    showForm() {
        // Remove initial title/subtitle
        // this.company.setVisible(false);
        // this.presents.setVisible(false);
        // this.title.setVisible(false);
        // this.title2.setVisible(false);
        // this.subtitle.setVisible(false);
        this.logo.setVisible(false);

        //Coin
        this.coin.setVisible(true);
        this.coin.setScale(2);
        this.coin.play('coinSpin');
        this.coin.anims.timeScale = 0.5;

        // Labels + inputs
        this.nameBox.setVisible(true);
        this.companyBox.setVisible(true);
        this.emailBox.setVisible(true);
        this.submitBg.setVisible(true);
        this.instructionBox.setVisible(true);
        this.instructionBox_text.setVisible(true);


        // Focus first field
        // this.nameBox.focus();

    }

    updateDisplay() {
        const cursor = this.cursorVisible ? '|' : ' ';
        const currentField = this.inputFields[this.currentFieldIndex];

        // Highlight the current field with a different color and background
        if (currentField === 'name') {
            this.fieldTexts.name.setFill('#ffffff');
            this.fieldTexts.company.setFill('#ffff00');
            this.fieldTexts.email.setFill('#ffff00');
            this.backgroundRects.name.setStrokeStyle(2, 0x88ff88);
            this.backgroundRects.company.setStrokeStyle(2, 0x444444);
            this.backgroundRects.email.setStrokeStyle(2, 0x444444);
        } else if (currentField === 'company') {
            this.fieldTexts.name.setFill('#ffff00');
            this.fieldTexts.email.setFill('#ffff00');
            this.fieldTexts.company.setFill('#ffffff');
            this.backgroundRects.name.setStrokeStyle(2, 0x444444);
            this.backgroundRects.email.setStrokeStyle(2, 0x444444);
            this.backgroundRects.company.setStrokeStyle(2, 0x88ff88);
        }

        this.fieldTexts.name.setText(
            `Name: ${this.inputData.name}${currentField === 'name' ? cursor : ''}`
        );
        this.fieldTexts.company.setText(
            `Company: ${this.inputData.company}${currentField === 'company' ? cursor : ''}`
        );
        this.fieldTexts.email.setText(
            `Email: ${this.inputData.company}${currentField === 'Email' ? cursor : ''}`
        );
    }

    trySubmit() {
        const name = this.nameBox.getValue().trim();
        const company = this.companyBox.getValue().trim();
        const email = this.emailBox.getValue().trim();

        if (!this.emailBox.isValid()) {
            this.emailBox.flashInvalid();          // small feedback
            return;                                // block submit
        }

        // proceed with valid data
        this.onStartCallback?.({ name, company, email});
    }

    setDepth(depth) {

        // this.company.setDepth(depth + 1);
        // this.presents.setDepth(depth + 1);
        // this.title.setDepth(depth + 1);
        // this.title2.setDepth(depth + 1);
        this.logo.setDepth(depth);

        this.nameInput ? this.nameInput.setDepth(depth) : null;
        this.startButton ? this.startButton.setDepth(depth) : null;

        this.nameLabel ? this.nameLabel.setDepth(depth) : null;
        this.nameInput ? this.nameInput.setDepth(depth) : null;

        this.instructionBox.setDepth(depth);
        this.instructionBox_text.setDepth(depth + 1);


    }

    setVisible(flag) {

        // this.company.setVisible(flag);
        // this.presents.setVisible(flag);
        // this.title.setVisible(flag);
        // this.title2.setVisible(flag);
        // this.subtitle.setVisible(flag);

        this.coin.setVisible(flag);
        this.nameBox.setVisible(flag);
        this.companyBox.setVisible(flag);
        this.emailBox.setVisible(flag);
        this.submitBg.setVisible(flag);
        this.instructionBox.setVisible(flag);
        this.instructionBox_text.setVisible(flag);
    }
}
