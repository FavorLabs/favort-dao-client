export default [
  {
    path: '/',
    component: '@/layout',
    routes: [
      {
        path: '/login',
        component: '@/pages/ConnectWallet',
      },
      {
        path: '/dao/:id',
        component: '@/pages/Dao',
      },
      {
        path: '/createCommunity',
        component: '@/pages/CreateCommunity',
      },
      {
        path: '/postNewsletter',
        component: '@/pages/PostNewsletter',
      },
      {
        path: '/postVideo',
        component: '@/pages/PostVideo',
      },
      {
        path: '/video/:vid',
        component: '@/pages/Video',
      },
      {
        path: '/',
        component: '@/pages/Main',
        routes: [
          {
            path: '/',
            redirect: '/latest',
          },
          {
            path: '/latest',
            component: '@/pages/Main/Latest',
            routes: [
              {
                path: '/latest',
                redirect: '/latest/follow',
              },
              {
                path: '/latest/follow',
                component: '@/pages/Main/Latest/Follow',
              },
              {
                path: '/latest/recommend',
                component: '@/pages/Main/Latest/Recommend',
              },
            ],
          },
          {
            path: '/daoList',
            component: '@/pages/Main/DaoList',
          },
          {
            path: '/chat',
            component: '@/pages/Main/Chat',
          },
          {
            path: '/mine',
            component: '@/pages/Main/Mine',
          },
        ],
      },
    ],
  },
];
