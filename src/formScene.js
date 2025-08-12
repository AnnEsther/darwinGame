export default class FormScene extends Phaser.Scene {
  constructor() {
    super('FormScene');
  }

  create() {
    this.inputFields = ['name', 'company'];
    this.inputData = {
      name: '',
      company: ''
    };
    this.currentFieldIndex = 0;
    this.cursorVisible = true;

    this.instructions = this.add.text(200, 120, 'Type your Name and Company (or click fields)', {
      fontSize: '20px',
      fill: '#ffffff'
    });

    // Background rectangles for form elements
    this.backgroundRects = {
      name: this.add.rectangle(400, 212, 420, 40, 0x222222, 0.8)
        .setStrokeStyle(2, 0x444444),
      company: this.add.rectangle(400, 262, 420, 40, 0x222222, 0.8)
        .setStrokeStyle(2, 0x444444),
      submit: this.add.rectangle(250, 332, 120, 40, 0x004400, 0.9)
        .setStrokeStyle(2, 0x006600)
    };

    this.fieldTexts = {
      name: this.add.text(200, 200, 'Name: ', { fontSize: '24px', fill: '#ffff00' }),
      company: this.add.text(200, 250, 'Company: ', { fontSize: '24px', fill: '#ffff00' }),
      submit: this.add.text(200, 320, 'START', { fontSize: '20px', fill: '#00ff00' })
    };

    // Make background rectangles and text fields interactive
    this.backgroundRects.name.setInteractive({ useHandCursor: true });
    this.backgroundRects.company.setInteractive({ useHandCursor: true });
    this.backgroundRects.submit.setInteractive({ useHandCursor: true });
    
    this.fieldTexts.name.setInteractive({ useHandCursor: true });
    this.fieldTexts.company.setInteractive({ useHandCursor: true });
    this.fieldTexts.submit.setInteractive({ useHandCursor: true });

    // Mouse click handlers for fields
    this.fieldTexts.name.on('pointerdown', () => {
      this.currentFieldIndex = 0;
      this.updateDisplay();
    });

    this.fieldTexts.company.on('pointerdown', () => {
      this.currentFieldIndex = 1;
      this.updateDisplay();
    });

    this.backgroundRects.name.on('pointerdown', () => {
      this.currentFieldIndex = 0;
      this.updateDisplay();
    });

    this.backgroundRects.company.on('pointerdown', () => {
      this.currentFieldIndex = 1;
      this.updateDisplay();
    });

    // Submit button handlers
    this.fieldTexts.submit.on('pointerdown', () => {
      this.startGame();
    });

    this.backgroundRects.submit.on('pointerdown', () => {
      this.startGame();
    });

    // Hover effects for better UX
    this.fieldTexts.name.on('pointerover', () => {
      this.fieldTexts.name.setTint(0xffffff);
      this.backgroundRects.name.setFillStyle(0x333333);
    });

    this.fieldTexts.name.on('pointerout', () => {
      this.fieldTexts.name.clearTint();
      this.backgroundRects.name.setFillStyle(0x222222);
    });

    this.backgroundRects.name.on('pointerover', () => {
      this.fieldTexts.name.setTint(0xffffff);
      this.backgroundRects.name.setFillStyle(0x333333);
    });

    this.backgroundRects.name.on('pointerout', () => {
      this.fieldTexts.name.clearTint();
      this.backgroundRects.name.setFillStyle(0x222222);
    });

    this.fieldTexts.company.on('pointerover', () => {
      this.fieldTexts.company.setTint(0xffffff);
      this.backgroundRects.company.setFillStyle(0x333333);
    });

    this.fieldTexts.company.on('pointerout', () => {
      this.fieldTexts.company.clearTint();
      this.backgroundRects.company.setFillStyle(0x222222);
    });

    this.backgroundRects.company.on('pointerover', () => {
      this.fieldTexts.company.setTint(0xffffff);
      this.backgroundRects.company.setFillStyle(0x333333);
    });

    this.backgroundRects.company.on('pointerout', () => {
      this.fieldTexts.company.clearTint();
      this.backgroundRects.company.setFillStyle(0x222222);
    });

    this.fieldTexts.submit.on('pointerover', () => {
      this.fieldTexts.submit.setTint(0x00ffff);
      this.backgroundRects.submit.setFillStyle(0x006600);
    });

    this.fieldTexts.submit.on('pointerout', () => {
      this.fieldTexts.submit.clearTint();
      this.backgroundRects.submit.setFillStyle(0x004400);
    });

    this.backgroundRects.submit.on('pointerover', () => {
      this.fieldTexts.submit.setTint(0x00ffff);
      this.backgroundRects.submit.setFillStyle(0x006600);
    });

    this.backgroundRects.submit.on('pointerout', () => {
      this.fieldTexts.submit.clearTint();
      this.backgroundRects.submit.setFillStyle(0x004400);
    });

    // Cursor timer
    this.time.addEvent({
      delay: 500,
      callback: () => {
        this.cursorVisible = !this.cursorVisible;
        this.updateDisplay();
      },
      loop: true
    });

    // Keyboard input handler (existing functionality)
    this.input.keyboard.on('keydown', (event) => {
      const key = event.key;
      const currentField = this.inputFields[this.currentFieldIndex];

      if (key === 'Backspace') {
        this.inputData[currentField] = this.inputData[currentField].slice(0, -1);
      } else if (key === 'Enter') {
        if (this.currentFieldIndex < this.inputFields.length - 1) {
          this.currentFieldIndex++;
        } else {
          this.startGame();
        }
      } else if (key.length === 1 && /^[a-zA-Z0-9 ]$/.test(key)) {
        this.inputData[currentField] += key;
      }
      this.updateDisplay();
    });

    this.updateDisplay();
  }

  updateDisplay() {
    const cursor = this.cursorVisible ? '|' : ' ';
    const currentField = this.inputFields[this.currentFieldIndex];

    // Highlight the current field with a different color and background
    if (currentField === 'name') {
      this.fieldTexts.name.setFill('#ffffff');
      this.fieldTexts.company.setFill('#ffff00');
      this.backgroundRects.name.setStrokeStyle(2, 0x88ff88);
      this.backgroundRects.company.setStrokeStyle(2, 0x444444);
    } else {
      this.fieldTexts.name.setFill('#ffff00');
      this.fieldTexts.company.setFill('#ffffff');
      this.backgroundRects.name.setStrokeStyle(2, 0x444444);
      this.backgroundRects.company.setStrokeStyle(2, 0x88ff88);
    }

    this.fieldTexts.name.setText(
      `Name: ${this.inputData.name}${currentField === 'name' ? cursor : ''}`
    );
    this.fieldTexts.company.setText(
      `Company: ${this.inputData.company}${currentField === 'company' ? cursor : ''}`
    );
  }

  startGame() {
    const name = this.inputData.name || 'Anonymous';
    const company = this.inputData.company || 'Unknown';
    
    this.fieldTexts.submit.setText(`Welcome ${name} from ${company}!`);
    this.time.delayedCall(1000, () => {
      this.scene.start('GameScene', { playerName: name, companyName: company });
    });
  }
}