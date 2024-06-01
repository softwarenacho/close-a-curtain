'use client';
import { Suspense, useState } from 'react';
import Curtain from './_components/Curtain';
import styles from './_styles/page.module.scss';

export default function Home() {
  const [animationControl, setControl] = useState<boolean>(false);
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Curtain externalControl={animationControl}>
        <main className={styles.main}>
          <section>
            <h1 onClick={() => setControl(!animationControl)}>
              Close a curtain
            </h1>
            <p>
              This component features an animated curtain effect that
              dynamically opens and closes based on user interactions. Perfect
              for adding a dramatic reveal or a hidden content section to your
              web application.
            </p>
            <h3>How it works:</h3>
            <ul>
              <li>
                Click on the top or bottom section to open or close the curtain.
              </li>
              <li>
                The animation starts from the current position, ensuring a
                seamless transition between states.
              </li>
              <li>
                Both sections animate simultaneously to provide a synchronized
                visual effect.
              </li>
            </ul>
            <p>
              Feel free to use this component and animation in your projects to
              create engaging user interfaces. We welcome you to customize and
              extend its functionality as needed!
            </p>
          </section>
        </main>
      </Curtain>
    </Suspense>
  );
}
