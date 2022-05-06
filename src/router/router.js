import { createRouter, createWebHistory } from 'vue-router'
import ItemsPage from '../content-pages/items-page/items-page'
import MenusPage from '../content-pages/menus-page/menus-page'
import WelcomePage from '../content-pages/welcome-page/welcome-page'
import NotFoundPage from '../content-pages/not-found-page/not-found-page'

const routes = [
  {
    path: '/',
    component: WelcomePage
  },
  {
    path: '/:catchAll(.*)',
    component: NotFoundPage
  }
]
const sideMenuRoutes = [
  {
    path: '/items',
    name: 'Items',
    icon: 'mdi-food',
    component: ItemsPage
  },
  {
    path: '/menus',
    name: 'Menus',
    icon: 'mdi-nutrition',
    component: MenusPage
  }
]

const router = createRouter({
  // TODO: Investigate "process.env.BASE_URL" variable
  history: createWebHistory(),
  routes: [...routes, ...sideMenuRoutes]
})

export { router, sideMenuRoutes }
