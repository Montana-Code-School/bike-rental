<template>
  <div class="container-fluid mt-4">
    <h1 class="h1 text-center"><b>Bike Share Manager</b></h1>
    <hr>
    <b-alert :show="loading" variant="info">Loading...</b-alert>
    <b-row>
      <b-col class="b-col background">
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Short Description</th>
              <th>Uploaded Picture</th>
              <th>Cost to Rent</th>
              <th>Bike Type</th>
              <th>Address</th>
              <th>Available Dates</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody >
            <tr
              v-for="share in shares"
              :key="share.id"

            >
              <td>{{ share.shortDescription }}</td>
              <td><img :src="(share.uploadedPicture ? 'data:image/png;base64,' + share.uploadedPicture : '')" height="20"/></td>
              <td>{{ share.costToRent }}</td>
              <td>{{ share.bikeType }}</td>
              <td>{{ share.address }}</td>
              <td>{{ share.dateOne }} - {{ share.dateTwo }}</td>
              <td class="text-right">
                <a href="#" @click.prevent="populateShareToEdit(share)">Edit</a> -
                <a href="#" @click.prevent="deleteShare(share.id)">Delete</a>
              </td>
            </tr>
          </tbody>
        </table>
      </b-col>
      <b-col lg="3">
        <b-card :title="(model.id ? 'Edit Share ID#' + model.id : 'New Share')">
        <b-form-group>
          <div class="datepicker-trigger">Available Dates
            <input
              type="text"
              id="datepicker-trigger"
              placeholder="Select dates"
              :value="formatDates(dateOne, dateTwo)"
            >
            <AirbnbStyleDatepicker
              :trigger-element-id="'datepicker-trigger'"
              :disabled-dates="['', '']"
              :mode="'range'"
              :fullscreen-mobile="true"
              :date-one="dateOne"
              :date-two="dateTwo"
              @date-one-selected="val => { dateOne = val, model.dateOne = val }"
              @date-two-selected="val => { dateTwo = val, model.dateTwo = val }"
            />
          </div>
        </b-form-group>
          <form @submit.prevent="saveShare">
            <b-form-group label="Bike Picture">
            <div>
              <input type="file" @change = "readFile1"
                id="avatar" name="avatar"
                accept="image/png, image/jpeg" />
            </div>
            </b-form-group>
            <b-form-group label="Short Description">
              <b-form-input type="text" v-model="model.shortDescription"></b-form-input>
            </b-form-group>
            <b-form-group label="Long Description">
              <b-form-textarea rows="4" v-model="model.longDescription"></b-form-textarea>
            </b-form-group>
            <b-form-group label="Bike Type">
              <b-form-select v-model="model.bikeType" :options="options" class="mb-3" />
              <div>Selected: <strong>{{ model.bikeType }}</strong></div>
            </b-form-group>
            <b-form-group label="Cost To Rent">
              <b-form-input type="number" v-model="model.costToRent"></b-form-input>
            </b-form-group>
            <b-form-group label="Street Address in Missoula County">
              <!-- <b-form-input type="text" v-model="model.address" placeholder="Address"></b-form-input> -->
              <gmap-autocomplete class="form-control" v-model="model.address"
                @place_changed="setPlace">
              </gmap-autocomplete>
            </b-form-group>
            <div>
              <b-btn type="submit" variant="success">Save Bike Data</b-btn>
            </div>
          </form>
        </b-card>
      </b-col>
    </b-row>
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
      previewURL: null,
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
      model: {},
      colors: [
        {
          id: 'ssmf',
          hex: ['#297afb','#2898fb','#01d8fd'],
          title: 'Sleek, Sophisticated, Mature & Formal'
        },
        {
          id: 'hlfss',
          hex: ['#297afb','#2898fb','#01d8fd'],
          title: 'Honest, Loyal, Friendly, Stable, & Strong'
        }
        ]
    }
  },
  async created () {
    this.refreshShares()
  },
  methods: {
    async refreshShares () {
      this.loading = true
      this.shares = await api.getShares()
      this.loading = false
      this.dateOne = ''
      this.dateTwo = ''
      this.previewURL = ''
    },
    async populateShareToEdit (share) {
      this.model = Object.assign({}, share)
      this.previewURL = 'data:image/png;base64,' + share.uploadedPicture
    },
    async saveShare () {
      if (this.model.id) {
        await api.updateShare(this.model.id, this.model)
      } else {
        this.model.isRented = false
        this.model.isPaid = false
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
    readFile1 () {
      if (!event.target.files.length) return
      let FR = new FileReader()
      FR.onload = evt => {
        this.previewURL = evt.target.result
        let base64Str = evt.target.result.substr(evt.target.result.indexOf(',') + 1, evt.target.result.length)
        this.model.uploadedPicture = base64Str
      }
      FR.readAsDataURL(event.target.files[0])
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
    setPlace (place) {
      this.model.address = place.formatted_address
      this.model.lat = place.geometry.location.lat()
      this.model.lng = place.geometry.location.lng()
    }
  }
}
</script>
<style>
  .background {
    background-color: white;
  }
  b-col{
      display:block;
      border: 2px solid blue;
      border-collapse: separate;
      border-spacing: 4px;
      margin-bottom:10px;
}
</style>
