<template>
  <div class="container-fluid mt-4">
    <h1 class="h1">Bike Share Manager</h1>
    <b-alert :show="loading" variant="info">Loading...</b-alert>
    <b-row>
      <b-col>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Short Description</th>
              <th>Uploaded Picture</th>
              <th>Cost to Rent</th>
              <th>Bike Type</th>
              <th>Address</th>
              <th>City</th>
              <th>Zip Code</th>
              <th>Available Dates</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="share in shares" :key="share.id">
              <td>{{ share.shortDescription }}</td>
              <td><img :src="(share.uploadedPicture ? 'data:image/png;base64,' + share.uploadedPicture : '')" height="20"/></td>
              <td>{{ share.costToRent }}</td>
              <td>{{ share.bikeType }}</td>
              <td>{{ share.address }}</td>
              <td>{{ share.zipCode }}</td>
              <td>{{ share.dateOne }} - {{ share.dateTwo }}</td>
              <td class="text-right">
                <a href="#" @click.prevent="populateShareToEdit(share)">Edit</a> -
                <a href="#" @click.prevent="deleteShare(share.id)">Delete</a>
              </td>
            </tr>
          </tbody>
        </table>
        <p id="b64"></p>
        <img id="img" height="150">
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
            <img id="img" :src="previewURL" alt="bike picture">
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
              <b-form-input type="text" v-model="model.address" placeholder="Address"></b-form-input>
            </b-form-group>
            <b-form-group label="City">
              <b-form-input type="text" v-model="model.city" placeholder="City"></b-form-input>
            </b-form-group>

            <b-form-group label="Zip Code in Missoula County">
<!--
              <div class="form-group" :class="{ 'form-group--error': $v.zipCode.$error }">
                  <b-form-input class="form__input" v-model.trim="$v.zipCode.$model"></b-form-input>
                <div class="error" v-if="!$v.zipCode.required">Field is required</div>
                <div class="error" v-if="!$v.zipCode.maxLength">Name must have at least {{$v.name.$params.maxLength.max}} numbers.</div>
                </div> -->
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
import { required, maxLength } from 'vuelidate/lib/validators'
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
      model: {}
    }
  },
  validations: {
    zipCode: {
      required,
      maxLength: maxLength(5),
      withParams: [
        59801,
        59802,
        59803,
        59804,
        59806,
        59807,
        59808,
        59812
      ],
      error: 'This zip code is not in range'
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
    },
    async populateShareToEdit (share) {
      this.model = Object.assign({}, share)
      this.previewURL = 'data:image/png;base64,' + share.uploadedPicture
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
    }
  }
}
</script>
