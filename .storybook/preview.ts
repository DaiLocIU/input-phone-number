import '../src/styles/index.scss';
import switchTheme from "@/util/switchTheme";
switchTheme('dark');
// @ts-ignore
window.top.fnSwitchTheme = switchTheme;
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  themes: {
    default: 'dark',
    list: [
      { name: 'dark', color: '#000' },
      { name: 'light', color: '#fff' }
    ],
    onChange(theme:unknown) {
      // @ts-ignore
      window.fnSwitchTheme(theme.name)
    }
  },
}
