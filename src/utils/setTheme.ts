import cssVars from 'css-vars-ponyfill';
import { defaultTheme, THEME } from '@/config/themeConfig';

export type ThemeType = keyof typeof THEME;

export const setTheme = (themeKey: ThemeType) => {
  const themeKeys = Object.keys(THEME);
  let KEY: ThemeType;
  if (themeKeys.includes(themeKey)) {
    KEY = themeKey;
  } else {
    // KEY = (localStorage.getItem('theme') as ThemeType | undefined) || 'light';
    KEY = ((localStorage.getItem('theme') as ThemeType | undefined) ||
      defaultTheme) as ThemeType;
  }

  localStorage.setItem('theme', KEY);

  // let styleLink = document.getElementById('theme-style') as HTMLLinkElement;
  // let hrefSrc = `/theme/${KEY}.css`;

  // if (styleLink) {
  //   console.log('styleLink', styleLink);
  //   styleLink.href = hrefSrc;
  // } else {
  //   console.log('no styleLink');
  //   styleLink = document.createElement('link');
  //   styleLink.type = 'text/css';
  //   styleLink.rel = 'stylesheet';
  //   styleLink.id = 'theme-style';
  //   styleLink.href = hrefSrc;
  //   document.body.append(styleLink);
  // }

  cssVars({
    onlyLegacy: true,
    variables: THEME[KEY],
    onError() {
      cssVars({
        onlyLegacy: false,
        variables: THEME[KEY],
      });
    },
  });
};
