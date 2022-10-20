export type ThemeKey = 'light' | 'dark';

export interface ISettings extends Record<string, unknown> {
  theme: ThemeKey;
  shouldUseSystemTheme: boolean;
  animationLevel: 0 | 1 | 2;
}
