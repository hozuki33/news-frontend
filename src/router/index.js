import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import NewsList from '../views/NewsList.vue'
import NewsDetail from '../views/NewsDetail.vue'

const routes = [
  {
    path: '/',
    component: Home,
    meta: { title: '首页' }
  },
  {
    path: '/category/:id',
    component: NewsList,
  },
  {
    path: '/news/:id',
    component: NewsDetail,
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  },
  // router/index.js
  {
    path: '/profile',
    component: () => import('../views/profile.vue'),
    meta: { title: '个人中心', requiresAuth: true }
  }

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.afterEach((to) => {
  const siteName = '百目新闻'

  if (to.meta.title) {
    document.title = `${to.meta.title} - ${siteName}`
  }
})


export default router
