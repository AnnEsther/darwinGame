// ScoreHUD.js
export default class ScoreHUD {
  /**
   * @param {Phaser.Scene} scene
   * @param {{
   *   x?: number, y?: number,
   *   label?: string,
   *   minDigits?: number, maxDigits?: number,
   *   metersPerPixel?: number,
   *   fontSize?: number
   * }} opts
   */
  constructor(scene, opts = {}) {
    this.scene = scene;

    // Config
    this.x = opts.x ?? 10;
    this.y = opts.y ?? 10;
    this.label = opts.label ?? 'Score';
    this.minDigits = Math.max(1, opts.minDigits ?? 5);
    this.maxDigits = Math.max(this.minDigits, opts.maxDigits ?? 10);
    this.metersPerPixel = opts.metersPerPixel ?? 0.01; // 1 px = 1 cm default
    this.fontSize = opts.fontSize ?? 18;

    this._meters = 0;

    // UI: label + value (monospace for stable width)
    this.labelText = scene.add.text(this.x, this.y, this.label, {
      fontFamily: 'monospace',
      fontSize: `${this.fontSize}px`,
      color: '#ffffff'
    }).setDepth(1000).setScrollFactor(0);

    this.valueText = scene.add.text(this.x + 60, this.y, '', {
      fontFamily: 'monospace',
      fontSize: `${this.fontSize}px`,
      color: '#ffff00'
    }).setDepth(1000).setScrollFactor(0);

    // Initial draw
    this._render();
  }

  /** Add distance in *pixels* (will convert to meters internally). */
  addPixels(px) {
    if (!Number.isFinite(px)) return;
    this._meters += px * this.metersPerPixel;
    this._render();
  }

  /** Add distance using speed in px/s and delta in ms. */
  addBySpeedAndDelta(speedPxPerSec, deltaMs) {
    if (!Number.isFinite(speedPxPerSec) || !Number.isFinite(deltaMs)) return;
    const px = speedPxPerSec * (deltaMs / 1000);
    this.addPixels(Math.abs(px)); // distance is non-negative
  }

  /** Directly set meters (overwrites). */
  setMeters(meters) {
    this._meters = Math.max(0, Number(meters) || 0);
    this._render();
  }

  getMeters() {
    return this._meters;
  }

  /** Internal: format and draw */
  _render() {
    // We show integer meters
    const m = Math.floor(this._meters);

    // Decide width: at least minDigits, at most maxDigits
    const needed = String(m).length;
    const width = Math.min(this.maxDigits, Math.max(this.minDigits, needed));

    // Pad left with zeros to the current width
    const text = String(m).padStart(width, '0');
    this.valueText.setText(text);
  }

  /** Optional: change label text on the fly */
  setLabel(newLabel) {
    this.label = newLabel;
    this.labelText.setText(this.label);
  }

  /** Optional: move the HUD */
  setPosition(x, y) {
    this.x = x; this.y = y;
    this.labelText.setPosition(this.x, this.y);
    this.valueText.setPosition(this.x + 60, this.y);
  }
}
