// Preload example:
// this.load.image('btnBg', 'assets/ui/button_bg.png');

export default class TintButton {
  constructor(scene, x, y, bgKey, label = '', onClick = () => {}, opts = {}) {
    this.scene = scene;
    this.onClick = onClick;

    const {
      frame = null,
      fontSize = 18,
      labelColor = '#ffffff',
      labelDy = 0,           // label vertical offset
      hoverTint = 0xdedede,
      downTint  = 0xbdbdbd,
      upTint    = null,      // null = clearTint() on idle
      useHand   = true,
      pressScale = 0.98,
      depth = null
    } = opts;

    this._tints = { hoverTint, downTint, upTint };
    this._pressScale = pressScale;
    this._labelDy = labelDy;

    // Background sprite (acts as the button)
    this.sprite = scene.add.sprite(x, y, bgKey).setOrigin(0.5,0).setInteractive({ useHandCursor: useHand });
    this.baseScaleX = this.sprite.scaleX;
    this.baseScaleY = this.sprite.scaleY;

    if (depth !== null) this.sprite.setDepth(depth);

    // Optional centered label (separate object; this class keeps it aligned)
    this.label = null;
    if (label) {
      this.label = scene.add.text(x, y + labelDy, label, {
        fontSize: `${fontSize}px`,
        color: labelColor
      }).setOrigin(0.5);
      if (depth !== null) this.label.setDepth(depth + 1);
      this.label.setAlpha(0.95);
    }

    // Bind handlers so we can detach later
    this._onOver = () => {
      if (hoverTint !== null) this.sprite.setTint(hoverTint);
      if (this.label) this.label.setAlpha(1);
    };
    this._onOut = () => {
      if (upTint !== null) this.sprite.setTint(upTint); else this.sprite.clearTint();
      this.sprite.setScale(this.baseScaleX, this.baseScaleY);
      if (this.label) this.label.setAlpha(0.95);
    };
    this._onDown = () => {
      if (downTint !== null) this.sprite.setTint(downTint);
      if (this._pressScale) this.sprite.setScale(this.baseScaleX * this._pressScale, this.baseScaleY * this._pressScale);
    };
    this._onUp = (pointer) => {
      // Restore tint depending on hover state
      if (this.sprite.input && this.sprite.input.pointerOver()) {
        if (hoverTint !== null) this.sprite.setTint(hoverTint);
      } else {
        if (upTint !== null) this.sprite.setTint(upTint); else this.sprite.clearTint();
      }
      this.sprite.setScale(this.baseScaleX, this.baseScaleY);

      // Click only if released while still over the button
      if (this.sprite.input && this.sprite.input.pointerOver()) {
        this.onClick(pointer);
      }
    };

    // Wire events
    this.sprite.on('pointerover', this._onOver);
    this.sprite.on('pointerout',  this._onOut);
    this.sprite.on('pointerdown', this._onDown);
    this.sprite.on('pointerup',   this._onUp);
  }

  // --- Convenience API ---

  setPosition(x, y) {
    this.sprite.setPosition(x, y);
    if (this.label) this.label.setPosition(x, y + this._labelDy);
    return this;
  }

  setX(x) { return this.setPosition(x, this.sprite.y); }
  setY(y) { return this.setPosition(this.sprite.x, y); }

  setDepth(depth) {
    this.sprite.setDepth(depth);
    if (this.label) this.label.setDepth(depth + 1);
    return this;
  }

  setScale(sx, sy) {
    // update both the base scale (for press animation) and current scale
    this.baseScaleX = sx;
    this.baseScaleY = (sy ?? sx);
    this.sprite.setScale(this.baseScaleX, this.baseScaleY);
    if (this.label) this.label.setScale(this.baseScaleX, this.baseScaleY);
    return this;
  }

  setVisible(v) {
    this.sprite.setVisible(v);
    if (this.label) this.label.setVisible(v);
    return this;
  }

  setAlpha(a) {
    this.sprite.setAlpha(a);
    if (this.label) this.label.setAlpha(a);
    return this;
  }

  setEnabled(enabled) {
    if (enabled) this.sprite.setInteractive({ useHandCursor: true });
    else this.sprite.disableInteractive();
    this.setAlpha(enabled ? 1 : 0.6);
    return this;
  }

  setLabel(text) {
    if (this.label) this.label.setText(text);
    return this;
  }

  destroy() {
    if (!this.sprite) return;

    // Detach events
    this.sprite.off('pointerover', this._onOver);
    this.sprite.off('pointerout',  this._onOut);
    this.sprite.off('pointerdown', this._onDown);
    this.sprite.off('pointerup',   this._onUp);

    // Destroy objects
    this.sprite.destroy();
    if (this.label) this.label.destroy();

    // Clear refs
    this.sprite = null;
    this.label = null;
  }
}
