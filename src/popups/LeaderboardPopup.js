// LeaderboardPopup.js
// Uses your preloaded textures:
//  - 'bg'      : popup body
//  - 'item_bg' : row background
//  - 'slide'   : scrollbar track
//  - 'slider'  : scrollbar handle
// Clips rows with a bitmap mask (follows container position/scale).
// Auto-scrolls from top to bottom and back continuously.

export default class LeaderboardPopup extends Phaser.GameObjects.Container {
  /**
   * @param {Phaser.Scene} scene
   * @param {number} x
   * @param {number} y
   * @param {{name:string, score:number}[]} scores
   * @param {number} width
   * @param {number} height
   */
  constructor(scene, x, y, scores = [], width = 360, height = 320, options = {}) {
    super(scene, x, y);
    scene.add.existing(this);


    // basic config
    this.scores = Array.isArray(scores) ? scores.slice() : [];
    this.rowHeight = 88;
    this.headerHeight = 0;
    this.paddingX = 270;
    this.rowGap = 8;

    const WHITE = this._ensureWhite(scene);

    // ---------- body (sprite) ----------
    const body = scene.add.sprite(0, 0, 'bg').setOrigin(0.5).setDepth(100);
    width = body.width;
    height = body.height;
    this.add(body);

    // ---------- list area ----------
    const listX = -width / 2 + this.paddingX;
    const listY = -height / 2 + (this.headerHeight + 10);
    const listWidth = width - (this.paddingX * 2) - 40; // room for scrollbar
    const listHeight = (height * 0.7) - (this.headerHeight);

    this._listX = listX;
    this._listY = listY;
    this._listWidth = listWidth;
    this._listHeight = listHeight;

    // ---------- entries container (create FIRST) ----------
    this.entries = scene.add.container(listX, listY);
    this.add(this.entries);

    // build rows & compute metrics BEFORE making handle
    this._buildEntries();


    // ---------- scrollbar (create BEFORE entries) ----------
    const track = scene.add.sprite(body.x + (body.width * 0.4), body.y + (body.height * 0.08), 'slide').setOrigin(0.5);
    this.add(track);
    this.track = track;

    // handle
    const handle = scene.add.sprite(track.x, track.y, 'slider').setOrigin(0.5);
    handle.setInteractive({ draggable: true, useHandCursor: true });
    this.add(handle);
    this.handle = handle;

    // ---------- SIMPLE MASK: Create a rectangle mask ----------
    this.maskGraphics = scene.make.graphics({ add: false });
    this.maskGraphics.fillStyle(0xffffff);
    this.maskGraphics.fillRect(0, 0, listWidth + 150, listHeight);

    // Create the mask and apply it
    const mask = this.maskGraphics.createGeometryMask();

    // Position the mask to match the entries container
    this.maskGraphics.x = this.x + listX;
    this.maskGraphics.y = this.y + listY + 200;

    // this.entries.setMask(mask);
    this._geometryMask = mask;

    // ---------- wheel capture area ----------
    const wheelArea = scene.add.sprite(listX + listWidth / 2, listY + listHeight / 2, WHITE).setOrigin(0.5);
    wheelArea.displayWidth = listWidth;
    wheelArea.displayHeight = listHeight;
    wheelArea.setAlpha(0.001).setInteractive();
    this.add(wheelArea);

    wheelArea.on('wheel', (_p, _dx, dy) => {
      // Stop auto-scroll when user manually scrolls
      this.entries.y = Phaser.Math.Clamp(this.entries.y - dy * 2, -this._maxScroll, 0);
      this._syncHandle();
    });

    // initialize scroll/handle
    this._resizeHandle();
    this.entries.y = 0; // Start at top for auto-scroll
    this._syncHandle();

    // handle drag behavior
    scene.input.setDraggable(handle);
    handle.on('drag', (_pointer, _dx, dragY) => {
      // Stop auto-scroll when user drags
      const minY = this.track.y - (this.track.height * 0.5 * 0.9);
      const maxY = this.track.y + (this.track.height * 0.5 * 0.9);
      handle.y = Phaser.Math.Clamp(dragY, minY, maxY);
      if (this._maxScroll > 0) {
        const ratio = (handle.y - minY) / (maxY - minY);
        this.entries.y = -ratio * this._maxScroll;
      }
    });


  }

  _updateMaskPosition() {
    if (this.maskGraphics) {
      this.maskGraphics.x = this.x + (this._listX * this.scaleX);
      this.maskGraphics.y = this.y + (this._listY * this.scaleY);
    }
  }


