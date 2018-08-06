import Vue from 'vue'
import Router from 'vue-router'
import Auth from '@okta/okta-vue'
import Hello from '@/components/Hello'
import BikeShareManager from '@/components/BikeShareManager'
import BikeListing from '@/components/Listing'
import NexmoTest from '@/components/NexmoTest'
import Confirmation from '@/components/Confirmation'
import Profile from '@/components/Profile'

Vue.use(Auth, {
  issuer: 'https://dev-595847.oktapreview.com/oauth2/default',
  client_id: '0oafsc1rp991wJMJ90h7',
  redirect_uri: window.location.origin,
  scope: 'openid profile email'
})

Vue.use(Router)

const User = {
  props: ['id']
}

let router = new Router({
  mode: 'history',
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
      path: '/implicit/callback',
      component: Auth.handleCallback()
    },
    {
      path: '/shares',
      name: 'BikeShareManager',
      component: BikeShareManager
    },
    {
      path: '/listings',
      name: 'BikeListing',
      component: BikeListing,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/confirmation',
      name: 'Confirmation',
      component: Confirmation,
      meta: {
        requiresAuth: true
      }
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
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach(Vue.prototype.$auth.authRedirectGuard())

export default router
