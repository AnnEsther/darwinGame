// Usage prerequisites (in preload):
// this.load.image('uiBoxLeft', 'assets/ui/box_left.png');
// this.load.image('uiBoxRight', 'assets/ui/box_right.png');
// Ensure your custom web font is loaded via CSS (e.g., @font-face) or WebFontLoader.

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
      this.leftBg.x + this.pad + 200,
      this.leftBg.y + this.leftBg.displayHeight / 2,
      '0',
      {
        // fontFamily,
        fontSize: `${fontSize}px`,
        color: textColor,
        padding: { bottom: 6 }, // avoids underscore clipping
        align: 'left'
      }
    )
    .setOrigin(0, 0.5)
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
      this.rightBg.x - (this.rightBg.displayWidth*2) + 180,
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
      '0 m',
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
    .setOrigin(1, 0.5)
    .setScrollFactor(0)
    .setDepth(depth + 1);

    // Internal values
    this._coins = 0;
    this._distance = 0;

    // Keep UI anchored on resize
    this._onResize = (gameSize) => this.layout(gameSize.width, gameSize.height);
    scene.scale.on('resize', this._onResize);
    this.layout(scene.scale.width, scene.scale.height);
  }

  // Position elements (called on construct & on resize)
  layout(w, h) {
    // Left box stays at top-left
    this.leftBg.setPosition(this.margin, this.margin);
    this.coinText.setPosition(this.leftBg.x + this.pad + 100, this.leftBg.y + this.leftBg.displayHeight / 2);

    // Right box sticks to top-right
    this.rightBg.setPosition(w - this.margin, this.margin);
    this.distanceText.setPosition(this.rightBg.x - this.pad, this.rightBg.y + this.rightBg.displayHeight / 2);
    // Re-apply fixed width / wrap if the box width changed (optional)
    const rightTextWidth = this.rightBg.displayWidth - (this.pad * 2);
    this.distanceText.setStyle({
      fixedWidth: rightTextWidth,
      wordWrap: { width: rightTextWidth, useAdvancedWrap: true }
    });
  }

  updateCoin(value) {
    this._coins += value | 0;
    this.coinText.setText(String(this._coins));
    this._bump(this.coinText);
  }

  updateDistance(value) {
    this._distance += value;
    // Show meters; tweak formatting as needed
    const txt = (typeof this._distance === 'number') ? `${this._distance.toFixed(0)} m` : `${this._distance}`;
    this.distanceText.setText(txt);
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

  destroy() {
    this.scene.scale.off('resize', this._onResize);
    this.leftBg.destroy();
    this.rightBg.destroy();
    this.coinText.destroy();
    this.distanceText.destroy();
  }
}
