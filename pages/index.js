import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const { basePath } = useRouter();

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `${basePath}/phaser/phaser.min.js`;
    script.onload = () => {
      import('../src/main'); // start game
    };
    document.body.appendChild(script);
    return () => script.remove();
  }, [basePath]);

  return (
    <div>
      <div id="game-shell">
        <div id="game-holder" />
      </div>
    </div>
  );
}
