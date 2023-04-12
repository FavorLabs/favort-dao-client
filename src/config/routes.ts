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
        path: '/newsletterDetail/:postId',
        component: '@/pages/NewsletterDetail',
        wrappers: ['@/wrappers/auth'],
      },
      {
        path: '/search/:type',
        component: '@/pages/Search',
        wrappers: ['@/wrappers/auth'],
      },
      {
        path: '/pluginForDAOs',
        component: '@/pages/Main/Mine/PluginForDAOs',
        wrappers: ['@/wrappers/auth'],
      },
      {
        path: '/promotionTaskList/:keyValue?',
        component: '@/pages/Main/Mine/PromotionTaskList',
        wrappers: ['@/wrappers/auth'],
      },
      {
        path: '/setting',
        component: '@/pages/Main/Mine/Setting',
        wrappers: ['@/wrappers/auth'],
      },
      {
        path: '/web3Airdrop',
        component: '@/pages/Main/Mine/Web3Airdrop',
        wrappers: ['@/wrappers/auth'],
      },
      {
        path: '/dAOAirdrop',
        component: '@/pages/Main/Mine/DAOAirdrop',
        wrappers: ['@/wrappers/auth'],
      },
      {
        path: '/token',
        component: '@/pages/Main/Mine/Token',
        wrappers: ['@/wrappers/auth'],
      },
      {
        path: '/qrcode',
        component: '@/pages/Main/Mine/Token/QrCode',
        wrappers: ['@/wrappers/auth'],
      },
      {
        path: '/taskCreate',
        component: '@/pages/Main/Mine/TaskCreate',
        wrappers: ['@/wrappers/auth'],
      },
      {
        path: '/web3Page',
        component: '@/pages/Main/Mine/Web3Page',
        wrappers: ['@/wrappers/auth'],
      },
      {
        path: '/dAOPage',
        component: '@/pages/Main/Mine/DAOPage',
        wrappers: ['@/wrappers/auth'],
      },
      {
        path: '/quote/:postId',
        component: '@/pages/Quote',
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
          {
            path: '/daoCommunity/:daoId?',
            component: '@/pages/Main/DaoCommunity',
            wrappers: ['@/wrappers/auth'],
          },
        ],
      },
    ],
  },
];
