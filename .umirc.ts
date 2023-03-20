import { defineConfig } from 'umi';
import routes from './src/config/routes';
import theme from './src/config/theme';
const TerserPlugin = require('terser-webpack-plugin');

export default defineConfig({
  title: 'FavorDao',
  links: [{ rel: 'icon', href: './logo.ico' }],
  nodeModulesTransform: {
    type: 'none',
  },
  plugins: ['./src/plugins/modifyHtml.ts'],
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
  extraBabelPlugins: ['react-activation/babel'],
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
    // config.plugin('TerserPlugin').use(TerserPlugin, [
    //   {
    //     parallel: true,
    //     terserOptions: {
    //       ecma: undefined,
    //       warnings: false,
    //       parse: {},
    //       compress: {
    //         drop_console: true,
    //         drop_debugger: false,
    //         pure_funcs: ['console.warn'],
    //       },
    //     },
    //   },
    // ]);
  },
});
