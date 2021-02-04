import Vue from 'vue'
import VueRouter from 'vue-router'
import Map from '../views/Map.vue'

import { getToken } from '@/utils/util'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'map',
    redirect:'/uploadfile',
    component: Map,
    children:[
      { 
        path:'/uploadfile',
        name:'uploadfile',
        component:() => import('../components/UploadFile.vue') 
      },
      { 
        path:'/road',
        name:'road',
        component:() => import('../components/Road.vue') 
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

const ACCESS_TOKEN = 'Authorization'

const whiteList = ['login']

router.beforeEach((to, from, next) => {
    if (getToken(ACCESS_TOKEN)) {
      next()
    }else{
      if (whiteList.includes(to.name)) {
          // 在免登录白名单，直接进入
          next()
      } else {
          next({ path: '/login', query: { redirect: to.fullPath } })
      }
    }
})


export default router
