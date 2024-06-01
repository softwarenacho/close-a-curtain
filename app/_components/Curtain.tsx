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
  showShadow?: boolean;
  openSpeed?: string;
  closeSpeed?: string;
  openTiming?: string;
  closeTiming?: string;
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
  showShadow: true,
  openSpeed: '1s',
  closeSpeed: '0.5s',
  openTiming: 'ease-in',
  closeTiming: 'ease-out',
};

const Curtain = ({ children, control, setControl, props }: CurtainProps) => {
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [isReversing, setIsReversing] = useState<boolean>(false);

  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const handleStart = useCallback(() => {
    if (topRef.current && bottomRef.current) {
      start(
        topRef.current,
        props.openSpeed || defaultProps.openSpeed,
        props.openTiming || defaultProps.openTiming,
      );
      start(
        bottomRef.current,
        props.openSpeed || defaultProps.openSpeed,
        props.openTiming || defaultProps.openTiming,
      );
      setIsAnimating(true);
      setIsReversing(false);
    }
  }, [props.openSpeed, props.openTiming]);

  const handleStop = useCallback(() => {
    if (topRef.current && bottomRef.current) {
      stop(
        topRef.current,
        props.closeSpeed || defaultProps.closeSpeed,
        props.closeTiming || defaultProps.closeTiming,
      );
      stop(
        bottomRef.current,
        props.closeSpeed || defaultProps.closeSpeed,
        props.closeTiming || defaultProps.closeTiming,
      );
      setIsAnimating(false);
      setIsReversing(true);
    }
    setControl(false);
  }, [props.closeSpeed, props.closeTiming, setControl]);

  const calculatePosition = () => {
    if (props.showBorder === undefined) {
      return defaultProps.showBorder
        ? '0'
        : isAnimating
        ? '0'
        : `-${props.borderWidth || defaultProps.borderWidth}`;
    }
    return props.showBorder
      ? '0'
      : isAnimating
      ? '0'
      : `-${props.borderWidth || defaultProps.borderWidth}`;
  };

  const getFilter = (isTop: boolean, shadow: boolean) => {
    let filter = '';
    if (isTop && shadow) {
      filter = 'drop-shadow(0px 1px 1px black)';
    }
    if (!isTop && shadow) {
      filter = 'drop-shadow(0px -1px 1px black)';
    }
    return filter;
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
          filter: getFilter(
            isTop,
            props.showShadow !== undefined
              ? !!props.showShadow
              : defaultProps.showShadow,
          ),
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
