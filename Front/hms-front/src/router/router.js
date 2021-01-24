import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import NiouHome from '../views/NiouHome.vue'
import Horse from '../components/Horse.vue'
import HorseList from '../views/HorseList.vue'
import StablesList from '../views/StablesList.vue'
import OwnersList from '../views/OwnersList.vue'
import VetList from '../views/VetList.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/niouhome',
    name: 'NiouHome',
    component: NiouHome
  },
  {
    path: '/horse',
    name: 'Horse',
    component: Horse
  },
  {
    path: '/horselist',
    name: 'HorseList',
    component: HorseList
  },
  {
    path: '/stableslist',
    name: 'StablesList',
    component: StablesList
  },
  {
    path: '/ownerlist',
    name: 'OwnersList',
    component: OwnersList
  },
  {
    path: '/vetlist',
    name: 'VetList',
    component: VetList
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
