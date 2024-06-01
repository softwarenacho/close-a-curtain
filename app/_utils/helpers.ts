

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

export const start = (box: HTMLDivElement) => {
  if (box) {
    const currentHeight = getCurrentHeight(box);
    const animationName = `openAnimation${Date.now()}`;
    createAnimation(animationName, currentHeight, '50vh');
    box.style.animation = 'none';
    requestAnimationFrame(() => {
      box.style.animation = `${animationName} 2s ease-in forwards`;
    });
  }
};

export const stop = (box: HTMLDivElement) => {
  if (box) {
    const currentHeight = getCurrentHeight(box);
    const animationName = `closeAnimation${Date.now()}`;
    createAnimation(animationName, currentHeight, '0vh');
    box.style.height = currentHeight;
    box.style.animation = 'none';
    requestAnimationFrame(() => {
      box.style.animation = `${animationName} 1s ease-out forwards`;
    });

  }
};