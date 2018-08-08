<template>
  <div>
    <br>
    <h1 class="h1 text-center"><b>Login</b></h1><hr>
    <p v-if="$route.query.redirect">
      You need to login first.
    </p>
    <b-card class="card">
    <form @submit.prevent="login" autocomplete="off" style="text-align:center">
      <label><input v-model="email" placeholder="email" v-focus></label>
      <label><input v-model="pass" placeholder="password" type="password"></label><br>
      <b-btn type="submit" variant="secondary">Login</b-btn>
      <p v-if="error" class="error">Bad login information</p>
    </form>
  </b-card>
  </div>
</template>

<script>
import auth from '../auth'
export default {
  data () {
    return {
      email: 'ed42311@gmail.com',
      pass: '1@B%hn&N4agDbm91',
      error: false
    }
  },
  directives: {
    focus: {
      inserted: function (el) {
        el.focus()
      }
    }
  },
  methods: {
    login () {
      auth.login(this.email, this.pass, loggedIn => {
        if (!loggedIn) {
          this.error = true
        } else {
          this.$router.replace(this.$route.query.redirect || '/')
        }
      })
    }
  }
}
</script>

<style>
  html, body {
    background: #EEC584;
  }
  .card {
    align-items: center;
    background-color: #1B998B;
    margin-left: 200px;
    margin-right: 200px;
  }
  .error {
    color: red;
  }
</style>
