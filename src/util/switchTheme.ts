import { ISettings } from '@/types';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import themeColors from '@/styles/themes.json';

type RGBAColor = {
  r: number;
  g: number;
  b: number;
  a?: number;
};
let isInitialized = false;
const HEX_COLOR_REGEX = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i;
const ENABLE_ANIMATION_DELAY_MS = 500;
const lerp = (
  start: number,
  end: number,
  interpolationRatio: number,
) => (1 - interpolationRatio) * start + interpolationRatio * end;
function hexToRgb(hex: string): RGBAColor {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const result = HEX_COLOR_REGEX.exec(hex)!;

  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
    a: result[4] !== undefined ? parseInt(result[4], 16) : undefined,
  };
}

const colors = (Object.keys(themeColors) as Array<keyof typeof themeColors>).map((property) => ({
  property,
  colors: [hexToRgb(themeColors[property][0]), hexToRgb(themeColors[property][1])],
}));

function applyColorAnimationStep(startIndex: number, endIndex: number, interpolationRatio = 1) {
  colors.forEach(({ property, colors: propertyColors }) => {
    const r = Math.round(
      lerp(propertyColors[startIndex].r, propertyColors[endIndex].r, interpolationRatio),
    );
    const g = Math.round(
      lerp(propertyColors[startIndex].g, propertyColors[endIndex].g, interpolationRatio),
    );
    const b = Math.round(
      lerp(propertyColors[startIndex].b, propertyColors[endIndex].b, interpolationRatio),
    );
    const a = propertyColors[startIndex].a !== undefined
      ? Math.round(
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        lerp(propertyColors[startIndex].a!, propertyColors[endIndex].a!, interpolationRatio),
      )
      : undefined;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    document.documentElement.style.setProperty(property, a !== undefined
      ? `rgba(${r},${g},${b},${a / 255})`
      : `rgb(${r},${g},${b})`);
  });
}

export default (theme: ISettings['theme']) => {
  console.log('switchTheme', theme);
  const isDarkTheme = theme === 'dark';
  const startIndex = isDarkTheme ? 0 : 1;
  const endIndex = isDarkTheme ? 1 : 0;
  const themeColorTag = document.querySelector('meta[name="theme-color"]');

  document.documentElement.classList.remove(`theme-${isDarkTheme ? 'light' : 'dark'}`);
  if (isInitialized) {
    document.documentElement.classList.add('no-animations');
  }
  document.documentElement.classList.add(`theme-${theme}`);
  if (themeColorTag) {
    themeColorTag.setAttribute('content', isDarkTheme ? '#212121' : '#fff');
  }

  setTimeout(() => {
    document.documentElement.classList.remove('no-animations');
  }, ENABLE_ANIMATION_DELAY_MS);
  isInitialized = true;
  applyColorAnimationStep(startIndex, endIndex);
};
