<template lang="html">
  <b-card-group deck class="mb-3">
  <b-card
    v-for="share in shares"
        :key="share.id"
        :title="share.shortDescription"
      >
        <div>
          <p class="card-display">
            <img
              :src="(share.uploadedPicture ? 'data:image/png;base64,' + share.uploadedPicture : '')"
              height="100"/>
              <br/>
              <br/>
              {{share.bikeType}}
          </p>
          <p>
            {{share.longDescription}}<br/><br/>
            Cost: ${{share.costToRent}}<br/>
            Rental dates: {{frontEndDateFormat(share.dateOne)}} to {{frontEndDateFormat(share.dateTwo)}}
          </p>
        </div>
      </b-card>
    </b-card-group>
</template>

<script>
import api from '@/api'
export default {
  data () {
    return {
      shares: [],
      model: {}
    }
  },
  async created () {
    this.getSharesByRented()
  },
  methods: {
    async getSharesByRented () {
      this.shares = await api.getSharesByRented()
    },
    frontEndDateFormat (date) {
      var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear()
      if (month.length < 2) month = '0' + month
      if (day.length < 2) day = '0' + day
      return [month, day, year].join('-')
    }
  }
}
</script>

<style lang="css">
</style>
