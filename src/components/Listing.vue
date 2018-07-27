<template>
  <div class="container-fluid mt-4">
    <h1 class="h1 text-center">Find Your Ride!</h1>
    <b-jumbotron class="center-block">
      <b-col lg="3">
        <form @submit.prevent="getSharesByBikeType">
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
              @date-one-selected="val => { dateOne = val,model.dateOne = this.formatDatesForDb(val) }"
              @date-two-selected="val => { dateTwo = val, model.dateTwo = this.formatDatesForDb(val) }"
            />
          </div>
        </b-form-group>
          <b-form-group label="Bike Type">
            <b-form-select
            v-model="model.bikeType"
            :options="options"
            class="mb-3"
            />
          </b-form-group>
      <b-btn
        type="submit"
        variant="success">Find Your Bike
      </b-btn>
    </form>
  </b-col>
</b-jumbotron>
  <div>
    <b-card v-for="share in shares" :key="share.id" :title="share.shortDescription">
      <p>
        {{share.bikeType}}
        {{share.longDescription}}
      </p>
      <b-button href="#" variant="primary">Reserve this bike</b-button>
    </b-card>
  </div>
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
    async getSharesByBikeType () {
      this.shares = await api.getSharesByBikeType(this.model.bikeType, this.model.dateOne, this.model.dateTwo)
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
    formatDatesForDb (date) {
      return new Date(date).toISOString()
    }
  }
}
// shares is the database so when we do shares.<>, we are trying to access that
</script>
