import { defineConfig } from 'umi';

import routes from './src/config/routes';

import theme from './src/config/theme';

export default defineConfig({
  title: 'FavorDao',
  links: [{ rel: 'icon', href: './logo.ico' }],
  nodeModulesTransform: {
    type: 'none',
  },
  history: {
    type: 'hash',
  },
  dynamicImport: {
    loading: '@/components/Loading',
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
  antd: false,
  locale: {
    default: 'en-US',
    antd: false,
    title: true,
    baseNavigator: false,
    baseSeparator: '-',
  },
  webpack5: {},
  chainWebpack: (config, { webpack, env }) => {
    config.module
      .rule('fonts')
      .test(/\.(eot|woff|woff2|ttf)(\?.*)?$/)
      .use('file-loader')
      .options({
        name: '[name].[contenthash].[ext]',
        outputPath: 'static/fonts',
      })
      .loader(require.resolve('@umijs/deps/compiled/file-loader'));
  },
});
