import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import BikeShareManager from '@/components/BikeShareManager'
import Auth from '@okta/okta-vue'

Vue.use(Auth, {
  issuer: 'https://dev-595847.oktapreview.com/oauth2/default',
  client_id: '0oafsc1rp991wJMJ90h7',
  redirect_uri: 'http://localhost:8080/implicit/callback',
  scope: 'openid profile email'
})

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/implicit/callback',
      component: Auth.handleCallback()
    },
    {
      path: '/shares',
      name: 'BikeShareManager',
      component: BikeShareManager,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach(Vue.prototype.$auth.authRedirectGuard())

export default router
