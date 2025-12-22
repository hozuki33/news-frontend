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
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.afterEach((to) => {
  const siteName = '百目新闻(•ө•)'

  if (to.meta.title) {
    document.title = `${to.meta.title} - ${siteName}`
  }
})


export default router
