// Imports
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior: (to, from, savedPosition) => {
    if (to.hash) return { selector: to.hash }
    if (savedPosition) return savedPosition

    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/',
      component: () => import('@/views/Projects.vue'),
      meta: {
        hasAppBar: true,
        appTitle: "Home"
      }
    },
    {
      path: '/project',
      component: () => import('@/views/Tweak.vue'),
    },
  ],
})

export default router
