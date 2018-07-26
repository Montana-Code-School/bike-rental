<template>
  <div class="container-fluid mt-4">
    <h1 class="h1 text-center">Find Your Ride!</h1>
    <tbody>
    <tr v-for="share in shares" :key="share.id">
      <td>{{ share.bikeType }}</td>
      <td>{{ share.dateOne }} - {{ share.dateTwo }} </td>
    </tr>
    </tbody>

    <b-form-group>
    <div class="datepicker-trigger">
      <input
        type="text"
        id="datepicker-trigger"
        placeholder="Select dates"
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
    async saveShare () {
      if (this.model.id) {
        await api.updateShare(this.model.id, this.model)
      } else {
        await api.createShare(this.model)
      }
      this.model = {} // reset form
      await this.refreshShares()
    },
    async deleteShare (id) {
      if (confirm('Are you sure you want to delete this post?')) {
        // if we are editing a bikeShare we deleted, remove it from the form
        if (this.model.id === id) {
          this.model = {}
        }
        await api.deleteShare(id)
        await this.refreshShares()
      }
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
    }
  }
}
</script>
