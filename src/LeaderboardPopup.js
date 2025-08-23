// LeaderboardPopup.js
export default class LeaderboardPopup {
  /**
   * @param {Phaser.Scene} scene
   * @param {Array<{name:string, score:number}>} data  - up to 20 rows (or more)
   * @param {object} opts
   */
  constructor(scene, data = [], opts = {}) {
    this.scene = scene;
    this.opts = Object.assign({
      panelWidth: 420,
      panelHeight: 520,
      rowHeight: 32,
      pad: 16,
      title: 'Leaderboard',
      fontFamily: 'Arial', // swap to your custom font if needed
      fontSize: 18,
      titleSize: 24,
      bgColor: 0x000000,
      bgAlpha: 0.5,
      panelColor: 0x1e1e2e,
      panelAlpha: 0.98,
      textColor: '#ffffff',
      accentColor: 0xffd166, // title/score color
      closeKey: 'X', // just label; not a texture key
    }, opts);

    // Sort by score (desc) by default
    this.data = [...data].sort((a, b) => (b.score|0) - (a.score|0));

    this._build();
  }

  _build() {
    const s = this.scene;
    const {
      panelWidth, panelHeight, pad, title, fontFamily, fontSize,
      titleSize, bgColor, bgAlpha, panelColor, panelAlpha, textColor,
      accentColor, rowHeight
    } = this.opts;

    const cx = s.scale.width / 2;
    const cy = s.scale.height / 2;

    // Dim background (click to close)
    this.backdrop = s.add.rectangle(0, 0, s.scale.width, s.scale.height, bgColor, bgAlpha)
      .setOrigin(0, 0).setScrollFactor(0)
      .setInteractive({ useHandCursor: true })
      .on('pointerdown', () => this.destroy());

    // Panel
    this.panel = s.add.rectangle(cx, cy, panelWidth, panelHeight, panelColor, panelAlpha)
      .setOrigin(0.5).setScrollFactor(0)
      .setStrokeStyle(2, 0x333344);

    // Title
    this.titleText = s.add.text(cx, cy - panelHeight/2 + pad + 6, title, {
      fontFamily, fontSize: `${titleSize}px`, color: accentColor
    }).setOrigin(0.5, 0);

    // Close button (text button)
    this.closeText = s.add.text(
      cx + panelWidth/2 - pad, cy - panelHeight/2 + pad + 6,
      '✕', { fontFamily, fontSize: `${titleSize}px`, color: '#bbbbbb' }
    ).setOrigin(1, 0).setInteractive({ useHandCursor: true })
     .on('pointerdown', () => this.destroy())
     .on('pointerover', () => this.closeText.setColor('#ffffff'))
     .on('pointerout',  () => this.closeText.setColor('#bbbbbb'));

    // Scroll area geometry
    const listTop = this.titleText.y + this.titleText.height + pad;
    const listHeight = panelHeight - (listTop - (cy - panelHeight/2)) - pad; // inner height below title
    const listLeft = cx - panelWidth/2 + pad;
    const listWidth = panelWidth - pad*2 - 10; // leave room for scrollbar

    // Invisible interactive zone for scroll / drag
    this.hitZone = s.add.rectangle(listLeft, listTop, listWidth, listHeight, 0x000000, 0.0001)
      .setOrigin(0, 0).setScrollFactor(0).setInteractive();

    // List container (holds rows)
    this.list = s.add.container(listLeft, listTop).setScrollFactor(0);

    // Add rows (index, name, score right-aligned)
    this.rows = [];
    const nameWidth = Math.floor(listWidth * 0.6);
    const scoreWidth = listWidth - nameWidth;

    this.data.forEach((row, i) => {
      const y = i * rowHeight + 4;

      const rankText = s.add.text(0, y, `${i + 1}.`, {
        fontFamily, fontSize: `${fontSize}px`, color: textColor
      }).setOrigin(0, 0);

      const nameText = s.add.text(40, y, row.name ?? 'Player', {
        fontFamily, fontSize: `${fontSize}px`, color: textColor
      }).setOrigin(0, 0)
        .setFixedSize(nameWidth - 50, rowHeight)
        .setWordWrapWidth(nameWidth - 50, true);

      const scoreText = s.add.text(40 + nameWidth, y, String(row.score ?? 0), {
        fontFamily, fontSize: `${fontSize}px`, color: accentColor, align: 'right',
        fixedWidth: scoreWidth - 8
      }).setOrigin(1, 0); // right-aligned at its x

      this.list.add([rankText, nameText, scoreText]);
      this.rows.push({ rankText, nameText, scoreText });
    });

    // Mask to clip list to the view
    const maskGfx = s.add.graphics().setScrollFactor(0);
    maskGfx.fillStyle(0xffffff);
    maskGfx.fillRect(listLeft, listTop, listWidth, listHeight);
    this.mask = maskGfx.createGeometryMask();
    this.list.setMask(this.mask);

    // Scrollbar
    this.scrollTrack = s.add.rectangle(
      listLeft + listWidth + 6, listTop, 4, listHeight, 0xffffff, 0.15
    ).setOrigin(0.5, 0).setScrollFactor(0);

    this.scrollHandle = s.add.rectangle(
      this.scrollTrack.x, this.scrollTrack.y, 6, 40, 0xffffff, 0.5
    ).setOrigin(0.5, 0).setScrollFactor(0);

    // Scroll state
    this.contentHeight = Math.max(this.data.length * rowHeight, listHeight);
    this.viewHeight = listHeight;
    this.scrollY = 0; // 0..(contentHeight - viewHeight)
    this._dragging = false;
    this._dragStartY = 0;
    this._scrollStartY = 0;

    this._updateScrollHandle();
    this._wireInput();
  }

