// LeaderboardPopup.js
// Uses your preloaded textures:
//  - 'bg'      : popup body
//  - 'item_bg' : row background
//  - 'slide'   : scrollbar track
//  - 'slider'  : scrollbar handle
// Clips rows with a geometry mask (hides anything outside the list).

export default class LeaderboardPopup extends Phaser.GameObjects.Container {
  /**
   * @param {Phaser.Scene} scene
   * @param {number} x
   * @param {number} y
   * @param {{name:string, score:number}[]} scores
   * @param {number} width
   * @param {number} height
   * @param {{overlay?:boolean, scale?:number}} options
   */
  constructor(scene, x, y, scores = [], width = 360, height = 320, options = {}) {
    super(scene, x, y);
    scene.add.existing(this);

    const { overlay = false, scale = 1 } = options;
    this.setScale(scale);

    // basic config
    this.scores = Array.isArray(scores) ? scores.slice() : [];
    this.rowHeight = 40;
    this.headerHeight = 50;
    this.paddingX = 20;
    this.scoreBoxWidth = 64;

    // tiny 2x2 white texture for tintable sprites
    const WHITE = this._ensureWhite(scene);


    // ---------- body (sprite) ----------
    const body = scene.add.sprite(0, 10, 'bg').setOrigin(0.5);
    this.add(body);


    // ---------- list area + mask (to HIDE overflow) ----------
    const listX = -width / 2 + this.paddingX;
    const listY = -height / 2 + (this.headerHeight + 10);
    const listWidth = width - (this.paddingX * 2) - 40; // room for scrollbar
    const listHeight = height - (this.headerHeight + 30);

    this._listY = listY;
    this._listWidth = listWidth;
    this._listHeight = listHeight;

    // container holding all rows
    this.entries = scene.add.container(listX, listY);
    this.add(this.entries);

    // wheel capture area (sprite)
    const wheelArea = scene.add.sprite(0, 0, WHITE).setOrigin(0, 0).setAlpha(0.001);
    wheelArea.displayWidth = listWidth;
    wheelArea.displayHeight = listHeight;
    wheelArea.setPosition(listX, listY).setInteractive();
    this.add(wheelArea);
    wheelArea.on('wheel', (_p, _dx, dy) => {
      this.entries.y = Phaser.Math.Clamp(this.entries.y - dy, -this._maxScroll, 0);
      this._syncHandle();
    });

    // ---------- scrollbar ----------
    // track
    const track = scene.add.sprite(body.x + (body.width * 0.4), body.y + (body.height * 0.08), 'slider').setOrigin(0.5);
    // give it a consistent visual size (if your image is larger)
    this.add(track);
    this.track = track;

    // build rows & compute metrics BEFORE making handle
    this._buildEntries();

    // handle
    const handle = scene.add.sprite(track.x, track.y, 'slide').setOrigin(0.5);
    handle.setInteractive({ draggable: true, useHandCursor: true });
    this.add(handle);
    this.handle = handle;

    scene.input.setDraggable(handle);
    handle.on('drag', (_pointer, _dx, dragY) => {
      const minY = track.y - (track.height * 0.5 * 0.9);
      const maxY =  track.y + (track.height * 0.5 * 0.9);
      handle.y = Phaser.Math.Clamp(dragY, minY, maxY);
      if (this._maxScroll > 0) {
        const ratio = (handle.y - minY) / (maxY - minY);
        this.entries.y = -ratio * this._maxScroll;
      }
    });

    // bring UI bits to front
    this.bringToTop(this.handle);
  }

  // ---------- Public API ----------
  setScores(list = []) {
    this.scores = Array.isArray(list) ? list.slice() : [];
    this._buildEntries();
    this._resizeHandle();
    this._syncHandle();
  }

  addScore(name, score) {
    this.scores.push({ name, score });
    this._buildEntries();
    this._resizeHandle();
    this._syncHandle();
  }

  // ---------- Internals ----------
  _buildEntries() {
    const scene = this.scene;

    // sort high → low
    this.scores.sort((a, b) => b.score - a.score);

    // clear
    this.entries.removeAll(true);

    // rebuild rows using ONE background sprite per row
    this.scores.forEach((s, i) => {
      const entry = scene.add.container(0, i * this.rowHeight);

      // full-width row background
      const rowBg = scene.add.image(140, 0, 'item_bg').setOrigin(0.5);
      entry.add(rowBg);

      // rank + name (left)
      const nameText = scene.add.text(
        12, (this.rowHeight - 4) / 2,
        `${i + 1}. ${s.name}`.toUpperCase(),
        {
          fontFamily: '"Press Start 2P", monospace',
          fontSize: '36px',
          color: '#000000'
        }
      ).setOrigin(0, 0.5);

      // score (right, on same background)
      const scoreText = scene.add.text(
        this._listWidth - 12, (this.rowHeight - 4) / 2,
        String(s.score),
        {
          fontFamily: '"Press Start 2P", monospace',
          fontSize: '36px',
          color: '#ffffff',
          stroke: '#000000',
          strokeThickness: 2
        }
      ).setOrigin(1, 0.5);

      entry.add([nameText, scoreText]);
      this.entries.add(entry);
    });

    // scroll metrics
    const contentH = this.scores.length * this.rowHeight;
    this._maxScroll = Math.max(contentH - this._listHeight, 0);

    // handle size for current content
    this._handleHeight = (this._maxScroll > 0)
      ? Math.max(this._listHeight * (this._listHeight / contentH), 20)
      : this._listHeight;

    // clamp current scroll
    this.entries.y = Phaser.Math.Clamp(this.entries.y, -this._maxScroll, 0);
  }
  _resizeHandle() {
    this.handle.displayHeight = this._handleHeight;
    const minY = this._listY + this._handleHeight / 2;
    const maxY = this._listY + this._listHeight - this._handleHeight / 2;
    this.handle.y = Phaser.Math.Clamp(this.handle.y, minY, maxY);
  }

  _syncHandle() {
    const minY = this._listY + this._handleHeight / 2;
    const maxY = this._listY + this._listHeight - this._handleHeight / 2;
    if (this._maxScroll > 0) {
      const ratio = -this.entries.y / this._maxScroll;
      this.handle.y = minY + (maxY - minY) * ratio;
    } else {
      this.handle.y = this._listY + this._listHeight / 2;
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
    this.entries?.clearMask(true);
    this._maskG?.destroy();
    if (this._overlay && !this._overlay.destroyed) this._overlay.destroy();
    super.destroy(fromScene);
  }
}
