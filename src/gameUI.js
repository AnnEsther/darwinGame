// Usage prerequisites (in preload):
// this.load.image('uiBoxLeft', 'assets/ui/box_left.png');
// this.load.image('uiBoxRight', 'assets/ui/box_right.png');
// Ensure your custom web font is loaded via CSS (e.g., @font-face) or WebFontLoader.
const pad = 14;
export default class GameUI {
  /**
   * @param {Phaser.Scene} scene
   * @param {object} opts
   *  - leftBgKey:   texture key for left box bg
   *  - rightBgKey:  texture key for right box bg
   *  - boxWidth:    target width of each bg (optional)
   *  - boxHeight:   target height of each bg (optional)
   *  - margin:      distance from screen edges
   *  - pad:         inner padding for text
   *  - fontFamily:  custom font family name (loaded via CSS/WebFont)
   *  - fontSize:    font size for values
   *  - textColor:   color for values
   *  - depth:       render depth (UI on top)
   */
  constructor(scene, opts = {}) {
    this.scene = scene;

    const {
      leftBgKey = 'uiBoxLeft',
      rightBgKey = 'uiBoxRight',
      boxWidth = null,
      boxHeight = null,
      margin = 16,
      pad = 12,
      fontFamily = 'Press Start 2P',
      fontSize = 18,
      textColor = '#ffffff',
      depth = 1000
    } = opts;

    this.margin = margin;
    this.pad = pad;

    // --- Left box (Coins) ---
    this.leftBg = scene.add.image(margin, margin, leftBgKey)
      .setOrigin(0, 0)
      .setScrollFactor(0)
      .setDepth(depth);

    // if (boxWidth)  this.leftBg.displayWidth  = boxWidth;
    // if (boxHeight) this.leftBg.displayHeight = boxHeight;

    // Coin value text (left-aligned inside the box)
    this.coinText = scene.add.text(
      this.leftBg.x + this.leftBg.displayWidth - pad,
      this.leftBg.y + this.leftBg.displayHeight / 2,
      '0',
      {
        // fontFamily,
        fontSize: `${fontSize}px`,
        color: textColor,
        padding: { bottom: 6 }, // avoids underscore clipping
        align: 'left'
      }
    ).setOrigin(1, 0.5)
      .setScrollFactor(0)
      .setDepth(depth + 1);

    // --- Right box (Distance) ---
    this.rightBg = scene.add.image(scene.scale.width - margin, margin, rightBgKey)
      .setOrigin(1, 0)
      .setScrollFactor(0)
      .setDepth(depth);

    // if (boxWidth)  this.rightBg.displayWidth  = boxWidth;
    // if (boxHeight) this.rightBg.displayHeight = boxHeight;

    // Distance value text (right-aligned inside the box)
    this.distanceLabel = scene.add.text(
      this.rightBg.x - (this.rightBg.displayWidth * 2) + 180,
      this.rightBg.y + this.rightBg.displayHeight / 2,
      'SCORE',
      {
        // fontFamily,
        fontSize: `${fontSize}px`,
        color: textColor,
        padding: { bottom: 6 },
        align: 'right',
        fixedWidth: this.rightBg.displayWidth - (this.pad * 2),
        wordWrap: { width: this.rightBg.displayWidth - (this.pad * 2), useAdvancedWrap: true }
      }
    )
      .setOrigin(0, 0.5)
      .setScrollFactor(0)
      .setDepth(depth + 1);

    this.distanceText = scene.add.text(
      this.rightBg.x - this.pad,
      this.rightBg.y + this.rightBg.displayHeight / 2,
      '0m',
      {
        // fontFamily,
        fontSize: `${fontSize}px`,
        color: textColor,
        padding: { bottom: 6 },
        // align: 'right',
        // fixedWidth: this.rightBg.displayWidth - (this.pad * 2),
      }
    ).setOrigin(1, 0.5)
      .setScrollFactor(0)
      .setDepth(depth + 1);

    // Internal values
    this._coins = 0;
    this._distance = 0;

  
  }

  updateCoin(value) {
    this._coins += value | 0;
    // this.coinText.setText(String(this._coins));
    this.coinText.setText(this.formatCompactMax(value, 8)); // e.g., "12.3M"
    this._bump(this.coinText);
  }

  updateDistance(value) {
    this._distance += value;
    // Show meters; tweak formatting as needed
    this.distanceText.setText(this.formatCompactMax(this._distance, 8));
    this._bump(this.distanceText);
  }

  // Small feedback animation on update
  _bump(target) {
    this.scene.tweens.add({
      targets: target,
      scaleX: 1.08,
      scaleY: 1.08,
      duration: 80,
      yoyo: true,
      ease: 'Quad.easeOut'
    });
  }

  setDepth(depth) {
    this.leftBg.setDepth(depth);
    this.coinText.setDepth(depth + 1);
    this.rightBg.setDepth(depth);
    this.distanceText.setDepth(depth + 1);
  }

  formatCompactMax(n, maxLen = 8) {
    const units = ['', 'k', 'M', 'B', 'T', 'P', 'E']; // 10^0 .. 10^18
    const sign = n < 0 ? '-' : '';
    let abs = Math.abs(n);

    // Try raw integer first (no suffix)
    const raw = sign + String(Math.floor(abs));
    if (raw.length <= maxLen) return raw;

    for (let u = 1; u < units.length; u++) {
      let scaled = abs / Math.pow(1000, u);

      // 2,1,0 decimals; trim trailing zeros
      for (let d = 2; d >= 0; d--) {
        let s = scaled.toFixed(d).replace(/\.0+$|(\.\d*[1-9])0+$/, '$1');

        // If rounding hits 1000, bump to next unit as "1<nextUnit>"
        if (s === '1000' && u < units.length - 1) {
          const out = sign + '1' + units[u + 1];
          if (out.length <= maxLen) return out;
        }

        const out = sign + s + units[u];
        if (out.length <= maxLen) return out;
      }
    }
    // Fallback for astronomicals
    const u = units.length - 1;
    return sign + Math.round(abs / Math.pow(1000, u)) + units[u];
  }

  destroy() {
    this.scene.scale.off('resize', this._onResize);
    this.leftBg.destroy();
    this.rightBg.destroy();
    this.coinText.destroy();
    this.distanceText.destroy();
  }
}
