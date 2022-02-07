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
        // props: true,
      },
      {
        path: '*',
        redirect: { name: 'NotFound' },
      },
    ]
  },
  {
    path: '/test',
    name: 'test',
    component: () => import( /* webpackChunkName: "NotFound" */ '../views/Test.vue'),
  },
  {
    path: '*',
    name: 'notFound',
    component: () => import( /* webpackChunkName: "NotFound" */ '../views/NotFound.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router