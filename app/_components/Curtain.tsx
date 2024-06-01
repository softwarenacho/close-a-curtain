import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import styles from '../_styles/Curtain.module.scss';

interface CurtainProps {
  children: ReactNode;
  externalControl: boolean;
}

export default function Curtain({ children, externalControl }: CurtainProps) {
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [isReversing, setIsReversing] = useState<boolean>(false);

  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const getCurrentHeight = (box: HTMLDivElement) => {
    if (box) {
      const computedStyle = window.getComputedStyle(box);
      return computedStyle.height;
    }
    return '0vh';
  };

  const createAnimation = (
    name: string,
    fromHeight: string,
    toHeight: string,
  ) => {
    const keyframes = `
      @keyframes ${name} {
        from { height: ${fromHeight}; }
        to { height: ${toHeight}; }
      }
    `;
    const styleSheet = document.styleSheets[0];
    styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
  };

  const start = useCallback((box: HTMLDivElement) => {
    if (box) {
      const currentHeight = getCurrentHeight(box);
      const animationName = `openAnimation${Date.now()}`;
      createAnimation(animationName, currentHeight, '50vh');

      box.style.animation = 'none';

      requestAnimationFrame(() => {
        box.style.animation = `${animationName} 2s ease-in forwards`;
      });

      setIsAnimating(true);
      setIsReversing(false);
    }
  }, []);

  const handleStart = useCallback(() => {
    topRef.current && start(topRef.current);
    bottomRef.current && start(bottomRef.current);
  }, [start]);

  const stop = useCallback((box: HTMLDivElement) => {
    if (box) {
      const currentHeight = getCurrentHeight(box);
      const animationName = `closeAnimation${Date.now()}`;
      createAnimation(animationName, currentHeight, '0vh');

      box.style.height = currentHeight;
      box.style.animation = 'none';

      requestAnimationFrame(() => {
        box.style.animation = `${animationName} 1s ease-out forwards`;
      });

      setIsAnimating(false);
      setIsReversing(true);
    }
  }, []);

  const handleStop = useCallback(() => {
    topRef.current && stop(topRef.current);
    bottomRef.current && stop(bottomRef.current);
  }, [stop]);

  useEffect(() => {
    const box = topRef.current;
    if (box) {
      box.addEventListener('animationend', () => {
        if (isReversing) {
          box.style.height = '0vh';
        }
        if (isAnimating) {
          box.style.height = '50vh';
        }
      });
    }
  }, [isAnimating, isReversing]);

  useEffect(() => {
    externalControl ? handleStart() : handleStop();
  }, [externalControl, handleStart, handleStop]);

  return (
    <div className={styles.container}>
      <div
        ref={topRef}
        className={`${styles.top}`}
        onClick={() => (isAnimating ? handleStop() : handleStart())}
      />
      <div className={styles.content}>{children}</div>
      <div
        ref={bottomRef}
        className={`${styles.bottom}`}
        onClick={() => (isAnimating ? handleStop() : handleStart())}
      />
    </div>
  );
}
