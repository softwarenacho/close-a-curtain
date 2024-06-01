import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import styles from '../_styles/Curtain.module.scss';
import { start, stop } from '../_utils/helpers';

export const borderStyles = [
  'solid',
  'dashed',
  'dotted',
  'double',
  'groove',
  'ridge',
  'none',
];

export type BorderStyle =
  | 'solid'
  | 'dashed'
  | 'dotted'
  | 'double'
  | 'groove'
  | 'ridge'
  | 'none';

export interface CustomProps {
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: string;
  borderStyle?: BorderStyle;
  showBorder?: boolean;
}

interface CurtainProps {
  children: ReactNode;
  control: boolean;
  setControl: Dispatch<SetStateAction<boolean>>;
  props: CustomProps;
}

const defaultProps = {
  backgroundColor: '#8b4513',
  borderColor: '#daa520',
  borderWidth: '10px',
  borderStyle: 'double',
  showBorder: true,
};

const Curtain = ({ children, control, setControl, props }: CurtainProps) => {
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [isReversing, setIsReversing] = useState<boolean>(false);

  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const handleStart = useCallback(() => {
    topRef.current && start(topRef.current);
    bottomRef.current && start(bottomRef.current);
    if (topRef.current && bottomRef.current) {
      setIsAnimating(true);
      setIsReversing(false);
    }
  }, []);

  const handleStop = useCallback(() => {
    topRef.current && stop(topRef.current);
    bottomRef.current && stop(bottomRef.current);
    if (topRef.current && bottomRef.current) {
      setIsAnimating(false);
      setIsReversing(true);
    }
    setControl(false);
  }, [setControl]);

  const calculatePosition = () => {
    if (props.showBorder === undefined) {
      return defaultProps.showBorder
        ? '0'
        : `-${props.borderWidth || defaultProps.borderWidth}`;
    }
    return props.showBorder
      ? '0'
      : `-${props.borderWidth || defaultProps.borderWidth}`;
  };

  const curtain = (top: 'top' | 'bottom' = 'top') => {
    const isTop = top === 'top';
    return (
      <div
        ref={isTop ? topRef : bottomRef}
        className={`${isTop ? styles.top : styles.bottom}`}
        onClick={() => (isAnimating ? handleStop() : handleStart())}
        style={{
          top: isTop ? calculatePosition() : 'unset',
          bottom: !isTop ? calculatePosition() : 'unset',
          borderColor: props.borderColor || defaultProps.borderColor,
          background: props.backgroundColor || defaultProps.backgroundColor,
          borderStyle: props.borderStyle || defaultProps.borderStyle,
          borderBottomWidth: isTop
            ? props.borderWidth || defaultProps.borderWidth
            : '',
          borderTopWidth: !isTop
            ? props.borderWidth || defaultProps.borderWidth
            : '',
        }}
      />
    );
  };

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
    control ? handleStart() : handleStop();
  }, [control, handleStart, handleStop]);

  return (
    <div className={styles.container}>
      {curtain('top')}
      <div className={styles.content}>{children}</div>
      {curtain('bottom')}
    </div>
  );
};

export default Curtain;
