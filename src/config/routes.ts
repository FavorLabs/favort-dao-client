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
        path: 'groupList',
        component: '@/pages/GroupList',
      },
      {
        path: 'focusList',
        component: '@/pages/FocusList',
      },
      {
        path: '/video/:vid',
        component: '@/pages/Video',
      },
      {
        path: '/messageList/:daoId',
        component: '@/pages/MessageList',
      },
      {
        path: '/videoList/:daoId',
        component: '@/pages/VideoList',
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
            path: '/dao/:daoId',
            component: '@/pages/Main/Dao',
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
