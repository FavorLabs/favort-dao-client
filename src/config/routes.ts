export default [
  {
    path: '/',
    component: '@/layout',
    routes: [
      {
        path: '/',
        component: '@/pages/ConnectWallet',
      },
      {
        path: '/home',
        component: '@/pages/Home',
      },
      {
        path: '/create',
        component: '@/pages/CreateChannel',
      },
      {
        path: '/:address',
        component: '@/pages/Channel',
        routes: [
          {
            path: '/:address',
            component: '@/pages/ChannelDetail',
          },
          {
            path: '/:address/video/:id',
            component: '@/pages/Video',
          },
          {
            path: '/:address/manage',
            component: '@/pages/Manage',
            routes: [
              {
                path: '/:address/manage',
                component: '@/pages/Manage/VideoList',
              },
              {
                path: '/:address/manage/others',
                component: '@/pages/Manage/Others',
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
