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
        path: '/main',
        component: '@/pages/Main',
        routes: [
          {
            path: '/main',
            redirect: '/main/latest',
          },
          {
            path: '/main/latest',
            component: '@/pages/Main/Latest',
          },
          {
            path: '/main/daoList',
            component: '@/pages/Main/DaoList',
          },
          {
            path: '/main/chat',
            component: '@/pages/Main/Chat',
          },
          {
            path: '/main/mine',
            component: '@/pages/Main/Mine',
          },
        ],
      },
      {
        path: '/dao/:id',
        component: '@/pages/Dao',
      },
      {
        path: '/video/:vid',
        component: '@/pages/Video',
      },
    ],
  },
];
