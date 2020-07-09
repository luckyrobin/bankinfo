export default [
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/login',
      },
    ],
  },
  {
    path: '/',
    component: '../layouts/SecurityLayout',
    routes: [
      {
        path: '/',
        component: '../layouts/BasicLayout',
        authority: ['admin', 'user'],
        routes: [
          {
            path: '/',
            redirect: '/welcome',
          },
          {
            path: '/welcome',
            name: '欢迎',
            icon: 'smile',
            component: './Welcome',
          },
          {
            path: '/customer',
            name: '客户管理',
            icon: 'TeamOutlined',
            component: './Customer',
            authority: ['admin', 'user'],
          },
          {
            path: '/template',
            name: '模板管理',
            icon: 'FileWordOutlined',
            component: './Template',
            authority: ['admin'],
          },
          {
            path: '/constant',
            name: '常量管理',
            icon: 'CopyrightCircleOutlined',
            component: './Constant',
            authority: ['admin'],
          },
          {
            path: '/member',
            name: '成员管理',
            icon: 'ContactsOutlined',
            component: './Member',
            authority: ['admin'],
          },
          {
            path: '/account',
            name: '账号管理',
            icon: 'crown',
            component: './Account',
            authority: ['admin'],
          },
          {
            component: './404',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    component: './404',
  },
]