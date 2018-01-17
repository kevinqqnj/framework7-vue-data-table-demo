export default [
     {
        path: '/panel-left/',
        component: require('./pages/panel-left.vue')
    },
    {
        path: '/',
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
]
