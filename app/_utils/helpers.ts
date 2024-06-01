

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

export const start = (box: HTMLDivElement, speed: string, timing: string) => {
  if (box) {
    const currentHeight = getCurrentHeight(box);
    const animationName = `openAnimation${Date.now()}`;
    createAnimation(animationName, currentHeight, '50vh');
    box.style.animation = 'none';
    requestAnimationFrame(() => {
      box.style.animation = `${animationName} ${speed} ${timing} forwards`;
    });
  }
};

export const stop = (box: HTMLDivElement, speed: string, timing: string) => {
  if (box) {
    const currentHeight = getCurrentHeight(box);
    const animationName = `closeAnimation${Date.now()}`;
    createAnimation(animationName, currentHeight, '0vh');
    box.style.height = currentHeight;
    box.style.animation = 'none';
    requestAnimationFrame(() => {
      box.style.animation = `${animationName} ${speed} ${timing} forwards`;
    });

  }
};

export const getContrast = (hexcolor: string) => {
  hexcolor = hexcolor.replace('#', '');
  let r = parseInt(hexcolor.substr(0, 2), 16);
  let g = parseInt(hexcolor.substr(2, 2), 16);
  let b = parseInt(hexcolor.substr(4, 2), 16);
  let yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? 'black' : 'white';
};