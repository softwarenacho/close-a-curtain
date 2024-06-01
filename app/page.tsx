'use client';
import { Suspense } from 'react';
import Curtain from './_components/Curtain';
import styles from './_styles/page.module.scss';

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Curtain>
        <main className={styles.main}>
          <section>
            <h1>Click to close a curtain</h1>
            <p>Feel free to use this component and animation</p>
          </section>
        </main>
      </Curtain>
    </Suspense>
  );
}
