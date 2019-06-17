export default [
    {
      path:"/user/login",
      component:'./user/login',
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
          name:"sysSettings",
          icon: 'warning',
          path:'/sys/settings',
          component:'./sys/settings'
        },
        {
          path:'/account/center',
          component:'./account/center'
        },
        {
          path:"/account/settings",
          component:'./account/settings'
        }
      ],
    }
  ]

