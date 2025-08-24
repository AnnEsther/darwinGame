// LoadingOverlay.js
export default class LoadingOverlay {
  /**
   * @param {Phaser.Scene} scene
   * @param {{ label?: string, depth?: number }} [opts]
   */
  constructor(scene, opts = {}) {
    this.scene = scene;
    this.depth = opts.depth ?? 10000;
    this.labelText = opts.label ?? 'Loading…';

    // Sizing helpers
    const sw = scene.scale.width;
    const sh = scene.scale.height;

    // Block all input beneath
    this.bg = scene.add
      .rectangle(0, 0, sw, sh, 0x000000, 1)
      .setOrigin(0, 0)
      .setScrollFactor(0)
      .setDepth(this.depth)
      .setInteractive(); // captures input so clicks don't leak through

    // Frame dimensions (responsive)
    this.barWidth  = Math.floor(sw * 0.6);
    this.barHeight = 18;
    this.barX = Math.floor((sw - this.barWidth) / 2);
    this.barY = Math.floor(sh / 2);

    // Graphics for bar track + fill
    this.track = scene.add.graphics().setScrollFactor(0).setDepth(this.depth + 1);
    this.fill  = scene.add.graphics().setScrollFactor(0).setDepth(this.depth + 2);

    // Optional label + percentage
    this.label = scene.add.text(sw / 2, this.barY - 40, this.labelText, {
      fontFamily: "nokia",
      fontSize: '18px',
      color: '#ffffff'
    }).setOrigin(0.5, 0.5).setScrollFactor(0).setDepth(this.depth + 2);

    this.percentText = scene.add.text(sw / 2, this.barY + 28, '0%', {
      fontFamily: "nokia",
      fontSize: '16px',
      color: '#aaaaaa'
    }).setOrigin(0.5, 0.5).setScrollFactor(0).setDepth(this.depth + 2);

    // Draw bar track once
    this.track.clear();
    this.track.lineStyle(2, 0xffffff, 1);
    this.track.strokeRoundedRect(this.barX, this.barY, this.barWidth, this.barHeight, 6);
    this.track.fillStyle(0x222222, 1);
    this.track.fillRoundedRect(this.barX, this.barY, this.barWidth, this.barHeight, 6);

    // Keep responsive on resize
    // this._onResize = (gameSize) => this._layout(gameSize.width, gameSize.height);
    // scene.scale.on('resize', this._onResize);

    // Initial progress
    this.setProgress(0);
  }

  // Public: 0..1 or 0..100 both accepted
  setProgress(p) {
    const value = p > 1 ? Phaser.Math.Clamp(p / 100, 0, 1) : Phaser.Math.Clamp(p, 0, 1);

    // Update bar fill
    const w = Math.floor(this.barWidth * value);
    this.fill.clear();
    this.fill.fillStyle(0xffff00, 1);
    this.fill.fillRoundedRect(this.barX, this.barY, w, this.barHeight, 6);

    // Update % text
    this.percentText.setText(`${Math.round(value * 100)}%`);
  }

  // Public: fade out and destroy
  close() {
    const toFade = [this.bg, this.track, this.fill, this.label, this.percentText];
    this.scene.tweens.add({
      targets: toFade,
      alpha: 0,
      duration: 250,
      onComplete: () => this.destroy()
    });
  }

  destroy() {
    this.scene.scale.off('resize', this._onResize);
    [this.bg, this.track, this.fill, this.label, this.percentText].forEach(g => g?.destroy());
  }

  // Recompute positions/sizes on resize
  _layout(sw, sh) {
    this.bg.setSize(sw, sh);

    this.barWidth  = Math.floor(sw * 0.6);
    this.barHeight = 18;
    this.barX = Math.floor((sw - this.barWidth) / 2);
    this.barY = Math.floor(sh / 2);

    this.label.setPosition(sw / 2, this.barY - 40);
    this.percentText.setPosition(sw / 2, this.barY + 28);

    // Redraw track and keep current fill proportion
    const currentPct = this.percentText.text.endsWith('%')
      ? parseInt(this.percentText.text, 10) / 100
      : 0;

    this.track.clear();
    this.track.lineStyle(2, 0xffffff, 1);
    this.track.strokeRoundedRect(this.barX, this.barY, this.barWidth, this.barHeight, 6);
    this.track.fillStyle(0x222222, 1);
    this.track.fillRoundedRect(this.barX, this.barY, this.barWidth, this.barHeight, 6);

    this.setProgress(currentPct);
  }
}
