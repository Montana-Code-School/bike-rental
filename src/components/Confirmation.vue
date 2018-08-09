<template>
<div>
  <div style="background: #eec584">
  <h1 class="h1 text-center"><b>Your Bike Is Confirmed</b></h1><hr>
  </div>
  <b-card-group deck class="mb-3">
  <b-card>
    <div>
      <b-img
        :src="(share.uploadedPicture ? 'data:image/png;base64,' + share.uploadedPicture : '')"
        fluid alt="bike image"
      />
    </div>
    <p class="card-text">
      <b-list-group flush>
      <b-list-group-item>A little deets about this Zootown bicycle: {{this.share.shortDescription}}</b-list-group-item>
      <b-list-group-item>A lotta deets about this Zootown bicycle: {{this.share.longDescription}}</b-list-group-item>
      <b-list-group-item>Price: ${{this.share.costToRent}}</b-list-group-item>
      <b-list-group-item>Pick up location: {{this.share.address}} {{this.share.city}}, MT
        <div id="google-map">
           <gmap-map
              :center="center"
              :zoom="12"
              style="width:100%;  height: 400px;"
            >
            <gmap-marker
              :position="google && new google.maps.LatLng(Number(share.lat), Number(share.lng))"
            >
            </gmap-marker>
          </gmap-map>
        </div>
      </b-list-group-item>
      </b-list-group>
    </p>
  </b-card>
  <b-card
    bg-variant="info"
    text-variant="white"
    class="text-center"
  >
  <div>
    <h1>
      your adventure awaits
    </h1>
    <br>
    <img src="../assets/adventure.jpg" alt="Zootown Bike Share" height="500" width="700">
  </div>
  </b-card>
  </b-card-group>
</div>
</template>

<script>
import api from '@/api'
import BikeMap from '@/components/BikeMap'
import {gmapApi} from 'vue2-google-maps'
export default {
  name: 'App',
  data () {
    return {
      share: {},
      center: { lat: 46.8656618, lng: -113.97768149999999 }
    }
  },
  components: {
    BikeMap
  },
  computed: {
    google: gmapApi
  },
  async created () {
    this.getBackShare()
  },
  methods: {
    async getBackShare (id) {
      this.share = await api.getShare(this.$route.query.id)
    }
  }
}
</script>

<style>
  html, body {
    background: #EEC584;
  }
  .card {
    background: #EEC584;
  }
  .card-display {
    align-items: center;
    justify-content: center;
  }
  .card-deck {
    display: flex;
    margin-right: 15px;
    margin-left: 15px;
    margin-top: 15px;
    margin-bottom: 15px
  }
</style>
