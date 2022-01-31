import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Features from '../views/Features.vue'
import HomeDefault from '../components/HomeDefault.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    redirect: '/home/products',
  },
  {
    path: '/home',
    component: Home,
    children: [
      //https://stackoverflow.com/questions/40750846/vue-js-nested-routing-with-default-child
      {
        path: '',
        component: HomeDefault,
        name: 'home',
      },
      {
        path: 'products',
        component: Features,
        name: 'products',
      },
      {
        path: 'products/:idCategory/:nameCategory',
        component: Features,
        name: 'features',
      }
    ]
  },
  {
    path: '/pruebas',
    name: 'Pruebas',
    component: () => import( /* webpackChunkName: "Pruebas" */ '../views/Pruebas.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router