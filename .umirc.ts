import { defineConfig } from 'umi';

import routes from './src/config/routes';

import theme from './src/config/theme';

export default defineConfig({
  title: 'FavorTube',
  links: [{ rel: 'icon', href: './logo.ico' }],
  nodeModulesTransform: {
    type: 'none',
  },
  history: {
    type: 'hash',
  },
  fastRefresh: {},
  dva: {
    immer: true,
    hmr: false,
  },
  hash: true,
  publicPath: './',
  routes,
  theme,
});
