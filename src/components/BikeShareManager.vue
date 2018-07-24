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
              <th>Cost to Rent</th>
              <th>Updated At</th>
              <th>Bike Type</th>
              <th>Address</th>
              <th>Zip Code</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="share in shares" :key="share.id">
              <td>{{ share.shortDescription }}</td>
              <td>{{ share.costToRent }}</td>
              <td>{{ share.updatedAt }}</td>
              <td>{{ share.bikeType }}</td>
              <td>{{ share.address }}</td>
              <td>{{ share.zipcode }}</td>
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
          <form @submit.prevent="saveShare">
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
            <b-form-group label="Street Address in Missoula">
              <b-form-input type="text" v-model="model.address"></b-form-input>
            </b-form-group>
            <b-form-group label="Zip Code in Missoula">
              <b-form-input type="number" v-model="model.zipcode"></b-form-input>
              <div>
                {{ errors.zipcode }}
              </div>
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
import api from '@/api'
export default {
  data () {
    return {
      loading: false,
      shares: [],
      selected: null,
      options: [
        {value: 'Cruiser', text: 'Cruiser'},
        {value: 'Fat Tire Bike', text: 'Fat Tire Bike'},
        {value: 'Mountain Bike', text: 'Mountain Bike'},
        {value: 'Road Bike', text: 'Road Bike'},
        {value: 'Single Speed', text: 'Single Speed'},
        {value: 'Tandem', text: 'Tandem'},
        {value: 'Tricycle', text: 'Tricycle'},
        {value: 'Unicycle', text: 'Unicycle'},
        {value: 'Other', text: 'Other'}
      ],
      errors: {
        zipcode: ''
      },
      model: {},
      validZipCodes: [59801, 59802, 59803, 59804, 59806, 59807, 59808, 59812]
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
    checkZipCode (zipcode) {
      if (zipcode === null || typeof zipcode === 'undefined') {
        return false
      } else {
        zipcode = zipcode.toString()
        if (zipcode.length !== 5) {
          this.errors.zipcode = 'Try again'
        }
      }
    }
  }
}
</script>