  _wireInput() {
    const s = this.scene;

    // Mouse wheel over the hitZone
    this._wheelHandler = (pointer, gameObjects, dx, dy) => {
      if (!this.hitZone.input || !this.hitZone.getBounds().contains(pointer.x, pointer.y)) return;
      const step = 40;
      this._scrollBy(dy > 0 ? step : -step);
    };
    s.input.on('wheel', this._wheelHandler);

    // Drag to scroll
    this.hitZone.on('pointerdown', (p) => {
      this._dragging = true;
      this._dragStartY = p.y;
      this._scrollStartY = this.scrollY;
    });
    s.input.on('pointerup',   () => { this._dragging = false; });
    s.input.on('pointermove', (p) => {
      if (!this._dragging) return;
      const dy = p.y - this._dragStartY;
      this._setScroll(this._scrollStartY - dy);
    });

    // Drag scrollbar handle
    this.scrollHandle.setInteractive({ draggable: true, useHandCursor: true });
    s.input.setDraggable(this.scrollHandle);
    this.scrollHandle.on('drag', (pointer, dragX, dragY) => {
      // clamp handle within track
      const minY = this.scrollTrack.y;
      const maxY = this.scrollTrack.y + this.scrollTrack.height - this.scrollHandle.height;
      const clampedY = Phaser.Math.Clamp(dragY, minY, maxY);
      this.scrollHandle.y = clampedY;

      // map handle position -> scrollY
      const t = (clampedY - minY) / (maxY - minY || 1);
      const maxScroll = Math.max(this.contentHeight - this.viewHeight, 0);
      this._setScroll(t * maxScroll);
    });
  }

  _scrollBy(dy) {
    this._setScroll(this.scrollY + dy);
  }

  _setScroll(y) {
    const maxScroll = Math.max(this.contentHeight - this.viewHeight, 0);
    this.scrollY = Phaser.Math.Clamp(y, 0, maxScroll);
    // Move the list (upward as scroll increases)
    this.list.y = (this.list.y - (this.list.y)) + // normalize (no-op to avoid lint)
                  (this.panel.y - this.panel.height/2 + this.opts.pad + this.titleText.height + this.opts.pad) - this.scrollY;
    // The above can be simplified as we already set list at build; recompute:
    // Recompute base top:
    const listTop = this.titleText.y + this.titleText.height + this.opts.pad;
    this.list.setY(listTop - this.scrollY);

    this._updateScrollHandle();
  }

  _updateScrollHandle() {
    // Hide scrollbar if content fits
    if (this.contentHeight <= this.viewHeight + 1) {
      this.scrollTrack.setVisible(false);
      this.scrollHandle.setVisible(false);
      return;
    }
    this.scrollTrack.setVisible(true);
    this.scrollHandle.setVisible(true);

    const track = this.scrollTrack;
    const viewRatio = Phaser.Math.Clamp(this.viewHeight / this.contentHeight, 0.1, 1);
    const handleH = Math.max(track.height * viewRatio, 24); // min size
    this.scrollHandle.height = handleH;

    const maxScroll = this.contentHeight - this.viewHeight;
    const t = (maxScroll === 0) ? 0 : (this.scrollY / maxScroll);
    const minY = track.y;
    const maxY = track.y + track.height - handleH;
    this.scrollHandle.y = Phaser.Math.Linear(minY, maxY, t);
  }

  setData(data = []) {
    // Destroy old row texts
    this.rows?.forEach(r => { r.rankText.destroy(); r.nameText.destroy(); r.scoreText.destroy(); });
    this.rows = [];
    this.data = [...data].sort((a, b) => (b.score|0) - (a.score|0));

    const { rowHeight, fontFamily, fontSize, textColor, accentColor } = this.opts;
    const listWidth = this.panel.width - this.opts.pad*2 - 10;
    const nameWidth = Math.floor(listWidth * 0.6);
    const scoreWidth = listWidth - nameWidth;

    this.data.forEach((row, i) => {
      const y = i * rowHeight + 4;
      const rankText = this.scene.add.text(0, y, `${i + 1}.`, {
        fontFamily, fontSize: `${fontSize}px`, color: textColor
      }).setOrigin(0, 0);
      const nameText = this.scene.add.text(40, y, row.name ?? 'Player', {
        fontFamily, fontSize: `${fontSize}px`, color: textColor
      }).setOrigin(0, 0).setFixedSize(nameWidth - 50, rowHeight).setWordWrapWidth(nameWidth - 50, true);
      const scoreText = this.scene.add.text(40 + nameWidth, y, String(row.score ?? 0), {
        fontFamily, fontSize: `${fontSize}px`, color: accentColor, align: 'right',
        fixedWidth: scoreWidth - 8
      }).setOrigin(1, 0);

      this.list.add([rankText, nameText, scoreText]);
      this.rows.push({ rankText, nameText, scoreText });
    });

    // Recompute heights & reset scroll
    this.contentHeight = Math.max(this.data.length * rowHeight, this.viewHeight);
    this._setScroll(0);
  }

  destroy() {
    const s = this.scene;
    s.input.off('wheel', this._wheelHandler);
    s.input.off('pointerup');
    s.input.off('pointermove');

    this.backdrop?.destroy();
    this.panel?.destroy();
    this.titleText?.destroy();
    this.closeText?.destroy();
    this.hitZone?.destroy();
    this.list?.destroy(true);
    this.scrollTrack?.destroy();
    this.scrollHandle?.destroy();
    this.mask?.destroy();
  }
}
