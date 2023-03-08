let storageTheme = localStorage.getItem('theme');
export const defaultTheme = storageTheme ? storageTheme : 'light';

const baseCss = {
  color_1: 'rgba(0, 0, 0, 1)',
  color_2: 'rgba(33, 33, 0, 1)',
  color_3: 'rgba(33, 33, 33, 1)',
  color_4: 'rgba(51, 51, 51, 1)',
  color_5: 'rgba(66, 66, 66, 1)',
  color_6: 'rgba(99, 99, 99, 1)',
  color_7: 'rgba(102, 102, 102, 1)',
  color_8: 'rgba(153, 153, 153, 1)',
  color_9: 'rgba(204, 204, 204, 1)',
  color_10: 'rgba(212, 212, 212, 1)',
  color_11: 'rgba(227, 227, 227, 1)',
  color_12: 'rgba(240, 240, 240, 1)',
  color_13: 'rgba(245, 245, 245, 1)',
  color_14: 'rgba(255, 255, 255, 1)',
  color_15: 'rgba(255, 166, 0, 1)',
  color_16: 'rgba(15, 15, 15, 1)',
  color_17: 'rgba(255, 166, 0, 0.1)',
  color_18: 'rgba(229, 229, 229, 1)',
  color_19: 'rgba(20, 20, 20, 1)',
  fontFamily_1: 'Ping-Fang',
};

export const THEME = {
  light: {
    // global variable
    '--font-family': baseCss.fontFamily_1,
    '--global-background': baseCss.color_14,
    '--global-color': baseCss.color_3,
    // main
    '--main-graphicMessage-userInfo-text-name-color': baseCss.color_3,
    '--main-graphicMessage-userInfo-text-releaseTime-color': baseCss.color_6,
    '--main-graphicMessage-textInfo-text-name-color': baseCss.color_3,
    '--main-graphicMessage-operate-text-color': baseCss.color_6,

    '--main-myAttention-content-background': baseCss.color_14,
    '--main-myAttention-topNav-navLeft-text-color': baseCss.color_3,
    '--main-myAttention-topNav-navRight-text-color': baseCss.color_8,
    '--main-myAttention-bottomNav-myCreated-text-color': baseCss.color_3,
    '--main-myAttention-bottomNav-verticalLine-border': baseCss.color_18,
    '--main-myAttention-bottomNav-myJoin-userArr-text-color': baseCss.color_3,

    '--main-communityCard-bottom-background': 'rgba(255,255,255,.1)',
    '--main-communityCard-bottom-textLeft-color': baseCss.color_14,
    '--main-communityCard-bottom-textRight-border': baseCss.color_12,
    '--main-communityCard-bottom-textRight-color': baseCss.color_12,

    '--main-menuBar-tabBar-svg-normal': baseCss.color_7,
    '--main-menuBar-tabBar-svg-active': baseCss.color_15,
    '--main-menuBar-tabBar-text-normal': baseCss.color_5,
    '--main-menuBar-tabBar-text-active': baseCss.color_3,

    // main latest
    '--latest-follow-nav-normal-color': baseCss.color_6,
  },
  dark: {
    // global variable
    '--font-family': baseCss.fontFamily_1,
    '--global-background': baseCss.color_16,
    '--global-color': baseCss.color_10,
    // main
    '--main-graphicMessage-userInfo-text-name-color': baseCss.color_11,
    '--main-graphicMessage-userInfo-text-releaseTime-color': baseCss.color_6,
    '--main-graphicMessage-textInfo-text-name-color': baseCss.color_10,
    '--main-graphicMessage-operate-text-color': baseCss.color_8,

    '--main-myAttention-content-background': baseCss.color_19,
    '--main-myAttention-topNav-navLeft-text-color': baseCss.color_10,
    '--main-myAttention-topNav-navRight-text-color': baseCss.color_8,
    '--main-myAttention-bottomNav-myCreated-text-color': baseCss.color_10,
    '--main-myAttention-bottomNav-verticalLine-border': baseCss.color_18,
    '--main-myAttention-bottomNav-myJoin-userArr-text-color': baseCss.color_10,

    '--main-communityCard-bottom-background': 'rgba(255,255,255,.1)',
    '--main-communityCard-bottom-textLeft-color': baseCss.color_14,
    '--main-communityCard-bottom-textRight-border': baseCss.color_12,
    '--main-communityCard-bottom-textRight-color': baseCss.color_12,

    '--main-menuBar-tabBar-svg-normal': baseCss.color_7,
    '--main-menuBar-tabBar-svg-active': baseCss.color_15,
    '--main-menuBar-tabBar-text-normal': baseCss.color_7,
    '--main-menuBar-tabBar-text-active': baseCss.color_10,

    // main latest
    '--latest-follow-nav-normal-color': baseCss.color_10,
  },
};
