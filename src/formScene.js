// Form Page
export default class FormScene extends Phaser.Scene {
    constructor() { super('FormScene'); }
    create() {
        let formHtml = `
            <div id="form" style="background: white; padding: 20px; border-radius: 10px; text-align: center;">
                <input type='text' id='name' placeholder='Name' style='margin: 5px'/><br/>
                <input type='text' id='company' placeholder='Company' style='margin: 5px'/><br/>
                <input type='email' id='email' placeholder='Email' style='margin: 5px'/><br/>
                <button id='submit' style='margin: 10px'>Start Game</button>
            </div>`;

        const formElement = this.add.dom(400, 300).createFromHTML(formHtml);
        formElement.setOrigin(0.5);
        formElement.addListener('click');
        formElement.on('click', (event) => {
            if (event.target.id === 'submit') {
                const name = document.getElementById('name')?.value || 'Anonymous';
                this.scene.start('GameScene', { playerName: name });
                formElement.removeListener('click');
                formElement.destroy();
            }
        });
    }
}
