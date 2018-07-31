<template>
  <div class="container-fluid mt-4">
    <h1 class="h1 text-center">Find Your Ride!</h1>
    <b-jumbotron class="center-block" >
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

  <div class="search-container">
    <b-card
      v-for="share in shares"
      :key="share.id"
      :title="share.shortDescription"
      class="search-item">
        <div>
          <p class="card-display">
            <img
              :src="(share.uploadedPicture ? 'data:image/png;base64,' + share.uploadedPicture : '')"
              height="100"/>
              <br/>
              <br/>
              Bike Type: {{share.bikeType}}
          </p>
          <p>
            {{share.longDescription}}<br/><br/>
            Cost: ${{share.costToRent}}
          </p>
        </div>
        <b-btn
          v-b-modal.myModal
          type="button"
          @click="modalOutput(share)"
          variant="primary">
          Reserve this bike
      </b-btn>
    </b-card>
     <b-modal id="myModal">
       <div>
         <h1>{{this.filtered.shortDescription}}</h1><br/>
       <img
         :src="(this.filtered.uploadedPicture ? 'data:image/png;base64,' + this.filtered.uploadedPicture : '')"
         height="100"/><br/><br/>
       <h5>Type of bike:</h5> {{ this.filtered.bikeType }}<br/>
       <h5>Description:</h5> {{this.filtered.longDescription}}<br/>
       <h5>Cost:</h5> ${{ this.filtered.costToRent }}<br/>
       <h5>Confirmed Dates:</h5> {{this.filtered.dateOne}}
     </div>
     </b-modal>
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
      filtered: {},
      options: [
        {value: '', text: ''},
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
    },
    modalOutput (share) {
      this.filtered = share
    }
  }
}
// change search box to be lined up side by side
</script>

<style>
  .search-container {
    display: flex;
    /* align-items: center; */
    justify-content: center;
    margin: 0 0.5rem;
    flex-wrap: wrap;
  }
  .search-item {
    width: 28%;
    margin: 0.2rem;
  }
  .parent {
    display: table;
    width: 60%;
  }
  .search-box {
    display: table-cell;
  }
  .card-display {
    align-items: center;
    justify-content: center;
  }
</style>
