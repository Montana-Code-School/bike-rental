import axios from 'axios'
import auth from './auth'

const client = axios.create({
  baseURL: 'https://radiant-hollows-28084.herokuapp.com/',
  json: true
})

export default {
  async execute (method, resource, data) {
    // inject the accessToken for each request
    let accessToken = auth.getToken()
    return client({
      method,
      url: resource,
      data,
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(req => {
      return req.data
    })
  },
  getSharesByBikeType (bikeType, dateOne, dateTwo, isRented) {
    let url = ''
    if (bikeType && dateOne && dateTwo) {
      url = `/shares?bikeType=${bikeType}&dateOne=${dateOne}&dateTwo=${dateTwo}`
    } else if (dateOne && dateTwo && isRented) {
      url = `/shares?dateOne=${dateOne}&dateTwo=${dateTwo}&isRented=false`
    } else if (bikeType) {
      url = `/shares?bikeType=${bikeType}`
    } else {
      url = `/shares?isPaid=false&isRented=false`
    } return this.execute('get', url)
    // http://localhost:8081/shares?sort=-bikeType
  },
  getSharesByRented () {
    let url = ''
    url = `/shares?isPaid=true&isRented=true`
    return this.execute('get', url)
  },
  getShares () {
    return this.execute('get', '/shares')
  },
  getShare (id) {
    return this.execute('get', `/shares/${id}`)
  },
  createShare (data) {
    return this.execute('post', '/shares', data)
  },
  updateShare (id, data) {
    return this.execute('put', `/shares/${id}`, data)
  },
  deleteShare (id) {
    return this.execute('delete', `/shares/${id}`)
  },
  sendSms (data) {
    return this.execute('post', `/send-sms`, data)
  }
}
