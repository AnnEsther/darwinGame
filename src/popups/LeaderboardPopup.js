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

    // basic config
    this.scores = Array.isArray(scores) ? scores.slice() : [];
    this.rowHeight = 108;
    this.headerHeight = -50;
    this.paddingX = 200;
    this.rowGap = 8;

    const WHITE = this._ensureWhite(scene);

    // ---------- body (sprite) ----------
    const body = scene.add.sprite(0, 0, 'bg').setOrigin(0.5);
    width = body.width;
    height = body.height;
    this.add(body);


    // ---------- list area + mask (to HIDE overflow) ----------
    const listX = -width / 2 + this.paddingX;
    const listY = -height / 2 + (this.headerHeight + 10);
    const listWidth = width - (this.paddingX * 2) - 40; // room for scrollbar
    const listHeight = (height * 0.7) - (this.headerHeight + 30);

    this._listX = listX;
    this._listY = listY;
    this._listWidth = listWidth;
    this._listHeight = listHeight;

    // container holding all rows
    this.entries = scene.add.container(listX, listY);
    this.add(this.entries);

    // --- GEOMETRY MASK that follows this container position ---
    // Create graphics in SCENE space, positioned at the list area in WORLD coords.
    // Geometry masks do not inherit Container transforms, so compute world position:
    const worldListX = this.x + listX;
    const worldListY = this.y + listY;

    // const maskG = scene.make.graphics({ x: worldListX, y: body.y + (body.height * 0.35), add: false });
    const maskG = scene.make.graphics({ x: worldListX, y: worldListY, add: false });
    maskG.fillStyle(0xffffff, 1).fillRect(0, 0, listWidth, listHeight);
    const listMask = maskG.createGeometryMask();

    this.entries.setMask(listMask);

    // keep refs for cleanup / resync (if you ever move the popup later, rebuild the mask)
    this._maskGraphics = maskG;
    this._mask = listMask;

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

    this._resizeHandle();       // size the handle for current content
    this.entries.y = 0;         // force top-of-list
    this._syncHandle();         // place handle to the top

    scene.input.setDraggable(handle);
    handle.on('drag', (_pointer, _dx, dragY) => {
      const minY = this.track.y - (this.track.height * 0.5 * 0.9);
      const maxY = this.track.y + (this.track.height * 0.5 * 0.9);
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
    this.entries.y = 0
    this._syncHandle();
  }

  addScore(name, score) {
    this.scores.push({ name, score });
    this._buildEntries();
    this._resizeHandle();
    this.entries.y = 0
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
      const rowBg = scene.add.image(0, 0, 'item_bg').setOrigin(0, 0);

      // rank + name (left)
      const nameText = scene.add.text(
        30, rowBg.height / 2,
        `${i + 1}. ${s.name}`.toUpperCase(),
        {
          fontFamily: 'nokia',
          fontSize: '36px',
          color: '#000000'
        }
      ).setOrigin(0, 0.5);

      // score (right, on same background)
      const scoreText = scene.add.text(
        rowBg.width - 12, rowBg.height / 2,
        String(s.score),
        {
          fontFamily: 'nokia',
          fontSize: '36px',
          color: '#ffffff',
          stroke: '#000000',
          strokeThickness: 2
        }
      ).setOrigin(1, 0.5);

      entry.add([rowBg, nameText, scoreText]);
      entry.moveTo(rowBg, 0);
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
    // this.handle.displayHeight = this._handleHeight;
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

  destroy(scene) {
    this.entries?.clearMask(true);
    this._maskG?.destroy();
    if (this._overlay && !this._overlay.destroyed) this._overlay.destroy();
    super.destroy(scene);
  }
}
