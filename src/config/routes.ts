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
            redirect: '/main/daoList',
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
        routes: [
          // {
          //   path: '/dao/:address',
          //   redirect: '/dao/:address/videos',
          // },
          // {
          //   path: '/dao/:id/newsletter',
          //   component: '@/pages/Dao/Newsletter',
          // },
          // {
          //   path: '/dao/:id/videos',
          //   component: '@/pages/Dao/Videos',
          //   routes: [
          //     // {
          //     //   path: '/dao/:address/videos',
          //     //   component: '@/pages/Dao/Videos/ChannelDetail',
          //     // },
          //     // {
          //     //   path: '/dao/:address/videos/video/:id',
          //     //   component: '@/pages/Video',
          //     // },
          //     // {
          //     //   path: '/dao/:address/videos/manage',
          //     //   component: '@/pages/Manage',
          //     //   // wrappers: ['@/wrappers/auth.tsx'],
          //     //   routes: [
          //     //     {
          //     //       path: '/dao/:address/videos/manage',
          //     //       component: '@/pages/Manage/VideoList',
          //     //     },
          //     //     {
          //     //       path: '/dao/:address/videos/manage/others',
          //     //       component: '@/pages/Manage/Others',
          //     //     },
          //     //     {
          //     //       path: '/dao/:address/videos/manage/details/:id',
          //     //       component: '@/pages/Manage/Details',
          //     //     },
          //     //   ],
          //     // },
          //   ],
          // },
          // {
          //   path: '/dao/:id/group',
          //   component: '@/pages/Dao/Group',
          // },
        ],
      },
    ],
  },
];
