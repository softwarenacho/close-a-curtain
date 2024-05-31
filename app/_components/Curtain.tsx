import { ReactNode } from 'react';
import styles from '../_styles/Curtain.module.scss';

export default function Curtain({ children }: { children: ReactNode }) {
  return (
    <div className={styles.container}>
      <div className={styles.top} />
      <div className={styles.content}>{children}</div>
      <div className={styles.bottom} />
    </div>
  );
}
