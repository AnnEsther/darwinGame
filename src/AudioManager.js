// AudioManager.js
export default class AudioManager {
    static instance = null;

    constructor(scene) {
        if (AudioManager.instance) {
            return AudioManager.instance; // Singleton
        }

        this.scene = scene;
        this.music = null;
        AudioManager.instance = this;

    }

    static getInstance(scene) {
        if (!AudioManager.instance) {
            AudioManager.instance = new AudioManager(scene);
        }
        return AudioManager.instance;
    }

    preload() {
        // Load your music file in the scene preload
        // Example: this.scene.load.audio('bgMusic', 'assets/audio/music.mp3');
    }

    playMusic(key, config = { loop: true, volume: 0.5 }) {
        if (this.music) {
            this.music.stop(); // Stop any existing music before playing a new one
        }
        this.music = this.scene.sound.add(key, config);
        this.music.play();
    }

    stopMusic() {
        if (this.music) {
            this.music.stop();
            this.music = null;
        }
    }

    pauseMusic() {
        if (this.music) {
            this.music.pause();
        }
    }

    resumeMusic() {
        if (this.music) {
            this.music.resume();
        }
    }

    setVolume(volume) {
        if (this.music) {
            this.music.setVolume(volume);
        }
    }

    playSFX(key, config = { loop: false, volume: 1 }) {
        this.sfx = this.scene.sound.add(key, config);
        this.sfx.play();
    }
}