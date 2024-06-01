import { Dispatch, SetStateAction, useState } from 'react';
import styles from '../_styles/Customization.module.scss';
import { BorderStyle, CustomProps, borderStyles } from './Curtain';

interface CustomizationProps {
  setProps: Dispatch<SetStateAction<CustomProps>>;
  setControl: Dispatch<SetStateAction<boolean>>;
}

const Customization = ({ setProps, setControl }: CustomizationProps) => {
  const [backgroundColor, setBackgroundColor] = useState<string>('#8b4513');
  const [borderColor, setBorderColor] = useState<string>('#daa520');
  const [borderWidth, setBorderWidth] = useState<string>('10px');
  const [borderStyle, setBorderStyle] = useState<BorderStyle>('double');
  const [isChecked, setIsChecked] = useState(true);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setProps({
      backgroundColor,
      borderColor,
      borderWidth,
      borderStyle,
      showBorder: isChecked,
    });
    setControl(true);
  };

  const controls = () => {
    return (
      <form className={styles.form} onSubmit={handleSubmit}>
        <label>
          <span>Background Color</span>
          <input
            value={backgroundColor}
            onChange={(event) => setBackgroundColor(event.target.value)}
            type='color'
          />
        </label>
        <label>
          <span>Border Color</span>
          <input
            value={borderColor}
            onChange={(event) => setBorderColor(event.target.value)}
            type='color'
          />
        </label>
        <label>
          <span>Show Border Initial</span>
          <input
            type='checkbox'
            checked={isChecked}
            onChange={(event) => setIsChecked(event.target.checked)}
          />
        </label>
        <label>
          <span>Border Width</span>
          <input
            value={borderWidth}
            onChange={(event) => setBorderWidth(event.target.value)}
            type='text'
            placeholder='eg. 1rem 5px 0.5vh'
          />
        </label>
        <label>
          <span>Border Style</span>
          <select
            id='border-style-select'
            value={borderStyle}
            onChange={(event) =>
              setBorderStyle(event.target.value as BorderStyle)
            }
          >
            {borderStyles.map((style) => (
              <option key={style} value={style}>
                {style}
              </option>
            ))}
          </select>
        </label>
        <button type='submit'>Set!</button>
      </form>
    );
  };
  return (
    <>
      <p>Customize the Curtain component</p>
      {controls()}
    </>
  );
};

export default Customization;
