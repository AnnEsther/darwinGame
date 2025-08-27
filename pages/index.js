import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const { basePath, pathname } = useRouter();
  const booted = useRef(false);

  useEffect(() => {
    if (booted.current || typeof window === 'undefined') return;
    booted.current = true;

    // load Phaser from /public/phaser/phaser.min.js
    const s = document.createElement('script');
    s.src = `${basePath || ''}/phaser/phaser.min.js`;
    s.async = true;
    s.onload = async () => {
      if (pathname === '/leaderboard') {
        const m = await import('../src/mainL');  // ensure this file exists
        m.default?.();
      } else {
        const m = await import('../src/main');   // ensure this file exists
        m.default?.();
      }
    };
    document.body.appendChild(s);
    return () => s.remove();
  }, [basePath, pathname]);

  return (
    <div>
      <div id="game-shell"><div id="game-holder" /></div>
    </div>
  );
}
