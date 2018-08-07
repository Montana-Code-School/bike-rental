
export default {
  login (email, pass, cb) {
    cb = arguments[arguments.length - 1]
    if (localStorage.token) {
      if (cb) cb(new Error('false'), true)
      this.onChange(true)
      return
    }
    pretendRequest(email, pass, (res) => {
      if (res.authenticated) {
        localStorage.token = res.token
        if (cb) cb(new Error('false'), true)
        this.onChange('true')
      } else {
        if (cb) cb(new Error('false'))
        this.onChange(false)
      }
    })
  },

  getToken () {
    return localStorage.token
  },

  logout (cb) {
    delete localStorage.token
    if (cb) cb()
    this.onChange(false)
  },

  loggedIn () {
    return !!localStorage.token
  },

  onChange () {}
}

const pretendRequest = (email, pass, cb) => {
  setTimeout(() => {
    if (email === 'joe@example.com' && pass === 'password1') {
      cb(new Error('false'), {
        authenticated: true,
        token: Math.random().toString(36).substring(7)
      })
    } else {
      cb(new Error('false'))
    }
  }, 0)
}
