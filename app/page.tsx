'use client';
import { Suspense, useState } from 'react';
import Curtain, { CustomProps } from './_components/Curtain';
import Customization from './_components/Customization';
import Description from './_components/Description';
import styles from './_styles/page.module.scss';

const Home = () => {
  const [animationControl, setControl] = useState<boolean>(false);
  const [props, setProps] = useState<CustomProps>({
    backgroundColor: '#8b4513',
    borderColor: '#daa520',
    borderWidth: '10px',
    borderStyle: 'double',
    showBorder: true,
    openSpeed: '1s',
    closeSpeed: '0.5s',
    openTiming: 'ease-in',
    closeTiming: 'ease-out',
  });

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Curtain control={animationControl} setControl={setControl} props={props}>
        <main className={styles.main}>
          <section>
            <h1 onClick={() => setControl(!animationControl)}>
              Close a curtain
            </h1>
            <Customization
              props={props}
              setProps={setProps}
              setControl={setControl}
            />
            <Description />
          </section>
        </main>
      </Curtain>
    </Suspense>
  );
};

export default Home;
