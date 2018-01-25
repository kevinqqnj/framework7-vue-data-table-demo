// 路由懒加载 https://router.vuejs.org/zh-cn/advanced/lazy-loading.html
// 不适合Phonegap，产生的1.js, 2.js...放哪？
// const PanelLeft = () => import('./pages/panel-left.vue')
// const Login = () => import('./pages/login.vue')
// const Secure = () => import('./pages/secure.vue')

export default [{
    path: '/panel-left/',
    component: require('./pages/panel-left.vue')
    // component: PanelLeft
  },
  {
    path: '/index/',
    component: require('./pages/index.vue'),
    tabs: [{
        path: '/',
        id: 'tab1',
        component: require('./pages/home.vue')
      },
      {
        path: '/tab2/',
        id: 'tab2',
        component: require('./pages/secure.vue')
        // component: Secure
      },
      {
        path: '/tab3/',
        id: 'tab3',
        component: require('./pages/admin.vue')
      },
      {
        path: '/tab4/',
        id: 'tab4',
        component: require('./pages/settings.vue')
      },
    ],
  },
  {
    path: '/about/',
    component: require('./pages/about.vue')
  },
  {
    path: '/login/',
    component: require('./pages/login.vue')
    // component: Login
  },
  {
    path: '/help/',
    component: require('./pages/help.vue')
  },
]
