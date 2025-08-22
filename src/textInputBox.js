export default class TextInputBox extends Phaser.GameObjects.Container {
    constructor(scene, x, y, width, label, options = {}) {
        super(scene, x, y);
        scene.add.existing(this);

        this.width = width || 420;
        this.height = options.height ?? 40;
        this.paddingX = options.paddingX ?? 10;
        this.maxLength = options.maxLength ?? 64;
        this.charPattern = options.charPattern ?? /^[ -~]$/; // printable ASCII
        this.value = options.value ?? '';
        this.placeholder = options.placeholder ?? '';
        this.onEnter = options.onEnter || null;
        this.bgKey = options.bgKey || null;        // <-- NEW: background image key
        this.bgFrame = options.bgFrame || null;    // optional frame
        this.labelGap = options.labelGap ?? 10;    // gap between box and right-side label

        // --- Background ---
        if (this.bgKey) {
            this.bg = scene.add.image(0, 0, this.bgKey, this.bgFrame)
                .setOrigin(0.5, 0.5)
                .setInteractive({ useHandCursor: true });

            // Stretch the image to fit the desired box size
            this.width = this.bg.width;
            this.height = this.bg.height;
        }
        else {
            // Fallback rectangle background
            this.bg = scene.add.rectangle(0, 0, this.width, this.height, 0x222222, 0.9)
                .setOrigin(0.5, 0.5)
                .setInteractive({ useHandCursor: true });
        }

        // Focus border drawn above the background (so we can show focus without strokes on the image)
        // this.focusBorder = scene.add.rectangle(0, 0, this.width, this.height, 0x000000, 0)
        //   .setOrigin(0.5, 0.5)
        //   .setStrokeStyle(2, 0x444444);

        // --- Label on the RIGHT side of the box ---
        this.labelText = scene.add.text(this.width / 2 + this.labelGap, 0, `${label}`, {
            fontSize: '20px',
            color: '#ffff00',
            parse: false
        }).setOrigin(0, 0.5) // anchor left edge; vertically centered
            .setInteractive({ useHandCursor: true });

        // --- Value text inside the box (left padded) ---
        // this.valueText = scene.add.text(-this.width / 2 + this.paddingX, 0, '', {
        //   fontSize: '20px',
        //   color: '#000000ff',
        //   padding: { top: 0, right: 0, bottom: 6, left: 0 } // padding to avoid underscore clipping
        // }).setOrigin(0, 0.5);

        // Right edge inside the box (box is centered at 0, so right = +width/2)
        // --- Value text inside the box (right aligned) ---
        const rightEdgeX = this.width / 2 - this.paddingX;
        this.valueText = scene.add.text(rightEdgeX, 0, '', {
            fontSize: '20px',
            color: '#000000',
            padding: { top: 0, right: 0, bottom: 6, left: 0 },
            // For multiline/right-wrap alignment (optional):
            fixedWidth: this.width - (this.paddingX * 2),
            align: 'right',
            wordWrap: { width: this.width - (this.paddingX * 2), useAdvancedWrap: true }
        }).setOrigin(1, 0.5);  // <-- right-align by origin

        // this.add([this.bg, this.focusBorder, this.valueText, this.labelText]);
        this.add([this.bg, this.valueText, this.labelText]);

        // State
        this.focused = false;
        this.caretVisible = true;
        this.keyHandler = null;

        // Blink caret only when focused
        this.caretEvt = scene.time.addEvent({
            delay: 500,
            loop: true,
            callback: () => {
                if (this.focused) {
                    this.caretVisible = !this.caretVisible;
                    this.updateDisplay();
                }
            }
        });

        // Interactions
        this.bg.on('pointerdown', () => this.focus());
        this.labelText.on('pointerdown', () => this.focus());

        // Hover effects (image tint or rect fill tweak)
        if (this.bg.setTint) {
            this.bg.on('pointerover', () => this.bg.setTint(0xdddddd));
            this.bg.on('pointerout', () => this.bg.clearTint());
        } else {
            this.bg.on('pointerover', () => this.bg.setFillStyle(0x333333));
            this.bg.on('pointerout', () => this.bg.setFillStyle(0x222222));
        }

        this.updateDisplay();
    }

    focus() {
        if (this.focused) return;

        // Blur any other active text input in this scene
        const prev = this.scene.__activeTextInputBox;
        if (prev && prev !== this) prev.blur();
        this.scene.__activeTextInputBox = this;

        this.focused = true;
        // this.focusBorder.setStrokeStyle(2, 0x88ff88);

        if (!this.keyHandler) {
            this.keyHandler = (event) => this.handleKey(event);
            this.scene.input.keyboard.on('keydown', this.keyHandler);
        }

        this.caretVisible = true;
        this.updateDisplay();
    }

    blur() {
        if (!this.focused) return;
        this.focused = false;
        // this.focusBorder.setStrokeStyle(2, 0x444444);

        if (this.keyHandler) {
            this.scene.input.keyboard.off('keydown', this.keyHandler);
            this.keyHandler = null;
        }

        if (this.scene.__activeTextInputBox === this) {
            this.scene.__activeTextInputBox = null;
        }

        this.updateDisplay();
    }

    handleKey(event) {
        const k = event.key;

        if (k === 'Tab') {
            event.preventDefault?.();
            this.blur();
            return;
        }
        if (k === 'Enter') {
            if (typeof this.onEnter === 'function') this.onEnter(this.value);
            return;
        }
        if (k === 'Backspace' || k === 'Delete') {
            this.value = this.value.slice(0, -1);
            this.updateDisplay();
            return;
        }

        if (k.length === 1 && this.charPattern.test(k) && this.value.length < this.maxLength) {
            this.value += k;
            this.updateDisplay();
        }
    }

    updateDisplay() {
        const showCaret = this.focused && this.caretVisible;
        const shown = this.value.length ? this.value : (this.focused ? '' : this.placeholder);
        this.valueText.setText(showCaret ? `${shown}|` : shown);
        this.valueText.setColor(this.value.length ? '#000000ff' : '#000000ff');
        this.valueText.setStyle({ parse: false });
    }

    setValue(v) { this.value = (v ?? '').toString().slice(0, this.maxLength); this.updateDisplay(); }
    getValue() { return this.value; }
    setLabel(text) { this.labelText.setText(text); }

    setBoxWidth(w) {
        this.width = w;

        // Resize background and border
        if (this.bg.displayWidth !== undefined) {
            this.bg.displayWidth = this.width;
            this.bg.displayHeight = this.height;
        } else {
            this.bg.setSize(this.width, this.height);
        }
        // this.focusBorder.setSize(this.width, this.height);

        // Reposition text and label
        this.labelText.setPosition(this.width / 2 + this.labelGap, 0);
        this.valueText.setX(-this.width / 2 + this.paddingX);
    }

    destroy(fromScene) {
        this.blur();
        this.caretEvt?.remove(false);
        super.destroy(fromScene);
    }
}
