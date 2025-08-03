import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = '/phaser/phaser.min.js';
    script.onload = () => {
      import('../src/main'); // loads your game after Phaser is available
    };
    document.body.appendChild(script);
    return () => script.remove();
  }, []);


  return (
    <div>
      <h1>Phaser in Next.js</h1>
      <div id="phaser-container" />
    </div>
  );
}
