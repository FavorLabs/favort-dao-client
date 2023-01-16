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
        routes: [
          {
            path: '/:address',
            component: '@/pages/ChannelDetail',
            name: 'channelDetail',
          },
          {
            path: '/:address/video/:id',
            component: '@/pages/Video',
            name: 'video',
          },
          {
            path: '/:address/manage',
            component: '@/pages/Manage',
            name: 'manage',
            routes: [
              {
                path: '/:address/manage',
                component: '@/pages/Manage/VideoList',
                name: 'videoList',
              },
              {
                path: '/:address/manage/others',
                component: '@/pages/Manage/Others',
                name: 'others',
              },
              {
                path: '/:address/manage/details/:id',
                component: '@/pages/Manage/Details',
              },
            ],
          },
        ],
      },
    ],
  },
];
