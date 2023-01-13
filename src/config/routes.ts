export default [
  {
    path: '/',
    component: '@/layout',
    routes: [
      {
        path: '/',
        component: '@/pages/Home',
        name: 'home',
      },
      {
        path: '/channel',
        component: '@/pages/Channel',
        name: 'channel',
      },
      {
        path: '/video/:id',
        component: '@/pages/Video',
        name: 'video',
      },
      {
        path: '/manage',
        component: '@/pages/Manage',
        name: 'manage',
        routes: [
          {
            path: '/manage',
            component: '@/pages/Manage/VideoList',
          },
          {
            path: '/manage/others',
            component: '@/pages/Manage/Others',
          },
        ],
      },
    ],
  },
];
