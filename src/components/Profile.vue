<template lang="html">
  <div class="profile">
    <br>
    <h1 class="h1 text-center"><b>Rented Bikes</b></h1><hr>
  <b-card-group deck class="mb-3">
    <b-card
      bg-variant="info"
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
            Your Zootown bike is a {{share.bikeType}}.
        </p>
        <br/>
        <p>
          More about your Zootown bike: {{share.longDescription}}<br/><br/>
          Cost: ${{share.costToRent}}<br/><br/>
          Call this Zootown bike your very own from {{frontEndDateFormat(share.dateOne)}} to {{frontEndDateFormat(share.dateTwo)}}
        </p>
      </div>
    </b-card>
  </b-card-group>
  </div>
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
  html, body {
    background: #EEC584;
  }
  .profile {
    background: #EEC584;
  }
  .card-deck {
    display: flex;
    margin-right: 15px;
    margin-left: 15px;
    margin-top: 15px;
    margin-bottom: 15px
  }
  .card-deck .card {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: column;
    flex-direction: column;
    margin-right: 15px;
    margin-bottom: 0;
    margin-left: 15px;
  }
</style>
