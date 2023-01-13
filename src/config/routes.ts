export default [
  {
    path: '/',
    component: '@/layout',
    routes: [
      {
        path: '/',
        component: '@/pages/ConnectWallet',
        name: 'connectwallet',
      },
      {
        path: '/home',
        component: '@/pages/Home',
        name: 'home',
      },
      {
        path: '/create',
        component: '@/pages/CreateChannel',
        name: 'create',
      },
      {
        path: '/:address',
        component: '@/pages/Channel',
        name: 'channel',
      },
      {
        path: '/video',
        component: '@/pages/Video',
        name: 'video',
      },
      {
        path: '/manage',
        component: '@/pages/Manage',
        name: 'manage',
      },
    ],
  },
];
