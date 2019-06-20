export default [
  {
    path: '/user/login',
    component: './user/login',
  },
  {
    path: '/redirect',
    component: './checkuser',
  },
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    authority: ['admin', 'user'],
    routes: [
      {
        path: '/',
        component: './index',
      },

      {
        name: 'sysSettings',
        icon: 'warning',
        path: '/',
        routes: [
          {
            name: 'sysRole',
            icon: 'warning',
            path: 'sys/role',
            component: './sys/role',
          },
          {
            name: 'sysSource',
            icon: 'warning',
            path: 'sys/source',
            component: './sys/source',
          },
          {
            name: 'sysOpeator',
            icon: 'warning',
            path: 'sys/opeator',
            component: './sys/opeator',
          },
        ],
      },
      {
        path: '/account/center',
        component: './account/center',
      },
      {
        path: '/account/settings',
        component: './account/settings',
      },
    ],
  },
];
