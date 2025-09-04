# DarwinGame

DarwinGame is a **Phaser 3** game embedded inside a **Next.js** app.  
The game can be run locally during development or exported as a static build for deployment.  
It also supports switching between different entry files (`main.js` and `mainL.js`) based on the route.

---

## 🚀 How It Works

- The game logic lives in the `src/` folder:
  - `src/main.js` → normal game
  - `src/mainL.js` → alternate version (used on `/leaderboard/`)
- Next.js serves as the app shell.  
- On load, `phaser.min.js` (from `/public/phaser/`) is dynamically added to the page, and the correct game entry is imported depending on the route:
  - `/` → boots `main.js`
  - `/leaderboard/` → boots `mainL.js`
- The game attaches to `<div id="game-holder" />` in the DOM.

---

## 📂 Project Structure

```
/pages
  index.js          # Main page that boots Phaser
  leaderboard.js    # Reuses index but loads `mainL.js`
/public/phaser
  phaser.min.js     # Phaser library (served statically)
/src
  main.js           # Main game entry
  mainL.js          # Alternate entry (leaderboard mode)
```

---

## 🛠 Development

Install dependencies:

```bash
npm install
```

Run the dev server:

```bash
npm run dev
```

Open:

- [http://localhost:3000/](http://localhost:3000/) → normal game  
- [http://localhost:3000/leaderboard/](http://localhost:3000/leaderboard/) → leaderboard version  

---

## 🏗 Build

Generate a static export:

```bash
npm run build
```

This outputs a static site into the `/out` folder, ready to be hosted on any static hosting service (e.g., Vercel, Netlify, GitHub Pages, AWS S3, etc.).

---

## 🐞 Debugging

Inside `src/main.js`, you can enable debug mode by setting:

```js
const DEBUG = true;
```

This will show debug information during development.

---

## 🌐 API Integration

DarwinGame does **not** include direct API integration logic.  
It expects calls to be made against the provided API endpoints (e.g., user creation, leaderboard fetching) outside of this repository.  

---
