<template>
  <div class="container-fluid mt-4">
    <h1 class="h1 text-center">Find Your Ride!</h1>
    <tbody>
    <tr v-for="share in shares" :key="share.id">
      <td>{{ share.bikeType }}</td>
      <td>{{ share.dateOne }} - {{ share.dateTwo }} </td>
    </tr>
    </tbody>
    <b-jumbotron class="center-block">
    <b-col lg="3">
    <form @click.prevent="getShares">
    <b-form-group>
    <div class="datepicker-trigger">Pick your dates
    <br>
      <input
        type="text"
        id="datepicker-trigger"
        placeholder=" Select dates"
        :value="formatDates(dateOne, dateTwo)"
      >
      <AirbnbStyleDatepicker
        :trigger-element-id="'datepicker-trigger'"
        :mode="'range'"
        :fullscreen-mobile="true"
        :date-one="dateOne"
        :date-two="dateTwo"
        @date-one-selected="val => { dateOne = val,model.dateOne = val }"
        @date-two-selected="val => { dateTwo = val, model.dateTwo = val }"
      />
    </div>
  </b-form-group>
  <b-form-group label="Bike Type">
    <b-form-select v-model="model.bikeType" :options="options" class="mb-3" />
  </b-form-group>
  <b-btn type="submit" variant="success">Find Your Bike</b-btn>
  </form>
  </b-col>
</b-jumbotron>
<ul>
  <li v-for="type in options">{{type.value}}</li>
  <li v-for="item in working(type)">{{ item }}</li>
</ul>
  </div>
</template>

<script>
import format from 'date-fns/format'
import api from '@/api'
export default {
  data () {
    return {
      dateFormat: 'D MMM',
      dateOne: '',
      dateTwo: '',
      loading: false,
      shares: [],
      selected: null,
      zipCode: '',
      options: [
        {value: 'Cruiser', text: 'Cruiser'},
        {value: 'Fat Tire', text: 'Fat Tire'},
        {value: 'Mountain', text: 'Mountain'},
        {value: 'Road', text: 'Road'},
        {value: 'Single Speed', text: 'Single Speed'},
        {value: 'Tandem', text: 'Tandem'},
        {value: 'Tricycle', text: 'Tricycle'},
        {value: 'Unicycle', text: 'Unicycle'},
        {value: 'Other', text: 'Other'}
      ],
      model: {}
    }
  },
  methods: {
    async refreshShares () {
      this.loading = true
      this.shares = await api.getShares()
      this.loading = false
    },
    async populateShareToEdit (share) {
      this.model = Object.assign({}, share)
    },
    async getShares () {
      if (this.model.bikeType) {
        await api.getShares(this.model.bikeType)
        return 'working'
      }
    },
    getShare (id) {
      return this.execute('get', `/shares/${id}`)
    },
    formatDates (dateOne, dateTwo) {
      let formattedDates = ''
      if (dateOne) {
        formattedDates = format(dateOne, this.dateFormat)
      }
      if (dateTwo) {
        formattedDates += ' - ' + format(dateTwo, this.dateFormat)
      }
      return formattedDates
    },
    working(type) {
      return 'working'
    }
  }
}
</script>