  // ---------- Public API ----------
  setScores(list = []) {
    const ratio = this._getScrollRatio();


    this.scores = Array.isArray(list) ? list.slice() : [];
    this._buildEntries();
    this._resizeHandle();


  }


  _getScrollRatio() {
    if (!this._maxScroll || this._maxScroll <= 0) return 0;
    return Phaser.Math.Clamp(-this.entries.y / this._maxScroll, 0, 1);
  }



  // ---------- Internals ----------
  _buildEntries() {
    if (!this.entries) return;

    const scene = this.scene;

    // sort high → low
    this.scores.sort((a, b) => b.score - a.score);

    // clear existing entries
    this.entries.removeAll(true);

    // sync rowHeight to your item_bg sprite
    const itemTex = scene.textures.get('item_bg');
    if (itemTex && itemTex.getSourceImage()) {
      this.rowHeight = itemTex.getSourceImage().height + this.rowGap;
    }

    // rebuild rows using your item_bg sprite
    this.scores.forEach((s, i) => {
      const entry = scene.add.container(0, i * this.rowHeight);

      // row background using your sprite
      const rowBg = scene.add.image(0, 0, 'item_bg').setOrigin(0, 0);

      // rank + name (left side)
      const name = `${i + 1}. ${s.name}`;
      const clipped = name.length > 28 ? name.slice(0, 28) + '…' : name;
      const displayName = clipped.toUpperCase();
      const nameText = scene.add.text(
        30, 40,
        displayName,
        {
          fontFamily: 'nokia',
          fontSize: '26px',
          color: '#000000'
        }
      ).setOrigin(0, 0.5);

      const company = `${s.company}`;
      const clippedCompany = company.length > 28 ? company.slice(0, 28) + '…' : company;
      const displayCompany = clippedCompany.toUpperCase();
      const companyText = scene.add.text(
        68, rowBg.height * 3 / 4,
        displayCompany,
        {
          fontFamily: 'nokia',
          fontSize: '20px',
          color: '#000000'
        }
      ).setOrigin(0, 0.5);

      // score (right side)
      const scoreText = scene.add.text(
        rowBg.width - 12, rowBg.height / 2,
        this._formatScore(s.score),
        {
          fontFamily: 'nokia',
          fontSize: '36px',
          color: '#ffffff',
          stroke: '#000000',
          strokeThickness: 2
        }
      ).setOrigin(1, 0.5);

      entry.add([rowBg, nameText, companyText, scoreText]);
      this.entries.add(entry);
    });

    // calculate scroll metrics
    const contentHeight = this.scores.length * (this.rowHeight + this.rowGap);
    this._maxScroll = Math.max(contentHeight - this._listHeight + 200, 0);

    // clamp current scroll position
    if (this.entries.y < -this._maxScroll) {
      this.entries.y = -this._maxScroll;
    }

  }

  _formatScore(value) {
  if (value >= 1_000_000_000) return (value / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'B';
  if (value >= 1_000_000)     return (value / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
  if (value >= 1_000)         return (value / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
  return String(value);
}

  _resizeHandle() {
    const minY = this.track.y - (this.track.height * 0.5 * 0.9);
    const maxY = this.track.y + (this.track.height * 0.5 * 0.9);
    this.handle.y = Phaser.Math.Clamp(this.handle.y, minY, maxY);
  }

  _syncHandle() {
    const minY = this.track.y - (this.track.height * 0.5 * 0.9);
    const maxY = this.track.y + (this.track.height * 0.5 * 0.9);
    if (this._maxScroll > 0) {
      const ratio = -this.entries.y / this._maxScroll;
      this.handle.y = minY + (maxY - minY) * ratio;
    } else {
      this.handle.y = minY;
    }
  }

  _ensureWhite(scene) {
    const key = '__white';
    if (!scene.textures.exists(key)) {
      const g = scene.make.graphics({ x: 0, y: 0, add: false });
      g.fillStyle(0xffffff, 1).fillRect(0, 0, 2, 2);
      g.generateTexture(key, 2, 2);
      g.destroy();
    }
    return key;
  }

  destroy(fromScene) {
    if (this._restartTimer && typeof this._restartTimer.remove === 'function') {
      this._restartTimer.remove();
      this._restartTimer = null;
    }
    if (this._hadUpdateHook) {
      this.scene.events.off('update', this._onUpdate);
      this._hadUpdateHook = false;
    }
    if (this.entries) this.entries.clearMask();
    if (this.maskGraphics) { this.maskGraphics.destroy(); this.maskGraphics = null; }
    super.destroy(fromScene);
  }
}