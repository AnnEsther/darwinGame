// LeaderboardPopup.js
// Uses your preloaded textures:
//  - 'bg'      : popup body
//  - 'item_bg' : row background
//  - 'slide'   : scrollbar track
//  - 'slider'  : scrollbar handle
// Clips rows with a bitmap mask (follows container position/scale).
// Infinite seamless scroll with repositioning entries outside mask area.

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
    this.scrollSpeed = 1; // pixels per frame for auto-scroll
    this.isAutoScrolling = true;
    this.userInteracting = false;

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

    const _padding = 0.9; // same padding you use for clamping
    this._minY = this.track.y - (this.track.height * 0.5 * _padding);
    this._maxY = this.track.y + (this.track.height * 0.5 * _padding);

    // NEW: top-rest behavior
    this.dragScrollFactor = options.dragScrollFactor ?? 1.0;
    this._isDragging = false;
    this._prevHandleY = this._minY;   // start tracking from the top
    this._snapTween = null;

    // Ensure handle starts at TOP (rest)
    this.handle.y = this._minY;

    // ---------- SIMPLE MASK: Create a rectangle mask ----------
    this.maskGraphics = scene.make.graphics({ add: false });
    this.maskGraphics.fillStyle(0xffffff);
    this.maskGraphics.fillRect(0, 0, listWidth + 150, listHeight);

    // Create the mask and apply it
    const mask = this.maskGraphics.createGeometryMask();

    // Position the mask to match the entries container
    this.maskGraphics.x = this.x + listX;
    this.maskGraphics.y = this.y + listY + 200;

    this.entries.setMask(mask);
    this._geometryMask = mask;

    // ---------- wheel capture area ----------
    const wheelArea = scene.add.sprite(listX + listWidth / 2, listY + listHeight / 2, WHITE).setOrigin(0.5);
    wheelArea.displayWidth = listWidth;
    wheelArea.displayHeight = listHeight;
    wheelArea.setAlpha(0.001).setInteractive();
    this.add(wheelArea);

    wheelArea.on('wheel', (_p, _dx, dy) => {
      // Stop auto-scroll when user manually scrolls
      this._scrollBy(dy * 2);
    });

    // initialize scroll/handle
    this._resizeHandle();
    this.entries.y = -220; // Start at top
    this._syncHandle();

    // handle drag behavior - make handle only draggable (no clicking)
    scene.input.setDraggable(handle);

    handle.on('dragstart', () => {
      this._isDragging = true;
      this._prevHandleY = this.handle.y;
      if (this._snapTween) { this._snapTween.remove(); this._snapTween = null; }
    });

    handle.on('drag', (_pointer, _dx, dragY) => {
      this.handle.y = Phaser.Math.Clamp(dragY, this._minY, this._maxY);

      // Move entries by the handle delta (joystick-like)
      const deltaHandle = this.handle.y - this._prevHandleY;
      if (deltaHandle !== 0) {
        this._scrollBy(deltaHandle * this.dragScrollFactor);
        this._prevHandleY = this.handle.y;
      }
    });

    handle.on('dragend', () => {
      this._isDragging = false;
      // Snap handle back to center
      this._snapTween = this.scene.tweens.add({
        targets: this.handle,
        y: this._minY,            // <- top, not center
        duration: 150,
        ease: 'Sine.easeOut',
        onComplete: () => { this._snapTween = null; }
      });
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
    this.scores = Array.isArray(list) ? list.slice() : [];
    this._buildEntries();
    this._resizeHandle();
  }

  _getScrollRatio() {
    if (!this._totalContentHeight || this._totalContentHeight <= 0) return 0;
    const normalizedY = ((this.entries.y % this._totalContentHeight) + this._totalContentHeight) % this._totalContentHeight;
    return normalizedY / this._totalContentHeight;
  }

  // ---------- Scrolling Methods ----------
  _scrollBy(deltaY) {
    this.entries.y -= deltaY;
    this._handleInfiniteScroll();
    this._syncHandle();
  }

  _scrollTo(targetY) {
    this.entries.y = targetY;
    this._handleInfiniteScroll();
    this._syncHandle();
  }

  _handleInfiniteScroll() {
    if (!this._totalContentHeight || this.entries.list.length === 0) return;

    const buffer = this.rowHeight * 2; // Extra buffer for smooth transitions
    const visibleTop = -this.entries.y - buffer;
    const visibleBottom = -this.entries.y + this._listHeight + buffer;

    // Reposition entries that are outside the visible area
    this.entries.list.forEach(entry => {
      const entryTop = entry.y;
      const entryBottom = entry.y + this.rowHeight;

      // If entry is above visible area, move it to bottom
      if (entryBottom < visibleTop) {
        const offset = Math.ceil((visibleTop - entryBottom) / this._totalContentHeight) * this._totalContentHeight;
        entry.y += offset;
      }
      // If entry is below visible area, move it to top
      else if (entryTop > visibleBottom) {
        const offset = Math.ceil((entryTop - visibleBottom) / this._totalContentHeight) * this._totalContentHeight;
        entry.y -= offset;
      }
    });
  }


  // ---------- Internals ----------
  _buildEntries() {
    if (!this.entries) return;

    const scene = this.scene;

    // If no scores, create dummy entries for demonstration
    if (this.scores.length === 0) {
      this.scores = [
        { name: "No entries", score: 0, company: "Available" }
      ];
    }

    // sort high → low
    this.scores = this.scores.sort((a, b) => b.score - a.score).slice(0, 30);

    // clear existing entries
    this.entries.removeAll(true);

    // sync rowHeight to your item_bg sprite
    const itemTex = scene.textures.get('item_bg');
    if (itemTex && itemTex.getSourceImage()) {
      this.rowHeight = itemTex.getSourceImage().height + this.rowGap;
    }

    // For infinite scroll, we need enough entries to fill the screen plus buffer
    const minEntriesNeeded = Math.ceil(this._listHeight / this.rowHeight) + 4;
    const duplicatedScores = [];

    // Duplicate scores until we have enough entries
    while (duplicatedScores.length < minEntriesNeeded) {
      duplicatedScores.push(...this.scores);
    }

    // rebuild rows using your item_bg sprite
    duplicatedScores.forEach((s, i) => {
      const originalIndex = (i % this.scores.length);
      const entry = scene.add.container(0, (i * this.rowHeight));

      // row background using your sprite
      const rowBg = scene.add.image(0, 0, 'item_bg').setOrigin(0, 0);

      // rank + name (left side) - use original ranking
      const rank = originalIndex + 1;
      const name = `${rank}. ${s.name}`;
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

    // calculate scroll metrics for infinite scroll
    this._totalContentHeight = this.scores.length * this.rowHeight;

    // Initialize positions for infinite scroll
    this._handleInfiniteScroll();
  }

  _formatScore(value) {
    if (value >= 1_000_000_000) return (value / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'B';
    if (value >= 1_000_000) return (value / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
    if (value >= 1_000) return (value / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
    return String(value);
  }

  _resizeHandle() {
    const minY = this.track.y - (this.track.height * 0.5 * 0.9);
    const maxY = this.track.y + (this.track.height * 0.5 * 0.9);
    this.handle.y = Phaser.Math.Clamp(this.handle.y, minY, maxY);
  }

  _syncHandle() {
    // Keep handle centered unless the user is actively dragging it.
    if (!this._isDragging) {
      this.handle.y = this._minY;
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
    if (this.entries) this.entries.clearMask();
    if (this.maskGraphics) { this.maskGraphics.destroy(); this.maskGraphics = null; }
    super.destroy(fromScene);
  }
}