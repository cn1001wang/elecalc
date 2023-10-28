export default [
  {
    name: 'Home',
    meta: {
      title: 'Home'
    },
    path: '/',
    component: () => import(/* webpackChunkName: "group-Setting" */ '../views/Home.vue')
  },
  {
    name: 'Login',
    meta: {
      title: 'Login'
    },
    path: '/login',
    component: () => import(/* webpackChunkName: "group-Setting" */ '../views/Login.vue')
  }
]
