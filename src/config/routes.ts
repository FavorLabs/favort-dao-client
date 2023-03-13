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
        path: '/createCommunity',
        component: '@/pages/CreateCommunity',
        wrappers: ['@/wrappers/auth'],
      },
      {
        path: '/postNewsletter',
        component: '@/pages/PostNewsletter',
        wrappers: ['@/wrappers/auth'],
      },
      {
        path: '/postVideo',
        component: '@/pages/PostVideo',
        wrappers: ['@/wrappers/auth'],
      },
      {
        path: '/groupList',
        component: '@/pages/GroupList',
        wrappers: ['@/wrappers/auth'],
      },
      {
        path: '/focusList',
        component: '@/pages/FocusList',
        wrappers: ['@/wrappers/auth'],
      },
      {
        path: '/video/:vid',
        component: '@/pages/Video',
        wrappers: ['@/wrappers/auth'],
      },
      {
        path: '/newsletterList/:daoId',
        component: '@/pages/NewsletterList',
        wrappers: ['@/wrappers/auth'],
      },
      {
        path: '/videoList/:daoId',
        component: '@/pages/VideoList',
        wrappers: ['@/wrappers/auth'],
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
                redirect: '/latest/recommend',
              },
              {
                path: '/latest/follow',
                component: '@/pages/Main/Latest/Follow',
                wrappers: ['@/wrappers/auth'],
              },
              {
                path: '/latest/recommend',
                component: '@/pages/Main/Latest/Recommend',
              },
            ],
          },
          {
            path: '/dao/:daoId?',
            component: '@/pages/Main/Dao',
            wrappers: ['@/wrappers/auth'],
          },
          {
            path: '/chat',
            component: '@/pages/Main/Chat',
            wrappers: ['@/wrappers/auth'],
          },
          {
            path: '/mine',
            component: '@/pages/Main/Mine',
            wrappers: ['@/wrappers/auth'],
          },
        ],
      },
    ],
  },
];
