import Vue from 'vue'
import Router from 'vue-router'
import auth from '@/auth'
import Hello from '@/components/Hello'
import BikeShareManager from '@/components/BikeShareManager'
import BikeListing from '@/components/Listing'
import NexmoTest from '@/components/NexmoTest'
import Confirmation from '@/components/Confirmation'
import Profile from '@/components/Profile'
import Login from '@/components/Login'
import AuthTest from '@/components/AuthTest'

Vue.use(Router)

const User = {
  props: ['id']
}

let router = new Router({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/nexmo',
      name: 'NexmoTest',
      component: NexmoTest
    },
    {
      path: '/shares',
      name: 'BikeShareManager',
      component: BikeShareManager,
      beforeEnter: requireAuth
    },
    {
      path: '/listings',
      name: 'BikeListing',
      component: BikeListing,
      beforeEnter: requireAuth
    },
    {
      path: '/confirmation',
      name: 'Confirmation',
      component: Confirmation,
      beforeEnter: requireAuth
    },
    {
      path: '/confirmation/:id',
      component: User,
      props: true
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      beforeEnter: requireAuth
    },
    {
      path: '/auth-test',
      name: 'AuthTest',
      component: AuthTest
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/logout',
      beforeEnter (to, from, next) {
        auth.logout()
        next('/')
      }
    }
  ]
})

function requireAuth (to, from, next) {
  if (!auth.loggedIn()) {
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  } else {
    next()
  }
}
export default router
