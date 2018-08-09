<template>
  <div class="container-fluid">
    <br>
    <h1 class="h1 text-center"><b>Find Your Ride!</b></h1>
    <hr>
    <b-container>
      <b-row lg="3" class="search-container" align-h="center">
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
            variant="secondary">Find Your Bike
          </b-btn>
        </form>
      </b-row>
    </b-container>
    <br><br>
    <b-card-group deck class="mb-3">
      <b-card
        v-for="share in shares"
        :key="share.id"
        bg-variant="info"
        text-variant="white"
        :header="share.shortDescription"
        class="text-center"
        >
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
          variant="secondary">
          Reserve this bike
        </b-btn>
      </b-card>
    </b-card-group>
      <b-modal id="myModal" ref="myModalRef" hide-footer >
        <div>
          <h1>{{this.filtered.shortDescription}}</h1><br/>
          <img
           :src="(this.filtered.uploadedPicture ? 'data:image/png;base64,' + this.filtered.uploadedPicture : '')"
           height="100"/><br/><br
          />
          <h5>Type of bike:</h5> {{ this.filtered.bikeType }}<br/>
          <h5>Description:</h5> {{this.filtered.longDescription}}<br/>
          <h5>Cost:</h5> ${{ this.filtered.costToRent }}<br/>
          <h5>Confirmed Dates:</h5> {{frontEndDateFormat(this.filtered.dateOne)}} to {{frontEndDateFormat(this.filtered.dateTwo)}}
        </div>
        <b-btn
          class="mt-3 button"
          variant="primary"
          @click="toggleInput">Confirmation
        </b-btn>
        <b-btn
        class="mt-3"
        variant="outline-danger"
        @click="hideModal">Cancel
        </b-btn>
        <div v-if="showCard">
          <h5>Please give us your payment details:</h5>
          <card class='stripe-card'
            :class='{ complete }'
            :stripe= 'stripeKey'
            :options='stripeOptions'
            @change='complete = $event.complete'
          />
          <b-btn
            class='pay-with-stripe'
            @click='pay'
            :disabled='!complete'>Pay with credit card
          </b-btn>
        </div>
      </b-modal>
  </div>
</template>

<script>
import format from 'date-fns/format'
import api from '@/api'
import { Card, createToken } from 'vue-stripe-elements-plus'
export default {
  data () {
    return {
      dateFormat: 'D MMM',
      dateOne: '',
      dateTwo: '',
      loading: false,
      showCard: false,
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
      model: {},
      stripeKey: process.env.STRIPE_KEY,
      complete: false,
      stripeOptions: {
        // see https://stripe.com/docs/stripe.js#element-options for details
      }
    }
  },
  components: { Card },
  methods: {
    async shareUpdate () {
      await api.updateShare(this.filtered.isPaid, this.filtered.isRented)
    },
    pay () {
      createToken().then(async (data) => {
        if (data.token) {
          this.filtered.isPaid = true
          this.filtered.isRented = true
          await api.updateShare(this.filtered.id, this.filtered)
          this.$router.push('/confirmation?id=' + this.filtered.id)
        }
      })
    },
    hideModal () {
      this.$refs.myModalRef.hide()
    },
    toggleInput () {
      this.showCard = !this.showCard
    },
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
    },
    frontEndDateFormat (date) {
      let d = new Date(date)
      let month = '' + (d.getMonth() + 1)
      let day = '' + d.getDate()
      let year = d.getFullYear()
      if (month.length < 2) month = '0' + month
      if (day.length < 2) day = '0' + day
      return [month, day, year].join('-')
    }
  }
}
</script>

<style>
  .bikeType {
    width: 100%;
  }
  .button {
    border: none;
    border-radius: 2px;
  }
  .stripe-card {
    width: 300px;
    border: 1px solid grey;
  }
  .stripe-card.complete {
    border-color: green;
  }
  .search-container {
    display: flex;
    text-align: center;
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
