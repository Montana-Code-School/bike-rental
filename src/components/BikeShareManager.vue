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
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="share in shares" :key="share.id">
              <td>{{ share.shortDescription }}</td>
              <td>{{ share.costToRent }}</td>
              <td>{{ share.updatedAt }}</td>
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
            <b-form-group label="Cost To Rent">
              <b-form-input type="number" v-model="model.costToRent"></b-form-input>
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
      model: {}
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
    }
  }
}
</script>
