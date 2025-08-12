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

    this.instructions = this.add.text(200, 120, 'Type your Name and Company', {
      fontSize: '20px',
      fill: '#ffffff'
    });

    this.fieldTexts = {
      name: this.add.text(200, 200, 'Name: ', { fontSize: '24px', fill: '#ffff00' }),
      company: this.add.text(200, 250, 'Company: ', { fontSize: '24px', fill: '#ffff00' }),
      submit: this.add.text(200, 320, 'START', { fontSize: '20px', fill: '#00ff00' })
    };

    // Cursor timer
    this.time.addEvent({
      delay: 500,
      callback: () => {
        this.cursorVisible = !this.cursorVisible;
        this.updateDisplay();
      },
      loop: true
    });

    // Keyboard input handler
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
