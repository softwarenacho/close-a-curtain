import { Dispatch, SetStateAction } from 'react';
import styles from '../_styles/Customization.module.scss';
import { getContrast } from '../_utils/helpers';
import { BorderStyle, CustomProps, borderStyles } from './Curtain';

interface CustomizationProps {
  props: CustomProps;
  setProps: Dispatch<SetStateAction<CustomProps>>;
  setControl: Dispatch<SetStateAction<boolean>>;
}

const Customization = ({ props, setProps, setControl }: CustomizationProps) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setControl(true);
  };

  const controls = () => {
    return (
      <form className={styles.form} onSubmit={handleSubmit}>
        <label>
          <span>Background Color</span>
          <input
            value={props.backgroundColor}
            onChange={(event) =>
              setProps({
                ...props,
                backgroundColor: event.target.value,
              })
            }
            type='color'
          />
        </label>
        <label>
          <span>Border Color</span>
          <input
            value={props.borderColor}
            onChange={(event) =>
              setProps({
                ...props,
                borderColor: event.target.value,
              })
            }
            type='color'
          />
        </label>
        <label>
          <span>Show Border</span>
          <input
            type='checkbox'
            checked={props.showBorder}
            onChange={(event) =>
              setProps({
                ...props,
                showBorder: event.target.checked,
              })
            }
          />
        </label>
        <label>
          <span>Border Width</span>
          <input
            value={props.borderWidth}
            onChange={(event) =>
              setProps({ ...props, borderWidth: event.target.value })
            }
            type='text'
          />
        </label>
        <label>
          <span>Open Speed</span>
          <input
            value={props.openSpeed}
            onChange={(event) =>
              setProps({ ...props, openSpeed: event.target.value })
            }
            type='text'
          />
        </label>
        <label>
          <span>Close Speed</span>
          <input
            value={props.closeSpeed}
            onChange={(event) =>
              setProps({ ...props, closeSpeed: event.target.value })
            }
            type='text'
          />
        </label>
        <label>
          <span>Border Style</span>
          <select
            id='border-style-select'
            value={props.borderStyle}
            onChange={(event) =>
              setProps({
                ...props,
                borderStyle: event.target.value as BorderStyle,
              })
            }
          >
            {borderStyles.map((style) => (
              <option key={style} value={style}>
                {style}
              </option>
            ))}
          </select>
        </label>
        <button
          style={{
            backgroundColor: props.backgroundColor,
            borderColor: props.borderColor,
            color: getContrast(props.backgroundColor || ''),
          }}
          type='submit'
        >
          Close!
        </button>
      </form>
    );
  };
  return controls();
};

export default Customization;
